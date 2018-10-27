var override_queryfields = [

		{
			name : 'contract_number',
			queryexpression : "t1.contract_number like '%'||${@contract_number}||'%'"
		},
		{
			name : 'contract_name',
			queryexpression : "t1.contract_name like '%'||${@contract_name}||'%'"
		},

		{
			name : 'due_date_from',
			queryexpression : "t1.due_date between to_date(${@due_date_from},'yyyy-mm-dd') and nvl(to_date(${@due_date_to},'yyyy-mm-dd'),t1.due_date)"
		},

		{
			name : 'due_date_to',
			queryexpression : "t1.due_date between nvl(to_date(${@due_date_from},'yyyy-mm-dd'),t1.due_date) and to_date(${@due_date_to},'yyyy-mm-dd')"
		},
		{
			name : 'lease_start_date_from',
			queryexpression : "t1.lease_start_date between to_date(${@lease_start_date_from},'yyyy-mm-dd') and nvl(to_date(${@lease_start_date_to},'yyyy-mm-dd'),t1.lease_start_date)"
		},

		{
			name : 'lease_start_date_to',
			queryexpression : "t1.lease_start_date between nvl(to_date(${@lease_start_date_from},'yyyy-mm-dd'),t1.lease_start_date) and to_date(${@lease_start_date_to},'yyyy-mm-dd')"
		},
		{
			name : 'lease_end_date_from',
			queryexpression : "t1.lease_end_date between to_date(${@lease_end_date_from},'yyyy-mm-dd') and nvl(to_date(${@lease_end_date_to},'yyyy-mm-dd'),t1.lease_end_date)"
		},

		{
			name : 'lease_end_date_to',
			queryexpression : "t1.lease_end_date between nvl(to_date(${@lease_end_date_from},'yyyy-mm-dd'),t1.lease_end_date) and to_date(${@lease_end_date_to},'yyyy-mm-dd')"
		},
		{
			name : 'full_write_off_date_from',
			queryexpression : "t1.full_write_off_date between to_date(${@full_write_off_date_from},'yyyy-mm-dd') and nvl(to_date(${@full_write_off_date_to},'yyyy-mm-dd'),t1.full_write_off_date)"
		},

		{
			name : 'full_write_off_date_to',
			queryexpression : "t1.full_write_off_date between nvl(to_date(${@full_write_off_date_from},'yyyy-mm-dd'),t1.full_write_off_date) and to_date(${@full_write_off_date_to},'yyyy-mm-dd')"
		},
		{
			name : 'ar_end_date_from',
			queryexpression : "t1.ar_end_date between to_date(${@ar_end_date_from},'yyyy-mm-dd') and nvl(to_date(${@ar_end_date_to},'yyyy-mm-dd'),t1.ar_end_date)"
		},

		{
			name : 'ar_end_date_to',
			queryexpression : "t1.ar_end_date between nvl(to_date(${@ar_end_date_from},'yyyy-mm-dd'),t1.ar_end_date) and to_date(${@ar_end_date_to},'yyyy-mm-dd')"
		},
		{
			name : 'full_write_off_date_t_from',
			queryexpression : "t1.full_write_off_date_t between to_date(${@full_write_off_date_t_from},'yyyy-mm-dd') and nvl(to_date(${@full_write_off_date_t_to},'yyyy-mm-dd'),t1.full_write_off_date_t)"
		},

		{
			name : 'full_write_off_date_t_to',
			queryexpression : "t1.full_write_off_date_t between nvl(to_date(${@full_write_off_date_t_from},'yyyy-mm-dd'),t1.full_write_off_date_t) and to_date(${@full_write_off_date_t_to},'yyyy-mm-dd')"
		}

];

override();
