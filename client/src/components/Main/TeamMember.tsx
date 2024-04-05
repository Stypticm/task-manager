import { Button, Input } from 'antd'
import { Plus, Search } from 'lucide-react'
import { useEffect, useState } from 'react';

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

    const [showText, setShowText] = useState(window.innerWidth > 700);

    useEffect(() => {
        const handleResize = () => {
            setShowText(window.innerWidth > 700);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className='sm:flex-2 lg:flex-1'>
            <div className='w-full flex flex-col justify-center items-center gap-2'>
                <h2>Available team member</h2>
                <div className='mt-4 shadow-2xl p-5 rounded-md flex flex-col gap-4 max-[380px]:w-full'>
                    <Input prefix={<Search size={16} className='text-slate-900' />} placeholder="Search..." />
                    <section>
                        <p className='italic text-sm mt-2'>
                            Result of search
                        </p>
                        <div className='flex justify-between items-center gap-2'>
                            <div className='flex justify-between items-center gap-2'>
                                <img src="https://i.pravatar.cc/30" alt="avatar" className='rounded-full' />
                                <div>
                                    <p className='font-bold text-lg'>Name Surname</p>
                                    <p className='text-red-700 font-bold'>2 Tasks left</p>
                                </div>
                            </div>
                            <Button type='primary' icon={<Plus />} className='text-slate-100 bg-blue-900 font-bold flex justify-center items-center p-5'>
                                {showText && <span>Invite</span>}
                            </Button>
                        </div>
                    </section>

                    <section>
                        <p className='italic text-sm mt-2'>
                            Recommendation
                        </p>
                        {
                            members.map((member) => (
                                <div key={member.id} className='flex justify-between items-center gap-2'>
                                    <div className='flex justify-between items-center gap-2'>
                                        <img src="https://i.pravatar.cc/30" alt="avatar" className='rounded-full' />
                                        <div>
                                            <p className='font-bold text-lg'>{member.name} {member.surname}</p>
                                            <p className='text-green-600 font-bold'>{member.tasks} Tasks left</p>
                                        </div>
                                    </div>
                                    <Button type='primary' icon={<Plus />} className='text-slate-100 bg-blue-900 font-bold flex justify-center items-center p-5'>
                                        {showText && <span>Invite</span>}
                                    </Button>
                                </div>
                            ))
                        }
                    </section>

                </div>
            </div>
        </div>
    )
}

export default TeamMember