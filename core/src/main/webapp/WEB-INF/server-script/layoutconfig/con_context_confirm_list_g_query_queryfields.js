var override_queryfields = [
{
	field : 'search_term_1',
	queryoperator : "like"
},
{
	name : 'file_receive_date_from',
	queryexpression : "t1.file_receive_date between to_date(${@file_receive_date_from},'yyyy-mm-dd') and nvl(to_date(${@file_receive_date_to},'yyyy-mm-dd'),t1.file_receive_date)"
},
{
	name : 'file_receive_date_to',
	queryexpression : "t1.file_receive_date between nvl(to_date(${@file_receive_date_from},'yyyy-mm-dd'),t1.file_receive_date) and to_date(${@file_receive_date_to},'yyyy-mm-dd')"
},
{
	name : 'authority',
	queryexpression : "t1.data_class = 'NORMAL' and exists (select 1 from aut_trx_user_authorize a1, aut_owner_user_authorize a2 where a1.trx_category = 'CONTRACT' and a1.trx_id = t1.contract_id and trunc(sysdate) between a1.start_date and nvl(a1.end_date, trunc(sysdate)) and a1.user_id = a2.owner_user_id and a1.trx_category = a2.trx_category and a2.authorized_user_id = ${/session/@user_id} and trunc(sysdate) between a2.start_date and nvl(a2.end_date, trunc(sysdate)))"
}
];

override();