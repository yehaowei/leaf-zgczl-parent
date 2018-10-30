var override_queryfields = [
		{
			name : 'loan_date_1_from',
			queryexpression : "loan_date_1 between ${@loan_date_1_from} and nvl(${@loan_date_1_to},loan_date_1)"
		},
		{
			name : 'loan_date_1_to',
			queryexpression : "loan_date_1 between nvl(${@loan_date_1_from},loan_date_1) and ${@loan_date_1_to}"
		},
		{
			name : 'lease_start_date_from',
			queryexpression : "lease_start_date between ${@lease_start_date_from} and nvl(${@lease_start_date_to},lease_start_date)"
		},
		{
			name : 'lease_start_date_to',
			queryexpression : "lease_start_date between nvl(${@lease_start_date_from},lease_start_date) and ${@lease_start_date_to}"
		}
];
override();
