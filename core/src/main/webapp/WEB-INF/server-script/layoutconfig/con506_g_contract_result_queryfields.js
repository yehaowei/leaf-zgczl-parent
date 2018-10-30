var override_queryfields = [

{
	name: 'bp_name',
	queryexpression: "t1.bp_id_tenant_n = ${@bp_name}"
},

{
	name: 'project_number',
	queryexpression: "t1.project_id_c = ${@project_number}"
},

{
	name : 'lease_start_date_from',
	queryexpression: "t1.lease_start_date between to_date(${@lease_start_date_from},'yyyy-mm-dd') and nvl(to_date(${@lease_start_date_to},'yyyy-mm-dd'),t1.lease_start_date)"
},
{
	name : 'lease_start_date_to',
	queryexpression: "t1.lease_start_date between nvl(to_date(${@lease_start_date_from},'yyyy-mm-dd'),t1.lease_start_date) and to_date(${@lease_start_date_to},'yyyy-mm-dd')"
},

{
	name: 'lease_channel_desc',
	queryexpression: "t1.lease_channel = ${@lease_channel_desc}"
},

{
	name: 'file_complete_date',
	queryexpression: "t1.file_complete_date = to_date(${@file_complete_date},'YYYY-MM-DD')"
}

];

override();