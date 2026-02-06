import './App.css'
import { Route, Routes } from 'react-router'
import Login from './pages/login.tsx'
import Register from './pages/register.tsx';
import Dashboard from './pages/dashboard.tsx';


function Router() {
 

  return (
    <Routes>
     <Route path ="/login" element={<Login/>}/>
     <Route path ="/register" element={<Register/>}/>
     <Route path ="/dashboard" element={<Dashboard/>}/>
     </Routes>
  );
}

export default Router
