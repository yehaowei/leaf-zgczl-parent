var override_queryfields = [ {
	name : 'bp_name',
	queryexpression : "t1.bp_name like '%'||${@bp_name}||'%'"
}, {
	name : 'extra_nam',
	queryexpression : "t1.extra_nam like '%'||${@extra_nam}||'%'"
}, {
	name : 'bp_code',
	queryexpression : "t1.bp_code like '%'||${@bp_code}||'%'"
}, {
	name : 'bp_type_desc',
	queryexpression : "t1.bp_type_desc like '%'||${@bp_type_desc}||'%'"
} ];

override();
