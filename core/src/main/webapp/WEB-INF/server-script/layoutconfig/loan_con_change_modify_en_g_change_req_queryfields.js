var override_queryfields = [
		
		{
			field : 'change_req_number',
			queryoperator : 'like'
		},
		{
			field : 'loan_contract_number',
			queryoperator : 'like'
		},
		{
			field : 'loan_contract_name',
			queryoperator : 'like'
		},
		{
			name : 'loan_con_bp_name',
			queryexpression : "T1.loan_con_bp_n=${@loan_con_bp_name}"
		},
		{
			field : 'loan_con_type',
			queryoperator : '='
		},
		{
			field : 'loan_con_type_detail',
			queryoperator : '='
		},
		{
			field : 'req_status',
			queryoperator : '='
		},
		{
			name : 'loan_date_from',
			queryexpression : "T1.loan_date_from>=trunc(to_date(${@loan_date_from},'yyyy-mm-dd'))"
		},
		{
			name : 'loan_date_to',
			queryexpression : "trunc(T1.loan_date_to)<=to_date(${@loan_date_to},'yyyy-mm-dd')"
		},
		{
			name : 'status_check_flag',
			queryexpression :  "${@status_check_flag}= 'Y' and t1.req_status in('NEW','REJECT')" 
		}

		 ];

override();
