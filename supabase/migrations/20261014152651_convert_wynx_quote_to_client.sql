create or replace function public.convert_wynx_quote_to_client(
  p_quote_id text,
  p_client_id text,
  p_client_data jsonb
)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if not (select public.is_wynx_admin()) then
    raise exception 'Administrator access required';
  end if;

  insert into public.site_clients (id, data)
  values (p_client_id, p_client_data);

  update public.site_quotes
  set data = jsonb_set(
    jsonb_set(data, '{status}', '"accepted"'::jsonb),
    '{convertedToClientId}',
    to_jsonb(p_client_id)
  )
  where id = p_quote_id;

  if not found then
    raise exception 'Quote not found';
  end if;
end;
$$;

revoke all on function public.convert_wynx_quote_to_client(text, text, jsonb) from public;
grant execute on function public.convert_wynx_quote_to_client(text, text, jsonb) to authenticated;
