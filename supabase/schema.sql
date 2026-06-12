-- ════════════════════════════════════════════════════════════
-- Fanthèque · Schéma de base de données
-- À exécuter dans Supabase : SQL Editor → New query → coller → Run
-- ════════════════════════════════════════════════════════════

-- ── Table des fics ──────────────────────────────────────────
create table public.fics (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null default auth.uid() references auth.users (id) on delete cascade,
  titre       text not null,
  auteur      text not null default '',
  fandom      text not null default '',
  ship        text not null default '',
  plateforme  text not null default '',
  statut      text not null default 'En cours d''écriture',
  lien        text not null default '',
  lus         integer not null default 0,
  total       integer not null default 1,
  note        integer check (note between 1 and 5),
  tags        text[] not null default '{}',
  note_perso  text not null default '',
  liste       text not null default 'alire' check (liste in ('alire', 'encours', 'finies')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── Souvenirs de lecture 📍 (alimentent Retrouve-fic) ───────
create table public.moments (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null default auth.uid() references auth.users (id) on delete cascade,
  fic_id      uuid not null references public.fics (id) on delete cascade,
  extrait     text not null,
  created_at  timestamptz not null default now()
);

-- ── Journal de lecture (alimente les statistiques) ──────────
create table public.lectures (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null default auth.uid() references auth.users (id) on delete cascade,
  fic_id      uuid references public.fics (id) on delete set null,
  jour        date not null default current_date,
  chapitres   integer not null default 1
);

-- ── Sécurité : chaque utilisatrice ne voit que ses données ──
alter table public.fics     enable row level security;
alter table public.moments  enable row level security;
alter table public.lectures enable row level security;

create policy "fics : propriétaire uniquement"
  on public.fics for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "moments : propriétaire uniquement"
  on public.moments for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "lectures : propriétaire uniquement"
  on public.lectures for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ── updated_at automatique sur les fics ─────────────────────
create or replace function public.maj_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger fics_updated_at
  before update on public.fics
  for each row execute function public.maj_updated_at();

-- ── Index utiles ────────────────────────────────────────────
create index fics_user_idx     on public.fics (user_id);
create index moments_user_idx  on public.moments (user_id);
create index moments_fic_idx   on public.moments (fic_id);
create index lectures_user_idx on public.lectures (user_id, jour);
