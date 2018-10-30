var override_queryfields = [

{
	name:'document_number',
	queryexpression:"t1.document_number like  ${@document_number}"
},
{
	name:'status',
	queryexpression:"t1.status = ${@status}"
},
{
	name:'new_time_from',
	queryexpression:"t1.new_date &gt;  ${@new_time_from}"
},
{
	name:'new_time_to',
	queryexpression:"t1.new_date &lt;  ${@new_time_to}"
},

{
	name:'acr_time_from',
	queryexpression:"t1.acr_date &gt;  ${@acr_time_from}"
},
{
	name:'acr_time_to',
	queryexpression:"t1.acr_date &lt;  ${@acr_time_to}"
}

 ];

override();
