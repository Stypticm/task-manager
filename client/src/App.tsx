import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UsersPage from './components/UsersPage'
import LoginPage from './components/Reg_Auth/LoginPage'

const App = () => {

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
