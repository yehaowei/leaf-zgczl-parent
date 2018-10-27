CREATE OR REPLACE VIEW "SYS_ROLE_MENU_V" AS SELECT
	lpad( e.role_function_group_id, 10, 0 ) AS menu_id,
	e.role_id,
	e.function_group_id AS function_id,
	g.function_group_code AS function_code,
	g.function_group_name AS function_name,
	'MENU' menu_type,
	nvl( e.layout_sequence, g.layout_sequence ) AS layout_sequence,
	e.enabled_flag,
	lpad( e.parent_role_function_group_id, 10, 0 ) AS parent_menu_id,
	g.creation_date,
	g.created_by,
	g.last_update_date,
	g.last_updated_by
FROM
	sys_role_function_group e,
	sys_function_group_vl g
WHERE
	e.function_group_id = g.function_group_id
	AND e.enabled_flag = 'Y'
	AND g.enabled_flag = 'Y' UNION ALL
SELECT
	lpad( e.role_function_group_id, 10, 0 ) || lpad( r.function_id, 10, 0 ) AS menu_id,
	e.role_id,
	r.function_id,
	f.function_code,
	f.function_name,
	'FUNCTION' menu_type,
	nvl( r.layout_sequence, f.sequence ) AS layout_sequence,
	r.enabled_flag,
	lpad( e.role_function_group_id, 10, 0 ) AS parent_menu_id,
	r.creation_date,
	r.created_by,
	r.last_update_date,
	r.last_updated_by
FROM
	sys_role_function_group e,
	sys_function_group_item r,
	sys_function_vl f
WHERE
	e.function_group_id = r.function_group_id
	AND r.function_id = f.function_id
	AND NOT EXISTS ( SELECT * FROM sys_role_function_exclude_item i WHERE i.role_function_group_id = e.role_function_group_id AND i.function_id = r.function_id )
	AND r.enabled_flag = 'Y'
	AND e.enabled_flag = 'Y'