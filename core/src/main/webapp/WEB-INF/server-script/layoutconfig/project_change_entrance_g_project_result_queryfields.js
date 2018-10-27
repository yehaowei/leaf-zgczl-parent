var override_queryfields = [
		{
			field : 'project_id',
			queryoperator : "="
		},
		{
			name : 'project_name',
			queryexpression : "t1.project_name like '%'||${@project_name}||'%'"
		},
		{
			name : 'creation_date_from',
			queryexpression : "trunc(t1.creation_date_dis) between to_date(nvl(${@creation_date_from},t1.creation_date_dis),'yyyy-mm-dd') and nvl(to_date(${@creation_date_to},'yyyy-mm-dd'),t1.creation_date_dis)"
		},
		{
			name : 'creation_date_to',
			queryexpression : "trunc(t1.creation_date_dis) between nvl(to_date(${@creation_date_from},'yyyy-mm-dd'),t1.creation_date_dis) and to_date(${@creation_date_to},'yyyy-mm-dd')"
		},
		{
			name : 'bp_id',
			queryexpression : "exists (select 1 from prj_project_bp b where b.project_id=t1.project_id and b.bp_id=${@bp_id} and b.bp_category in ('TENANT','TENANT_SEC'))"
		},
		{
			name : 'bp_name',
			queryexpression : "exists (select 1 from prj_project_bp_v b where b.project_id=t1.project_id and b.bp_category in ('TENANT','TENANT_SEC') and b.bp_name like '%'||${@bp_name}||'%')"
		},
		{
			field : 'employee_id',
			queryoperator : "="
		},
		{
			field : 'lease_organization',
			queryoperator : "="
		},
		{
			field : 'employee_id_of_manager',
			queryoperator : "="
		},
		{
			field : 'division',
			queryoperator : "="
		},
		{
			field : 'lease_channel',
			queryoperator : "="
		},
		{
			field : 'document_type',
			queryoperator : "="
		},
		{
			field : 'project_status',
			queryoperator : "="
		},
		{
			field : 'search_term_1',
			queryoperator : "="
		},
		{
			field : 'search_term_2',
			queryoperator : "="
		},
		{
			name : 'check_flag',
			queryexpression : "${@check_flag}='Y' and T1.PROJECT_STATUS NOT IN ('NEW','APPROVED_RETURN','REJECT','RECONSIDER','CLOSED','APPROVING')"
		}

];

override();
