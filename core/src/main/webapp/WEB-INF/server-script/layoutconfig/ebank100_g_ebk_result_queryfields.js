var override_queryfields = [

{
	name:'request_id',
	queryexpression:"t1.request_id = ${:@request_id}"
},
{
	name:'function_name',
	queryexpression:"t1.function_name like ${@function_name}"
}

 ];

override();
