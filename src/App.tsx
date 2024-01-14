import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import NavBar from "./components/NavBar";
import ProfileScreen from "./screens/ProfileScreen";
import CreateGroupScreen from "./screens/CreateGroupScreen";
import JoinGroupScreen from "./screens/JoinGroupScreen";
import CalendarScreen from "./screens/CalendarScreen";
import GroupCalendarScreen from "./screens/GroupCalendarScreen";

function App() {
  return (
    <div className="">
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/creategroup" element={<CreateGroupScreen />} />
        <Route path="/dashboard" element={<ProfileScreen />} />
        <Route path="/joingroup" element={<JoinGroupScreen />} />
        <Route path="/calendar" element={<CalendarScreen />} />
        <Route path="/groupcalendar/:key" element={<GroupCalendarScreen />} />
      </Routes>
    </div>
  );
}

export default App;
