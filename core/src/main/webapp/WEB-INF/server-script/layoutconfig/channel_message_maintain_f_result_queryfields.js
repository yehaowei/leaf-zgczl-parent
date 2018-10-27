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

var add_datafilters=[
                     {
                    	name:'owner_user_id',
                    	expression:"t1.owner_user_id in (SELECT owner_user_id FROM aut_owner_user_authorize t  WHERE authorized_user_id = ${/session/@user_id} AND t.trx_category='CHANNEL')"
                    }
                     ];


override();
add_datafilter();