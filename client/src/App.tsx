import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UsersPage from './components/UsersPage'
import LoginPage from './components/Reg_Auth/LoginPage'
import MainPage from './components/Main/MainPage'
import Projects from './components/Projects/Projects'
import Tasks from './components/Tasks/Tasks'
import Dashboard from './components/Main/Dashboard'
import Tracking from './components/Tracking/Tracking'
import CalendarComponent from './components/Calendar/CalendarComponent'
import Notifications from './components/Notifications/Notifications'


const App = () => {

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/main" element={<MainPage />}>
            <Route path='dashboard' element={<Dashboard />} /> */
            <Route path="projects" element={<Projects />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="tracking" element={<Tracking />} />
            <Route path="calendar" element={<CalendarComponent />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="*" element={<p className='text-red-500'>There's nothing here: 404!</p>} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
