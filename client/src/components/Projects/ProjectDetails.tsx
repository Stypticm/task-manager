import { useApolloClient } from '@apollo/client'
import { useEffect, useState } from 'react'
import { QUERY_GET_PROJECT } from '../../graphql/queries/query_getprojects'
import { Project, User } from '../../utils/types'
import { QUERY_GET_USER } from '../../graphql/queries/query_getusers'
import { Button, Radio } from 'antd'
import { NavLink } from 'react-router-dom'
import TextArea from 'antd/es/input/TextArea'

const ProjectDetails = ({ projectId }: { projectId?: string }) => {

  const apolloClient = useApolloClient()
  const [project, setProject] = useState<Project>()
  const [user, setUser] = useState<User>()
  const [status, setStatus] = useState<string>('')

  const fetchData = async () => {
    const getProject = await apolloClient.query({
      query: QUERY_GET_PROJECT,
      variables: {
        _id: projectId
      }
    });

    const getUserById = await apolloClient.query({
      query: QUERY_GET_USER,
      variables: {
        _id: getProject.data.project.assignedTo
      }
    })

    setStatus(getProject.data.project.status)
    setProject(getProject.data.project)
    setUser(getUserById.data.user)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <div className='text-slate-900 m-5'>
        <section className='flex justify-between items-center'>
          <p className='font-bolds'>{user?.username}</p>
          <div>
            {
              status !== project?.status && <Button onClick={() => console.log('save changes')}>Save Changes</Button>
            }
            <Button className='ml-2'>
              <NavLink to='/main/projects'>Back to all projects</NavLink>
            </Button>
          </div>
        </section>
      </div>
      <div className='text-slate-900'>
        <h1 className='font-bold italic text-xl text-slate-600 text-center'>{project?.title}</h1>
        <section className='m-5'>
          <div className='flex gap-2'>
            <label className='font-bold'>Project Description:</label>
            <TextArea rows={4} value={project?.description} />
          </div>
          <div className='flex gap-2 mt-10'>
            <label className='font-bold'>Project Status:</label>
            <Radio.Group value={status} onChange={(e) => setStatus(e.target.value)}>
              <Radio value="high">High</Radio>
              <Radio value="medium">Medium</Radio>
              <Radio value="low">Low</Radio>
              <Radio value="hold">Hold</Radio>
            </Radio.Group>
          </div>
        </section>
      </div>
    </>
  )
}

export default ProjectDetails