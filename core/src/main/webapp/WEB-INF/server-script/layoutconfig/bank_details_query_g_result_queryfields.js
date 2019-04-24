var add_datafilters = [
    {
        name: "query_function",
        expression: "(t1.query_function = 'BANK100')"
    }
];

add_datafilter();
var override_queryfields = [
    {
        name : 'recipname',
        queryexpression : "t1.recipname like '%'||${@recipname}||'%'"
    },
    {
        name : 'recipaccno',
        queryexpression : "t1.recipaccno like '%'||${@recipaccno}||'%'"
    }

];

override();
