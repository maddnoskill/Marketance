-- Test des règles d'accès (RLS) des profils et rôles.
-- Tout se passe dans une transaction annulée à la fin : rien n'est conservé.
-- Résultat attendu : une seule ligne « TOUS LES TESTS RÉUSSIS ». Toute erreur arrête le script.
begin;

insert into auth.users (id, email, raw_user_meta_data, aud, role)
values
  ('00000000-0000-4000-8000-00000000000a', 'alice@test.invalid', '{"display_name":"Alice"}', 'authenticated', 'authenticated'),
  ('00000000-0000-4000-8000-00000000000b', 'bob@test.invalid', '{}', 'authenticated', 'authenticated');

do $$
declare n int; r text;
begin
  -- Le déclencheur crée profil + rôle client
  select count(*) into n from public.profiles where id in ('00000000-0000-4000-8000-00000000000a','00000000-0000-4000-8000-00000000000b');
  if n <> 2 then raise exception 'ÉCHEC : profils non créés à l''inscription (%).', n; end if;
  select display_name into r from public.profiles where id = '00000000-0000-4000-8000-00000000000a';
  if r <> 'Alice' then raise exception 'ÉCHEC : nom affiché non repris (%).', r; end if;
  select count(*) into n from public.user_roles where role = 'client' and user_id in ('00000000-0000-4000-8000-00000000000a','00000000-0000-4000-8000-00000000000b');
  if n <> 2 then raise exception 'ÉCHEC : rôle client non attribué.'; end if;
end $$;

-- On agit maintenant comme Alice connectée
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-4000-8000-00000000000a","role":"authenticated"}', true);

do $$
declare n int;
begin
  select count(*) into n from public.profiles;
  if n <> 1 then raise exception 'ÉCHEC : Alice voit % profils au lieu de 1.', n; end if;
  select count(*) into n from public.profiles where id = '00000000-0000-4000-8000-00000000000b';
  if n <> 0 then raise exception 'ÉCHEC : Alice voit le profil de Bob.'; end if;

  update public.profiles set display_name = 'Pirate' where id = '00000000-0000-4000-8000-00000000000b';
  get diagnostics n = row_count;
  if n <> 0 then raise exception 'ÉCHEC : Alice a modifié le profil de Bob.'; end if;

  update public.profiles set display_name = 'Alice T.' where id = '00000000-0000-4000-8000-00000000000a';
  get diagnostics n = row_count;
  if n <> 1 then raise exception 'ÉCHEC : Alice ne peut pas modifier son propre profil.'; end if;

  select count(*) into n from public.user_roles;
  if n <> 1 then raise exception 'ÉCHEC : Alice voit % rôles au lieu de 1.', n; end if;

  begin
    insert into public.user_roles (user_id, role) values ('00000000-0000-4000-8000-00000000000a', 'admin');
    raise exception 'ÉCHEC : Alice a pu se donner le rôle admin.';
  exception when insufficient_privilege then null;
  end;

  begin
    update public.profiles set id = '00000000-0000-4000-8000-00000000000b' where id = '00000000-0000-4000-8000-00000000000a';
    raise exception 'ÉCHEC : Alice a pu changer son identifiant.';
  exception when insufficient_privilege then null;
  end;

  begin
    delete from public.profiles where id = '00000000-0000-4000-8000-00000000000b';
    get diagnostics n = row_count;
    if n <> 0 then raise exception 'ÉCHEC : Alice a supprimé le profil de Bob.'; end if;
  exception when insufficient_privilege then null;
  end;

  begin
    insert into public.profiles (id) values (gen_random_uuid());
    raise exception 'ÉCHEC : Alice a pu créer un profil.';
  exception when insufficient_privilege then null;
  end;
end $$;

-- Visiteur non connecté
reset role;
set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);
do $$
begin
  begin
    perform 1 from public.profiles;
    raise exception 'ÉCHEC : un visiteur non connecté peut lire les profils.';
  exception when insufficient_privilege then null;
  end;
  begin
    perform 1 from public.user_roles;
    raise exception 'ÉCHEC : un visiteur non connecté peut lire les rôles.';
  exception when insufficient_privilege then null;
  end;
end $$;

reset role;
select 'TOUS LES TESTS RÉUSSIS' as resultat;
rollback;
