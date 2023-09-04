const tools = [
    {
        ward: 'moore',
        stri: '<p>stri moore</p>',
        sbmr: '<p>sbmr moore</p>',
        sbu: '<p>sbu moore</p>',
        vsrc: '<p>vsrc moore</p>',
        vtpc: '<p>vtpc moore</p>',
        sutftm: '<p>sutftm moore</p>',
        vso: '<p>vso moore</p>',
    },
    {
        ward: 'choctaw',
        stri: '<p>stri choctaw</p>',
        sbmr: '<p>sbmr choctaw</p>',
        sbu: '<p>sbu choctaw</p>',
        vsrc: '<p>vsrc choctaw</p>',
        vtpc: '<p>vtpc choctaw</p>',
        sutftm: '<p>sutftm choctaw</p>',
        vso: '<p>vso choctaw</p>',
    }
]

const events = [
    {
        ward: 'moore',
        time: {
            start: '2023-09-01 10:00',
            end: '2023-09-10 11:00',
        },
        title: 'Moore Ward Event',
        description: 'This is a test event for the Moore Ward',
        color: 'red',
        category: 'ward',
        isEditable: false,
    }
]

const contacts = [
    {
        name: "John Fellow",
        ward: 'moore',
        image: {
            src: "https://picsum.photos/200",
            alt: "John Fellow",
            width: "100%",
            class: "person-img square",
        },
        position: "Bishop",
        email: "bishop@email.com",
        phone: "555-555-5555",
        size: "full",
        organization: "Bishopric",
        bio: "I am the bishop of the ward",
    }
]

export{tools, events, contacts}