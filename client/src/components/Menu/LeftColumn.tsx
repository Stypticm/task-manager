import { Button, Modal } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { Home, Bell, Folder, CheckCircle2, FileSearch2, CalendarDays, LogOut, ExternalLink } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { AES, enc } from 'crypto-js'

const LeftColumn = () => {
  const navigate = useNavigate()
  const encryptedData = Cookies.get('userData')
  const secretKeyCookie = import.meta.env.VITE_SECRET_KEY_COOKIE

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentUserData, setCurrentUserData] = useState<{ username: string, email: string }>({ username: '', email: '' })
  const [mobileSize, setMobileSize] = useState(window.innerWidth > 640);

  const generateLink = (isActive: boolean) => {
    return isActive ? "text-teal-200 font-bold" : ""
  }
  const commonLinkClasses = !!mobileSize ? "flex items-center gap-2 m-2" : "flex justify-center items-center gap-2 m-1"

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

  useEffect(() => {
    if (encryptedData && secretKeyCookie) {
      const decryptedBytes = AES.decrypt(encryptedData, secretKeyCookie);
      const userData = JSON.parse(decryptedBytes.toString(enc.Utf8))
      setCurrentUserData(userData)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setMobileSize(window.innerWidth > 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='h-screen bg-slate-500 flex flex-col'>
      <div className='text-center bg-slate-500 italic font-bold flex justify-center items-center mt-5'>
        <span className='hidden sm:inline'>
          Task Manager
        </span>
        <span className='inline sm:hidden'>
          TM
        </span>
      </div>
      <div className='flex flex-col justify-between text-slate-500 h-full w-full'>
        <div className='flex flex-col ml-2'>
          <nav>
            <h2 className='text-center mt-20 text-slate-900'>Menu</h2>
            <ul className='flex flex-col m-2 text-teal-500'>
              <li><NavLink to='/main/dashboard' className={(props) => `${generateLink(props.isActive)} ${commonLinkClasses}`}><Home size={20} />
                {mobileSize && <span>Dashboard</span>}
              </NavLink></li>
              <li><NavLink to='/main/projects' className={(props) => `${generateLink(props.isActive)} ${commonLinkClasses}`}><Folder size={20} />
                {mobileSize && <span>Projects</span>}
              </NavLink></li>
              <li><NavLink to='/main/tasks' className={(props) => `${generateLink(props.isActive)} ${commonLinkClasses}`}><CheckCircle2 size={20} />
                {mobileSize && <span>Tasks</span>}
              </NavLink></li>
              <li><NavLink to='/main/teams' className={(props) => `${generateLink(props.isActive)} ${commonLinkClasses}`}><FileSearch2 size={20} />
                {mobileSize && <span>Teams</span>}
              </NavLink></li>
              <li><NavLink to='/main/calendar' className={(props) => `${generateLink(props.isActive)} ${commonLinkClasses}`}><CalendarDays size={20} />
                {mobileSize && <span>Calendar</span>}
              </NavLink></li>
              <li><NavLink to='/main/notifications' className={(props) => `${generateLink(props.isActive)} ${commonLinkClasses}`}><Bell size={20} />
                {mobileSize && <span>Notifications</span>}
              </NavLink></li>
            </ul>
          </nav>
          <h2 className='ml-1 text-slate-900 text-center mt-5'>Favorite Project</h2>
          <ul className='flex flex-col m-2 text-slate-900'>
            <li><NavLink to='/main/projects/:id' className={(props) => `${generateLink(props.isActive)} ${commonLinkClasses}`}><ExternalLink size={20} />Project 1</NavLink></li>
            <li><NavLink to='/main/projects/:id' className={(props) => `${generateLink(props.isActive)} ${commonLinkClasses}`}><ExternalLink size={20} />Project 2</NavLink></li>
          </ul>
        </div>
        <div className='text-slate-800 m-2 flex justify-around items-center rounded-md shadow-xl'>
          <NavLink to='/main/profile' className={(props) => `${generateLink(props.isActive)} ${commonLinkClasses}`}>
            <div className='flex justify-between items-center gap-2'>
              <img src="https://i.pravatar.cc/30" alt="avatar" className='rounded-full' />
              <div>
                {mobileSize && <p className='font-bold'>{currentUserData.username}</p>}
                {mobileSize && <p>Profession</p>}
              </div>
            </div>
          </NavLink>
          <Button onClick={showModal} type="text"><LogOut size={20} /></Button>
        </div>
        <Modal title="Logout" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okButtonProps={{ danger: true }}>
          <p>Are you sure you want to logout?</p>
        </Modal>
      </div>
    </div>
  )
}

export default LeftColumn