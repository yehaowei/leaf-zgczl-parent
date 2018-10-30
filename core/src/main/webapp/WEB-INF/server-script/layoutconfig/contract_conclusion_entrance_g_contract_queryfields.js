var override_queryfields = [ 

{
	name:'data_filter',
	//queryexpression:"EXISTS (SELECT 1 FROM sys_user s, prj_chance_service_managers c, prj_project p WHERE s.employee_id = c.employee_id AND c.chance_id = p.chance_id AND p.project_id = t1.project_id AND s.user_id = ${/session/@user_id})"
	//业务部门人员仅能看到该业务部门的数据，其它人员，能看到所有数据
	queryexpression:"(((${/session/@user_id} IN (SELECT s.user_id FROM sys_user_unit_v s WHERE s.org_unit_type = 'SALES')) AND t1.unit_id = (SELECT s.unit_id FROM sys_user_unit_v s WHERE s.user_id = ${/session/@user_id})) OR (${/session/@user_id} NOT IN (SELECT s.user_id FROM sys_user_unit_v s WHERE s.org_unit_type = 'SALES')))"
},
{
			name : 'lease_end_date_to',
			queryexpression : "t1.lease_end_date <= to_date(nvl(${@lease_end_date_to},(select  to_char(last_day(sysdate), 'yyyy-mm-dd') from dual)),'yyyy-mm-dd')"

		}

];

override();
