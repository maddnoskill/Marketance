-- Phase 2 : profils et rôles.
-- Chaque utilisateur a un profil (créé automatiquement à l'inscription) et un ou plusieurs rôles.
-- Règle : un utilisateur ne lit et ne modifie que son propre profil ; les rôles ne sont
-- modifiables que par le serveur (clé secrète), jamais depuis le navigateur.

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default '' check (char_length(display_name) <= 80),
  timezone text not null default 'America/Toronto' check (char_length(timezone) between 1 and 64),
  locale text not null default 'fr-CA' check (locale in ('fr-CA')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is 'Profil privé de chaque utilisateur. Visible et modifiable par son propriétaire seulement.';

create type public.app_role as enum ('client', 'provider', 'admin');

create table public.user_roles (
  user_id uuid not null references auth.users (id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  primary key (user_id, role)
);

comment on table public.user_roles is 'Rôles des utilisateurs. Lecture de ses propres rôles seulement ; écriture réservée au serveur.';

-- Mise à jour automatique de updated_at
create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

-- Création automatique du profil et du rôle « client » à l'inscription
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(left(new.raw_user_meta_data ->> 'display_name', 80), ''));
  insert into public.user_roles (user_id, role) values (new.id, 'client');
  return new;
end;
$$;

revoke execute on function public.handle_new_user() from public, anon, authenticated;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Sécurité au niveau des lignes (RLS)
alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;

create policy "profiles_select_own" on public.profiles
  for select to authenticated using ((select auth.uid()) = id);

create policy "profiles_update_own" on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- Pas de politique insert/delete sur profiles : création par le déclencheur, suppression
-- en cascade avec le compte.

create policy "user_roles_select_own" on public.user_roles
  for select to authenticated using ((select auth.uid()) = user_id);

-- Le navigateur ne peut jamais changer un identifiant ni une date de création
revoke update on public.profiles from authenticated;
grant update (display_name, timezone) on public.profiles to authenticated;
revoke all on public.profiles from anon;
revoke all on public.user_roles from anon;
revoke insert, update, delete on public.user_roles from authenticated;
