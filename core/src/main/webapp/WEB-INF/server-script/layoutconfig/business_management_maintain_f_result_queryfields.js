var override_queryfields = [ 
{
	name : 'business_opp_code',
	queryexpression : "t1.business_opp_code like ${@business_opp_code}"
},
{
	name : 'chance_bp_name',
	queryexpression : "t1.chance_bp_name like ${@chance_bp_name}"
}

];

var add_datafilters=[
                     {
                    	name:'owner_user_id',
                    	expression:"t1.owner_user_id in (SELECT owner_user_id FROM aut_owner_user_authorize t  WHERE authorized_user_id = ${/session/@user_id} AND t.trx_category='BUSINESS')"
                    }
                     ];

override();
add_datafilter();