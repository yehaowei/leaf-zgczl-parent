var override_queryfields = [
{
	name:'mortgage_id',
	queryexpression:"t1.mortgage_id=${@mortgage_id}"
},
{
	name:'mortgage_code',
	queryexpression:"t1.mortgage_id = ${@mortgage_code}"
},
{
	name:'mortgage_name',
	queryexpression:"t1.mortgage_name like ${@mortgage_name}"
},
{
	name:'mortgage_type',
	queryexpression:"t1.mortgage_type=${@mortgage_type}"
},
{
	name:'mortgage_ast_classfication_n',
	queryexpression:"t1.mortgage_ast_classfication_n=${@mortgage_ast_classfication_n}"
},
{
	name:'mortgage_asset_detail',
	queryexpression:"t1.mortgage_asset_detail=${@mortgage_asset_detail}"
},
{
	name:'mortgage_asset_detail_n',
	queryexpression:"t1.mortgage_asset_detail_n=${@mortgage_asset_detail_n}"
},
{
	name:'mortgage_contract_no',
	queryexpression:"t1.mortgage_contract_no like ${@mortgage_contract_no}"
},
{
	name:'project_number',
	queryexpression:"t1.project_id = ${@project_number}"
},
{
	name:'project_name',
	queryexpression:"t1.project_id_n like ${@project_name}"
},

{
	name:'mortgage_register_no',
	queryexpression:"t1.mortgage_register_no like ${@mortgage_register_no}"
},
{
	name:'bp_id_mortgagor',
	queryexpression:"t1.bp_id_mortgagor like ${@bp_id_mortgagor}"
},
{
	name:'bp_id_mortgagor_n',
	queryexpression:"t1.bp_id_mortgagor_n like ${@bp_id_mortgagor_n}"
},
{
	name:'mortgage_status_n',
	queryexpression:"t1.mortgage_status_n like ${@mortgage_status_n}"
},
{
	name:'mortgage_status',
	queryexpression:"t1.mortgage_status like ${@mortgage_status}"
}


 ];

override();
