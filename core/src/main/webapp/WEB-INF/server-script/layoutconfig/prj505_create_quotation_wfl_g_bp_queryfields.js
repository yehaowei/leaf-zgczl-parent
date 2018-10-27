remove_datafilter('quotation_id');
remove_query_field('quotation_id');
var add_datafilters = [ {
	name : 'project_id',
	expression : '(t1.project_id = ${@project_id})'
} ];

add_datafilter();
