import Sider from 'antd/es/layout/Sider'
import Layout, { Content, Header } from 'antd/es/layout/layout'
import LeftColumn from '../Menu/LeftColumn'
import SearchBar from '../UpperBars/SearchBar'
import ProjectBar from '../UpperBars/ProjectBar'
import { Outlet, useNavigate } from 'react-router-dom'


const MainPage = () => {

  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  if (!token) {
    navigate('/login')
    return null;
  }

  return (
    <Layout className='h-full w-full divide-x-2 divide-slate-300'>
      <Sider width="200px" className='h-full' style={{ background: '#fff' }}>
        <LeftColumn />
      </Sider>
      <Layout className='divide-y-2 divide-slate-300'>
        <Header style={{ background: '#fff' }} className='flex justify-between italic font-bold'>
          <SearchBar />
          <ProjectBar />
        </Header>
        <Content className='h-full w-full'>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainPage