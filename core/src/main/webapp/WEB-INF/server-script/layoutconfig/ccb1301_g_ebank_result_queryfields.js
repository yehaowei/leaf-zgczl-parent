var override_queryfields = [

{
	name:'document_number',
	queryexpression:"t1.document_number like  ${@document_number}"
},
{
	name:'status',
	queryexpression:"t1.status = ${@status}"
}

 ];

override();
