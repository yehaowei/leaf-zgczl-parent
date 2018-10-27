var override_queryfields = [ 

{
	name:'project_name',
	queryexpression:"t1.project_name like '%'||${@project_name}||'%'"
},                          
                         
{
	name : 'loan_date_from',
	queryexpression : "t1.loan_date between to_date(${@loan_date_from},'yyyy-mm-dd') and nvl(to_date(${@loan_date_to},'yyyy-mm-dd'),t1.loan_date)"
},

{
	name : 'loan_date_to',
	queryexpression : "t1.loan_date between nvl(to_date(${@loan_date_from},'yyyy-mm-dd'),t1.loan_date) and to_date(${@loan_date_to},'yyyy-mm-dd')"
}

];

override();
