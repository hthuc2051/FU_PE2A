export const headLecturerNavArr = [
    // {
    //     title: 'Dashboard',
    //     type: 'nav-item',
    //     link: '/head-lecturer/1'
    // },
    {
        title: 'Create script',
        type: 'drop-down',
        link: '/head-lecturer/1/scripts',
        dropDownArr: [
            {
                title: 'Java',
                link:'/subjects/1/scripts/create'
            },
            {
                title: 'CSharp',
                link:'/subjects/2/scripts/create'
            },
            {
                title: 'Java Web',
                link:'/subjects/3/scripts/create'
            }
            ,
            {
                title: 'C',
                link:'/subjects/4/scripts/create'
            }
        ]
    },
    {
        title: 'Subject scripts',
        type: 'drop-down',
        link: '/head-lecturer/1/scripts',
        dropDownArr: [
            {
                title: 'Java',
                link:'/subjects/1/scripts'
            },
            {
                title: 'CSharp',
                link:'/subjects/2/scripts'
            },
            {
                title: 'Java Web',
                link:'/subjects/3/scripts'
            },
            {
                title: 'C',
                link:'/subjects/4/scripts'
            }
        ]
    },
    {
        title: 'Practical subjects',
        type: 'drop-down',
        link: '/head-lecturer/1/subjects',
        dropDownArr: [
            {
                title: 'Java',
                link:'/subjects/1/practical-exams'
            },
            {
                title: 'CSharp',
                link:'/subjects/2/practical-exams'
            },
            {
                title: 'Java Web',
                link:'/subjects/3/practical-exams'
            },
            {
                title: 'C',
                link:'/subjects/4/practical-exams'
            }
        ]
    }
]