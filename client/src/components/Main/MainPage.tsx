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
    <div className="bg-slate-500 h-screen flex">
      <LeftColumn />
      <div className='flex-grow overflow-auto'>
        <header className='flex justify-center items-center max-[380px]:flex-col'>
          <SearchBar />
          <ProjectBar />
        </header>
        <Outlet />
      </div>
    </div>
  )
}

export default MainPage