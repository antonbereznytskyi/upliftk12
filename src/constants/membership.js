export const memberships =  [
    {
        id: 1,
        title: 'Educator Free',
        content: 'For the basic starters',
        price: {
            monthly: 0,
            annual: 0
        },
        current_plan: false,
        color: {
            light: 'bg-[#48B6FF]',
            background: 'bg-[#2f8dcc]'
        },
        //current_plan: user.membership_type == 1 ? true : false,
        features: [
            'Maximum 5 resources from the Digital Library',
            'Shareable class link',
            '25 students max',
        ],
    },
    {
        id: 2,
        title: 'Premium',
        content: 'Popular option for teachers',
        price: {
            monthly: 9.99,
            annual: 99
        },
        color: {
            light: 'bg-[#ffb7b7]',
            background: 'bg-[#ED2426]'
        },
        current_plan:false,
        //current_plan: user.membership_type == 2 ? true : false,
        features: [
            'Unlimited use of resources from the Digital Library',
            'Unlimited assignments',
            'Animated Rewards',
            'Student Feedback',
            'File Upload'
        ],

    },
    {
        id: 3,
        title: 'Pro',
        content: 'Popular in tutors/virtual class teachers',
        price: {
            monthly: 24.99,
            annual: 250
        },
        
        color: {
            light: 'bg-[#4ecf6f]',
            background: 'bg-[#16a260]'
        },
        current_plan: false,
        //current_plan: user.membership_type == 3 ? true : false,
        features: [
            'Everything in premium including',
            'Invite students to collaborate and join',
            'Session recordings',
            'Live audio/video',
            'This plan has features for virtual instruction or online tutoring'
        ],
    },
    {
        id: 4,
        title: 'Enterprise',
        content: 'For Principals or Tuturing company',
        price: {
            monthly: 300,
            annual: 3000
        },
        color: {
            light: 'bg-[#ffd790]',
            background: 'bg-[#faa91c]'
        },
        
        current_plan: false,
        //current_plan: user.membership_type == 3 ? true : false,
        features: [
            'Everything in Premium and Pro including',
            'Implementation',
            'Customer Success',
        ],
    },
]