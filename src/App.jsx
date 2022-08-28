import './App.css'
import { useState, useEffect } from 'react'
import mainContext from './context/mainContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProfilePage from './pages/ProfilePage'
import LikesPage from './pages/LikesPage'
import FindPage from './pages/FindPage'
import LoginPage from './pages/LoginPage'
import MatchesPage from './pages/MatchesPage'
import NavBar from './components/NavBar'

function App() {
  const [login, setLogin] = useState()
  const [user, setUser] = useState()
  const [users, setUsers] = useState([])
  const hooks = {
    login,
    setLogin,
    user,
    setUser,
    users,
    setUsers,
    
  }
  

  return (
    <div className='App'>
      <mainContext.Provider value={hooks}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<LoginPage />}/>
            <Route path="/profile" element={<ProfilePage />}/>
            <Route path="/likes" element={<LikesPage />}/>
            <Route path="/find" element={<FindPage />}/>
            <Route path="/matches" element={<MatchesPage />}/>
          </Routes>
        </BrowserRouter>
      </mainContext.Provider>
    </div>
  );
}

export default App
