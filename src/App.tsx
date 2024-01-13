import './App.css'
import Calendar from './components/Calendar'

function App() {
  const apiCall = [[0, 1, 1, 0], [1, 1, 0, 1]]

  return (
    <>
      <Calendar parseSchedule={apiCall}/>
    </>
  )
}

export default App
