import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import './App.css'
import HomePage from './Pages/HomePage';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './Auth/PrivateRoute';

const App = () => {
 

 
  return (
    <div>
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<HomePage/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/profile' 
                  element={
                    <PrivateRoute>
                        <Profile/>
                    </PrivateRoute>
                  }
                  />
            </Routes>
            <Toaster/>
          </BrowserRouter>
    </div>
  );
};
export default App;







