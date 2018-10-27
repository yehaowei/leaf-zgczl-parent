var override_queryfields = [
		{
			name : 'loan_contract_number',
			queryexpression : "t1.loan_contract_number like '%'||${@loan_contract_number}||'%'"
		},
		{
			name : 'loan_contract_name',
			queryexpression : "t1.loan_contract_name like '%'||${@loan_contract_name}||'%'"
		},
		{
			name : 'bank_branch_bp_id_n',
			queryexpression : "t1.loan_con_bp_n like '%'||${@bank_branch_bp_id_n}||'%'"
		},
		{
			name : 'loan_date_from',
			queryexpression : "T1.loan_date_from>=trunc(to_date(${@loan_date_from},'yyyy-mm-dd'))"
		},
		{
			name : 'loan_date_to',
			queryexpression : "trunc(T1.loan_date_to)<=to_date(${@loan_date_to},'yyyy-mm-dd')"
		}];

override();
