var add_datafilters = [ {
	name : 'check_flag',
	expression : "nvl(t1.REVIEW_FLAG,'N')='Y' and nvl(t1.REVERSED_FLAG,'N')='N'"
} ];

add_datafilter();
