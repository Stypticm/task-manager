import { Header } from 'antd/es/layout/layout'
import { NavLink } from 'react-router-dom'

const LeftColumn = () => {
  const generateLink = (isActive: boolean) => {
    return isActive ? "text-blue-800 font-bold" : ""
  }

  return (
    <div className='h-full flex flex-col fix'>
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
        <h2 className='ml-1'>
          Profile
        </h2>
      </div>
    </div>
  )
}

export default LeftColumn