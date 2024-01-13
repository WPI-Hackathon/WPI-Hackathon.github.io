import './App.css'
import { Route, Routes, Link } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import NavBar from './components/NavBar'

function App() {

  return (
    <>
    <NavBar></NavBar>
      {/* <Link to="/home">pee</Link> */}
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/home" element={<HomeScreen />} />
      </Routes>
    </>
  )
}

export default App
