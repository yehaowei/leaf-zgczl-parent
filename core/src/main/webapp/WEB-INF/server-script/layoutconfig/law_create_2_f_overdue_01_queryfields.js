remove_query_field('contract_id');
remove_query_field('contract_id');
remove_datafilter('contract_id');



var add_datafilters=[
 {
	name:'contract_id',
	expression:'(t1.contract_id != ${@contract_id})'
},
{
	name:'bp_id_tenant',
	expression:'(t1.bp_id_tenant = ${@bp_id_tenant})'
}
 ];
 
add_datafilter();

