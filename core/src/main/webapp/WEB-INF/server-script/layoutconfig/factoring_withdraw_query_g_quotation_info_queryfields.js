var add_datafilters = [ {
	name : 'check_flag',
	expression : " NVL(T1.MAIN_CONTRACT_FLAG,'N')<>'Y' and T1.wfl_status='APPROVED' and nvl(T1.review_flag,'N')='Y'  AND NVL(T1.DOCUMENT_STATUS,'NEW')='REVIEW'"
} ];

add_datafilter();
