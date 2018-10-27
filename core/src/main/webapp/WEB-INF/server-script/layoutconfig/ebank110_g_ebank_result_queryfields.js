var override_queryfields = [

{
	name:'txcode',
	queryexpression:"t1.txcode like ${@txcode}"
},
{
	name:'tagname',
	queryexpression:"t1.tagname like ${@tagname}"
}

 ];

override();
