import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Menu from './components/Menu/Menu';
import NavBar from './components/NavBar/NavBar';
import { ProtectedRouter } from './components/ProtectedRouter/ProtectedRouter';
import Home from './pages/Home';
import Login from './pages/Login';
import ResourcesPage from './pages/Resource';


function App() {

  const [user, setUser] = useState(null)
  
  console.log(user)
  return (
    <>
      <div className='app'>
          
        <BrowserRouter>
            {user && <Menu />}
            
            <div className='page'>
              {user && <NavBar setUser= {setUser}/>}
              <Routes>
                <Route path="/Login" element={<Login setUser={setUser}/>} />
                <Route element={<ProtectedRouter user={user} />}>
                  <Route path="/Home" element={<Home />} />
                  <Route path="/Resource" element={<ResourcesPage/>}/>
                </Route>
              </Routes>
            </div>
        </BrowserRouter>
      </div>
    </>
    
  )
}

export default App
