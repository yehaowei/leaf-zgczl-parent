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
