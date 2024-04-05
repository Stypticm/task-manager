import { useApolloClient } from '@apollo/client';
import Button from 'antd/es/button'
import { Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { filterProjects } from '../../features/filterProjects';
import { Project } from '../../utils/types';
import classNames from 'classnames';

const ProjectHighUrgency = () => {
    const apolloClient = useApolloClient();

    const [showText, setShowText] = useState(window.innerWidth > 700);
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const handleResize = () => {
            setShowText(window.innerWidth > 700);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const fetchData = async () => {
        const projects = await filterProjects(apolloClient, 'high');
        setProjects(projects);
        return projects;
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className={classNames('', showText ? 'flex-1 justify-center items-center' : 'flex-1 flex-wrap justify-center')}>
            <section className='flex justify-between'>
                <p>Project with high urgency</p>
                <NavLink to='/main/projects'>
                    <Button>
                        See all
                    </Button>
                </NavLink>
            </section>
            <section className='mt-5 md:flex md:flex-wrap md:justify-center md:gap-10'>
                {
                    !!projects && projects.map((project: Project) => (
                        <div key={project._id} className='shadow-2xl rounded-lg p-5'>
                            <p className='font-bold text-red-700 text-sm'>{project.status.toUpperCase()}</p>
                            <article className='font-bold text-2xl text-wrap'>{project.title}</article>
                            <p>{project.description}</p>
                            <div className='flex justify-between items-center mt-2'>
                                <p>Team</p>
                                <Button type='primary' icon={<Plus />} className='text-slate-100 bg-blue-900 font-bold flex justify-center items-center p-5'>
                                    {showText && <span>Invite</span>}
                                </Button>
                            </div>
                        </div>
                    ))
                }
            </section>
        </div>
    )
}

export default ProjectHighUrgency