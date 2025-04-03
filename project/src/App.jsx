import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Dashboard from './pages/Dashboard'
import Compare from './pages/Compare'
import Execute from './pages/Execute'
import Profile from './pages/Profile'
import Login from './pages/Login'

function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/compare" element={user ? <Compare /> : <Navigate to="/login" />} />
          <Route path="/execute" element={user ? <Execute /> : <Navigate to="/login" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App