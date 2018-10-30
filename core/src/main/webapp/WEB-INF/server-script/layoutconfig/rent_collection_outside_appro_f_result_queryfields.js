var override_queryfields = [ 
{
	name : 'rent_collection_date_from',
	queryexpression : "t1.rent_collection_date between to_date(${@rent_collection_date_from},'yyyy-mm-dd') and nvl(to_date(${@rent_collection_date_to},'yyyy-mm-dd'),t1.rent_collection_date)"
},
{
	name : 'rent_collection_date_to',
	queryexpression : "t1.rent_collection_date between nvl(to_date(${@rent_collection_date_from},'yyyy-mm-dd'),t1.rent_collection_date) and to_date(${@rent_collection_date_to},'yyyy-mm-dd')"
},
{
	name : 'rent_collection_code',
	queryexpression : "t1.rent_collection_code like ${@rent_collection_code}"
},
{
	name : 'contract_number',
	queryexpression : "t1.contract_number like ${@contract_number}"
}

];

override();
