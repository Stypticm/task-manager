import React from 'react'

const TeamMember = () => {

    const members = [
        {
            id: 1,
            name: 'John',
            surname: 'Doe',
            tasks: 2
        },
        {
            id: 2,
            name: 'Mark',
            surname: 'Link',
            tasks: 5
        },
        {
            id: 3,
            name: 'Sam',
            surname: 'Smith',
            tasks: 1
        },
    ]

    return (
        <div className='text-slate-900 flex flex-col items-center'>
            <h2>Available team member</h2>
            <search></search>
            <p>Result</p>
            {
                members.map((member) => (
                    <p key={member.id}>{member.name} {member.surname} - {member.tasks} tasks</p>
                ))
            }
        </div>
    )
}

export default TeamMember