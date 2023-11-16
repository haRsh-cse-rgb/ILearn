import React, { useEffect } from 'react';
import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import Home from './components/Home/Home';
import Header from './components/Layout/Header';
import Courses from './components/Courses/Courses';
import Footer from './components/Layout/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgetPassword from './components/Auth/ForgetPassword';
import ResetPassword from './components/Auth/ResetPassword';
import Contact from './components/Contact';
import Request from './components/Request';
import Subscribe from './components/Payment/Subscribe';
import NotFound from './components/Layout/NotFound';
import PaymentFail from './components/Payment/PaymentFail';
import PaymentSuccess from './components/Payment/PaymentSuccess';
import CoursePage from './components/Course/CoursePage';
import Profile from './components/Profile/Profile';
import ChangePassword from './components/Profile/ChangePassword';
import UpdateProfile from './components/Profile/UpdateProfile';
import Dashboard from './components/Admin/Dashboard';
import CreateCourse from './components/Admin/CreateCourse';
import Users from './components/Admin/Users';
import AdminCourses from './components/Admin/AdminCourses';
import { useDispatch, useSelector } from 'react-redux';
import toast ,{Toaster} from "react-hot-toast"
import { loadUser } from './redux/actions/user';
import {ProtectedRoute} from "protected-route-react"
import Loader from './components/Layout/Loader';



function App() {
  // window.addEventListener('contextmenu' , e=> {
  //   e.preventDefault();
  // })


  const {isAuthenticated , user , message , error , loading}=useSelector(state =>state.user);

  const dispatch=useDispatch();

  useEffect(() =>{

    if(error){
      toast.error(error);
      dispatch({type:'clearError'});
    }

    if(message){
      toast.success(message);
      dispatch({type : 'clearMessage'})
    }

  } , [dispatch , error , message]);

  useEffect(()=>{
    dispatch(loadUser())
  } , [dispatch]);

  return (
    <Router>
    {
    loading ? (<Loader/>) : (



      <>

      <Header isAuthenticated={isAuthenticated}  user={user}/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/courses' element={<Courses/>}/>
      <Route path='/login' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile">
        <Login/>
      </ProtectedRoute>}/>
      <Route path='/register' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile"><Register/></ProtectedRoute>}/>
      <Route path='/forgetPassword' element={<ProtectedRoute isAuthenticated={!isAuthenticated}  redirect="/profile"><ForgetPassword/></ProtectedRoute>} />
      <Route path='/resetPassword/:token' element={ <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile"><ResetPassword/></ProtectedRoute>}/> 
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/request' element={<Request/>}/>
      <Route path='/subscribe' element={<ProtectedRoute isAuthenticated={isAuthenticated} ><Subscribe user={user}/></ProtectedRoute>}/>
      <Route path='/paymentfail' element={<PaymentFail/>}/>
      <Route path='/paymentsuccess' element={<PaymentSuccess/>}/>
      <Route path='/course/:id' element={<ProtectedRoute isAuthenticated={isAuthenticated}  redirect="/login" ><CoursePage user={user}/></ProtectedRoute>} />
      <Route path='*' element={<NotFound/>}/>
      <Route path='/profile' element={<ProtectedRoute isAuthenticated={isAuthenticated} redirect="/login">
        <Profile user={user}/>
      </ProtectedRoute>}/>
      <Route path='/changepassword' element={<ChangePassword/>}/>
      <Route path='/updateprofile' element={<UpdateProfile user={user}/>}/>
      <Route path='/updateprofile' element={<UpdateProfile/>}/>
      <Route path='/admin/dashboard' element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role==='admin'}><Dashboard/></ProtectedRoute>}/>
      <Route path='/admin/createcourse' element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role==='admin'}><CreateCourse/></ProtectedRoute>}/>
      <Route path='/admin/users' element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role==='admin'}><Users/></ProtectedRoute>}/>
      <Route path='/admin/courses' element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role==='admin'}><AdminCourses/></ProtectedRoute>}/>

    </Routes>

    <Toaster></Toaster>
      </>
    )


    }
    

    
    </Router>
  );
}

export default App;
