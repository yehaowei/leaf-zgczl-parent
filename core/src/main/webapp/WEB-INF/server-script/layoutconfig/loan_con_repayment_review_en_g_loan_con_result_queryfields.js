var override_queryfields = [
		{
			field : 'business_type',
			queryoperator : '='
		},
		{
			field : 'loan_contract_id',
			queryoperator : '='
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
			name : 'loan_con_bp',
			queryexpression : "T1.loan_con_bp=${@loan_con_bp}"
		},
		{
			name : 'loan_con_bp_n',
			queryexpression : "T1.loan_con_bp_code like ${@loan_con_bp_n}"
		},
		{
			name : 'bank_branch_bp_id_n',
			queryexpression : "T1.loan_con_bp_n=${@bank_branch_bp_id_n}"
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
			name : 'loan_con_wfl_status',
			queryexpression : "nvl(t1.loan_con_wfl_status,'WFL_NEW')=${@loan_con_wfl_status}"
		},
		{
			name : 'status_check_flag',
			queryexpression : "${@status_check_flag}='Y' and t1.data_class='NORMAL' and nvl(t1.loan_con_wfl_status,'WFL_NEW')='WFL_APPROVED' and nvl(t1.loan_contract_status,'NEW') IN ('REVIEWED') and  exists(select 1 from tre_loan_con_write_off wo where wo.loan_contract_id=t1.loan_contract_id and nvl(wo.review_flag,'N')='N'  and wo.plan_type='REPAYMENT')" 
		}

		 ];

override();
