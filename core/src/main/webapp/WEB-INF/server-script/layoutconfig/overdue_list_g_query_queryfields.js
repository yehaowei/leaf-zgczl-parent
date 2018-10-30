var override_queryfields = [ 

{
	name : 'inception_of_lease_from',
	queryexpression : "t1.inception_of_lease between to_date(${@inception_of_lease_from},'yyyy-mm-dd') and nvl(to_date(${@inception_of_lease_to},'yyyy-mm-dd'),t1.inception_of_lease)"
},
{
	name : 'inception_of_lease_to',
	queryexpression : "t1.inception_of_lease between nvl(to_date(${@inception_of_lease_from},'yyyy-mm-dd'),t1.inception_of_lease) and to_date(${@inception_of_lease_to},'yyyy-mm-dd')"
},
{
	name : 'division',
	queryexpression : "t1.division  in  ${:@division}"
}
];

override();
