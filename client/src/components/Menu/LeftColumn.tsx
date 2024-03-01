import { Button, Modal } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { Home, Bell, Folder, CheckCircle2, FileSearch2, CalendarDays, LogOut, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const LeftColumn = () => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const generateLink = (isActive: boolean) => {
    return isActive ? "text-blue-600 font-bold italic" : ""
  }
  const commonLinkClasses = "flex gap-2 m-2"

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    localStorage.removeItem('token')
    Cookies.remove('userData')
    navigate('/')
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='h-full flex flex-col fixed'>
      <Header style={{ background: '#fff' }} className='text-center text-slate-700 textsm italic font-bold'>
        Task Manager
      </Header>
      <div className='h-full flex flex-col justify-between text-slate-500'>
        <div className='flex flex-col ml-2'>
          <nav>
            <h2 className='ml-1'>Menu</h2>
            <ul className='flex flex-col m-2 text-slate-900'>
              <li><NavLink to='/main/dashboard' className={(props) => `${generateLink(props.isActive)} ${commonLinkClasses}`}><Home size={20} />Dashboard</NavLink></li>
              <li><NavLink to='/main/projects' className={(props) => `${generateLink(props.isActive)} ${commonLinkClasses}`}><Folder size={20} />Projects</NavLink></li>
              <li><NavLink to='/main/tasks' className={(props) => `${generateLink(props.isActive)} ${commonLinkClasses}`}><CheckCircle2 size={20} />Tasks</NavLink></li>
              <li><NavLink to='/main/tracking' className={(props) => `${generateLink(props.isActive)} ${commonLinkClasses}`}><FileSearch2 size={20} />Tracking</NavLink></li>
              <li><NavLink to='/main/calendar' className={(props) => `${generateLink(props.isActive)} ${commonLinkClasses}`}><CalendarDays size={20} />Calendar</NavLink></li>
              <li><NavLink to='/main/notifications' className={(props) => `${generateLink(props.isActive)} ${commonLinkClasses}`}><Bell size={20} />Notifications</NavLink></li>
            </ul>
          </nav>
          <h2 className='ml-1'>Favorite Project</h2>
          <ul className='flex flex-col m-2 text-slate-900'>
            <li><NavLink to='/main/project/:id' className={(props) => `${generateLink(props.isActive)} ${commonLinkClasses}`}><ExternalLink size={20} />Project 1</NavLink></li>
            <li><NavLink to='/main/project/:id' className={(props) => `${generateLink(props.isActive)} ${commonLinkClasses}`}><ExternalLink size={20} />Project 2</NavLink></li>
          </ul>
        </div>
        <h2 className='text-slate-800 ml-2 flex justify-around items-center'>
        <NavLink to='/main/profile' className={(props) => `${generateLink(props.isActive)} ${commonLinkClasses}`}>Profile</NavLink>
          <Button onClick={showModal} type="text"><LogOut size={20} /></Button>
        </h2>
        <Modal title="Logout" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okButtonProps={{ danger: true }}>
          <p>Are you sure you want to logout?</p>
        </Modal>
      </div>
    </div>
  )
}

export default LeftColumn