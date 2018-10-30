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
			queryexpression : "trunc(t1.creation_date_dis) between to_date(${@creation_date_from},'yyyy-mm-dd') and nvl(to_date(${@creation_date_to},'yyyy-mm-dd'),t1.creation_date_dis)"
		},
		{
			name : 'creation_date_to',
			queryexpression : "trunc(t1.creation_date_dis) between nvl(to_date(${@creation_date_from},'yyyy-mm-dd'),t1.creation_date_dis) and to_date(${@creation_date_to},'yyyy-mm-dd')"
		},
		{
			name : 'approved_date_from',
			queryexpression : "trunc(t1.approved_date) between to_date(${@approved_date_from},'yyyy-mm-dd') and nvl(to_date(${@approved_date_to},'yyyy-mm-dd'),t1.approved_date)"
		},
		{
			name : 'approved_date_to',
			queryexpression : "trunc(t1.approved_date) between nvl(to_date(${@approved_date_from},'yyyy-mm-dd'),t1.approved_date) and to_date(${@approved_date_to},'yyyy-mm-dd')"
		},
		{
			name : 'bp_id',
			queryexpression : "exists (select 1 from prj_project_bp b where b.project_id=t1.project_id and b.bp_id=${@bp_id})"
		},
		{
			name : 'bp_name',
			queryexpression : "t1.bp_name like '%'||${@bp_name}||'%'"
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
			name : 'DATA_CLASS',
			queryexpression : "exists (select 1 from aut_trx_user_authorize a1, aut_owner_user_authorize a2 where a1.trx_category = 'PROJECT' and a1.trx_id = t1.contract_id and trunc(sysdate) between a1.start_date and nvl(a1.end_date, trunc(sysdate)) and a1.user_id = a2.owner_user_id and a1.trx_category = a2.trx_category and a2.authorized_user_id = ${/session/@user_id} and trunc(sysdate) between a2.start_date and nvl(a2.end_date, trunc(sysdate)))"
		}

];

override();
