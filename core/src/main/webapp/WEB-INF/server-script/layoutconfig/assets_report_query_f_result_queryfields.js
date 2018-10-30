var override_queryfields = [ 

{
	name:'asset_hierarchic_number',
	queryexpression:"t1.asset_hierarchic_number like ${@asset_hierarchic_number}"
},                          
                         
{
	name : 'creation_date_from',
	queryexpression : "t1.created_times between to_date(${@creation_date_from},'yyyy-mm-dd') and nvl(to_date(${@creation_date_to},'yyyy-mm-dd'),t1.created_times)"
},

{
	name : 'creation_date_to',
	queryexpression : "t1.created_times between nvl(to_date(${@creation_date_from},'yyyy-mm-dd'),t1.created_times) and to_date(${@creation_date_to},'yyyy-mm-dd')"
}

];

override();
