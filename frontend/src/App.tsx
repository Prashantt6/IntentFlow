import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/dashboard' element = {<ProtectedRoute> <Dashboard /> </ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
