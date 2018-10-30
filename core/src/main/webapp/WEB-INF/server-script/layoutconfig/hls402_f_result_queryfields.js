var override_queryfields = [ 
{
	name : 'channel_name',
	queryexpression : "t1.channel_name like ${@channel_name}"
},
{
	name : 'channel_coding',
	queryexpression : "t1.channel_coding like ${@channel_coding}"
},
{
	name : 'contacts_name',
	queryexpression : "t1.contacts_name like ${@contacts_name}"
},
{
	name : 'constacts_phone',
	queryexpression : "t1.constacts_phone like ${@constacts_phone}"
}

];

override();
