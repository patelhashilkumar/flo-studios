-- ==============================================================================
-- FLO STUDIOS — AUTHORIZE HASHILISBEST@GMAIL.COM AS STUDIO ADMIN
-- ==============================================================================

begin;

-- 1. Update is_studio_admin() to include hashilisbest@gmail.com
create or replace function public.is_studio_admin()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select
    (select auth.uid()) is not null
    and coalesce(((select auth.jwt()) ->> 'is_anonymous')::boolean, false) = false
    and (
      coalesce(((select auth.jwt()) -> 'app_metadata' ->> 'role'), '') in ('admin', 'studio_admin')
      or coalesce(((select auth.jwt()) -> 'app_metadata' ->> 'is_admin'), '') = 'true'
      or lower(coalesce(((select auth.jwt()) ->> 'email'), '')) in (
        'theflostudios0@gmail.com',
        'admin@flostudios.com',
        'hashilisbest@gmail.com'
      )
    );
$$;

-- 2. Stamp studio_admin role on hashilisbest@gmail.com in auth.users
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role": "studio_admin", "is_admin": true}'::jsonb
where lower(email) in (
  'theflostudios0@gmail.com',
  'admin@flostudios.com',
  'hashilisbest@gmail.com'
);

commit;
