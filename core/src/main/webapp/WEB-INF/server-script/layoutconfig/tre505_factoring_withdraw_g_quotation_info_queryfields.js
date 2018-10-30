var add_datafilters = [ {
	name : 'check_flag',
	expression : " NVL(T1.MAIN_CONTRACT_FLAG,'N')<>'Y' and nvl(t1.wfl_status,'NEW') IN ('NEW','REJECT','APPROVING') "
} ];

add_datafilter();