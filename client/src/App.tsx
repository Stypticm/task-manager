import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import UsersPage from './components/UsersPage'

import MainPage from './components/Main/MainPage'
import Dashboard from './components/Main/Dashboard'

import YourTeam from './components/YourTeam/YourTeam'
import CalendarComponent from './components/Calendar/CalendarComponent'
import Notifications from './components/Notifications/Notifications'
import LoginPage from './components/Reg_Auth/LoginPage'
import Tasks from './components/Tasks/Tasks'

import { DataStorageProvider } from './components/context/DataStorageContext'

import Profile from './components/Profile/Profile'
import ProjectDetails from './components/Projects/ProjectDetails'
import ProjectsComponent from './components/Projects/Projects'

const App = () => {

  return (
    <>
      <DataStorageProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/main" element={<MainPage />} >
              <Route path='dashboard' element={<Dashboard />} />
              <Route path="projects" element={<ProjectsComponent />}>
                <Route path=":id" element={<ProjectDetails />} />
              </Route>
              <Route path="tasks" element={<Tasks />} />
              <Route path="teams" element={<YourTeam />} />
              <Route path="calendar" element={<CalendarComponent />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="profile" element={<Profile />} />
              <Route path="*" element={<p className='text-red-500'>There's nothing here: 404!</p>} />
            </Route>
          </Routes>
        </Router>
      </DataStorageProvider>
    </>
  )
}

export default App
