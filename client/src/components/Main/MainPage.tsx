import Sider from 'antd/es/layout/Sider'
import Layout, { Content, Header } from 'antd/es/layout/layout'
import LeftColumn from '../Menu/LeftColumn'
import SearchBar from '../UpperBars/SearchBar'
import ProjectBar from '../UpperBars/ProjectBar'
import MainContent from './Dashboard'
import { Outlet, Route, Routes } from 'react-router-dom'
import Projects from '../Projects/Projects'
import Tasks from '../Tasks/Tasks'


const MainPage = () => {
  return (
    <Layout className='h-full w-full'>
      <Sider width="200px" className='h-full' style={{ background: '#fff' }}>
        <LeftColumn />
      </Sider>
      <Layout>
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