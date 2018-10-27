var add_datafilters = [

{
	name : 'company_id',
	expression : "(t1.write_off_flag <> 'FULL' and t1.company_id=${/session/@company_id} and t1.bp_id =${@bp_id})"
} ];

add_datafilter();
remove_query_field('payment_req_ln_id');