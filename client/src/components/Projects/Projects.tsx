import { useApolloClient } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Project, User } from '../../utils/types';
import { NavLink, Outlet, Route, Routes, useParams } from 'react-router-dom';
import { QUERY_GET_PROJECTS } from '../../graphql/queries/query_getprojects';
import ProjectDetails from './ProjectDetails';
import { Card } from 'antd';
import { QUERY_GET_USER } from '../../graphql/queries/query_getusers';

const Projects = () => {
  const apolloClient = useApolloClient();
  const [projects, setProjects] = useState<Project[]>([]);
  const [user, setUser] = useState<User>()

  const fetchData = async () => {
    const result = await apolloClient.query({
      query: QUERY_GET_PROJECTS
    });

    const getUserById = await apolloClient.query({
      query: QUERY_GET_USER,
      variables: {
        _id: result.data.projects[0].assignedTo
      }
    })

    setUser(getUserById.data.user)
    setProjects(result.data.projects);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='text-slate-900 m-5 flex flex-wrap gap-4 justify-center'>
        {projects.map((project: Project) => (
          <Card key={project._id} className='text-slate-900 bg-slate-600'>
            <div className='text-slate-900'>
              <NavLink to={`${project._id}`}>
                <section>
                  <h1 className='font-bold italic text-xl text-slate-400 text-center'>{project.title}</h1>
                  {
                    project.description.length > 50 ? <p>{project.description.slice(0, 50)}...</p> : <p>{project.description}</p>
                  }
                  <p>{project.status}</p>
                  <p>{user?.username}</p>
                </section>
              </NavLink>
            </div>
          </Card>
        ))}
        <Outlet />
    </div>
  );
};

const ProjectsPage = () => {
  let { id } = useParams();

  return (
    <div>
      {!!id && <ProjectDetails projectId={id} />}
    </div>
  );
};

const ProjectsComponent = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path=":id" element={<ProjectsPage />} />
      </Routes>
    </>
  );
};

export default ProjectsComponent;