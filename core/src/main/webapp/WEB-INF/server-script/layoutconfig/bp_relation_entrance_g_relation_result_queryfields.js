var override_queryfields = [
{
	name:'bp_code_from',
	queryexpression:"t1.bp_code between ${@bp_code_from} and nvl(${@bp_code_to},t1.bp_code)"
},
{
	name:'bp_code_to',
	queryexpression:"t1.bp_code between nvl(${@bp_code_from},t1.bp_code) and ${@bp_code_to}"
},
{
	name:'bp_code',
	queryexpression:"t1.bp_code like ${@bp_code}"
},
{
	name:'bp_name',
	queryexpression:"t1.bp_name like ${@bp_name}"
},
{
	name:'extra_nam',
	queryexpression:"t1.extra_nam like ${@extra_nam}"
},
{
	field:'bp_type',
	queryoperator:"="
}


 ];

override();
