import { Button, Modal } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const LeftColumn = () => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const generateLink = (isActive: boolean) => {
    return isActive ? "text-blue-800 font-bold" : ""
  }

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    localStorage.removeItem('token')
    navigate('/')
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='h-full flex flex-col fixed'>
      <Header style={{ background: '#fff' }} className='text-center text-slate-800 textsm italic font-bold'>
        Task Manager
      </Header>
      <div className='h-full flex flex-col justify-between text-slate-500'>
        <div className=''>
          <nav>
            <h2 className='ml-1'>Menu</h2>
            <ul className='flex flex-col m-2 text-slate-900'>
              <li><NavLink to='/main/dashboard' className={(props) => generateLink(props.isActive)}>Dashboard</NavLink></li>
              <li><NavLink to='/main/projects' className={(props) => generateLink(props.isActive)}>Projects</NavLink></li>
              <li><NavLink to='/main/tasks' className={(props) => generateLink(props.isActive)}>Tasks</NavLink></li>
              <li><NavLink to='/main/tracking' className={(props) => generateLink(props.isActive)}>Tracking</NavLink></li>
              <li><NavLink to='/main/calendar' className={(props) => generateLink(props.isActive)}>Calendar</NavLink></li>
              <li><NavLink to='/main/notifications' className={(props) => generateLink(props.isActive)}>Notifications</NavLink></li>
            </ul>
          </nav>
          <h2 className='ml-1'>Favorite Project</h2>
          <ul className='flex flex-col m-2 text-slate-900'>
            <li><NavLink to='/main/project/:id' >Project 1</NavLink></li>
            <li><NavLink to='/main/project/:id'>Project 2</NavLink></li>
          </ul>
        </div>
        <h2 className='text-slate-800 ml-1'>
          Profile
          <Button onClick={showModal}>Logout</Button>
        </h2>
        <Modal title="Logout" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okButtonProps={{ danger: true }}>
          <p>Are you sure you want to logout?</p>
        </Modal>
      </div>
    </div>
  )
}

export default LeftColumn