var override_queryfields = [

{	
	name:'application_no',
	queryexpression:"t1.application_no like  ${@application_no}"
},

{
	name:'borrow_date',
	queryexpression:"t1.borrow_date = to_date(${@borrow_date},'yyyy-mm-dd')"
},

{
	name:'estimated_return_date',
	queryexpression:"t1.estimated_return_date = to_date(${@estimated_return_date},'yyyy-mm-dd')"
},

{
	name:'note',
	queryexpression:"t1.note like ${@note}"
}

];

override();