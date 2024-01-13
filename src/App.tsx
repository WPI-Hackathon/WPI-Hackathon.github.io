import './App.css'
import CalendarScreen from './screens/CalendarScreen'
import CreateEventScreen from './screens/CreateEventScreen'
import GroupCalendarScreen from './screens/GroupCalendarScreen'
import { Route, Routes } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import NavBar from './components/NavBar'
import ProfileScreen from './screens/ProfileScreen'
import CreateGroupScreen from './screens/CreateGroupScreen'

function App() {

  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/creategroup" element={<CreateGroupScreen />} />
        <Route path="/dashboard" element={<ProfileScreen />} />
      </Routes>
    </>
  )
}

export default App
