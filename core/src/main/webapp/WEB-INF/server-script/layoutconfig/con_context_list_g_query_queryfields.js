var override_queryfields = [
{
	name : 'credit_date_from',
	queryexpression : "t1.credit_date between to_date(${@credit_date_from},'yyyy-mm-dd') and nvl(to_date(${@credit_date_to},'yyyy-mm-dd'),t1.credit_date)"
},
{
	name : 'credit_date_to',
	queryexpression : "t1.credit_date between nvl(to_date(${@credit_date_from},'yyyy-mm-dd'),t1.credit_date) and to_date(${@credit_date_to},'yyyy-mm-dd')"
},
{
	name : 'file_receive_date_from',
	queryexpression : "t1.file_receive_date between to_date(${@file_receive_date_from},'yyyy-mm-dd') and nvl(to_date(${@file_receive_date_to},'yyyy-mm-dd'),t1.file_receive_date)"
},
{
	name : 'file_receive_date_to',
	queryexpression : "t1.file_receive_date between nvl(to_date(${@file_receive_date_from},'yyyy-mm-dd'),t1.file_receive_date) and to_date(${@file_receive_date_to},'yyyy-mm-dd')"
}
];

override();