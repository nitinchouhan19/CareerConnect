import React, { useContext, useState , useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DataContext } from '../contexts/DataContext'


const Navbar = () => {
    const navigate = useNavigate();
    const { isAuthenticated, userRole ,setUserRole,setUserInfo, userInfo, setIsAuthenticated} = useContext(DataContext);
    const [ dropDown , setUserDropDown ] = useState(false);
    useEffect(() => {
    },[])
    const logoutHandler = () => {
        console.log("logged out");
        localStorage.removeItem('userInfo');
        localStorage.removeItem('access_token');
        setIsAuthenticated(false); 
        navigate('/auth/login')
    }
    
  return (
    <>
    {
        userRole === 'applicant' ?
        <nav className = "w-screen flex justify-between items-center tracking-wide px-4 py-4">
            <div className = "px-4 font-semibold tracking-wider text-3xl">
                Career Connect
            </div>
            <ul className = "flex items-center justify-between">
                <li className = "px-6"><Link to = '/' className= "outline-none">Home</Link></li>
                <li className = "px-6"><Link to = '/applicant/explore' className= "outline-none">Explore</Link></li>
                <li className = "px-4">{isAuthenticated ? 
                    <>
                        Welcome, <button className = 'relative text-lg font-semibold' onClick={() => setUserDropDown((prev) => !prev)}>{userInfo.firstName} </button>
                        <div class={`z-10 absolute right-0 bg-white ${dropDown ? 'visible' : 'hidden'} divide-y divide-gray-100 rounded-lg shadow w-44`}>
                            <div class="px-4 py-3 font-semibold text-sm text-gray-900 ">
                            <div>{userInfo.firstName + " " +userInfo.lastName}</div>
                            </div>
                            <ul class="py-2 text-sm text-gray-700 " aria-labelledby="dropdownUserAvatarButton">
                            <li>
                                <Link to = '/applicant/dashboard' class="block px-4 py-2 hover:bg-gray-100 ">Dashboard</Link>
                            </li>
                            <li>
                                <Link to = '/applicant/applications' class="block px-4 py-2 hover:bg-gray-100 ">Applications status</Link>
                            </li>
                            </ul>
                            <div class="py-2">
                                <button onClick = {logoutHandler} class="block px-4 py-2 text-sm text-gray-700 tracking-wide">Sign out</button>
                            </div>
                        </div>
                    </>
                :
                    <Link to = '/auth/login' className= "outline-none bg-teal-500 text-white p-3 rounded-md">Login</Link>
                }</li>   
            </ul>
        </nav> :
        <nav className = "w-screen flex justify-between items-center tracking-wide px-4 py-4">
            <div className = "px-4 font-semibold tracking-wider text-teal-400 text-3xl">
                Career Connect
            </div>
            <ul className = "flex items-center justify-between">
                <li className = "px-6"><Link to = '/' className= "outline-none">Home</Link></li>
                <li className = "px-6"><Link to = '/recruiter/livejobs' className= "outline-none">Live Jobs</Link></li>
                <li className = "px-6"><Link to = '/recruiter/createjob' className= "outline-none">Create Job</Link></li>
                <li className = "px-4">
                        Welcome, <button className = 'relative text-lg font-semibold' onClick={() => setUserDropDown((prev) => !prev)}>{userInfo.companyName} </button>
                        <div class={`z-10 absolute bg-white ${dropDown ? 'visible' : 'hidden'} divide-y divide-gray-100 rounded-lg shadow w-44`}>
                            <div class="px-4 py-3 font-semibold text-sm text-gray-900 ">
                            <div>{userInfo.companyName}</div>
                            </div>
                            <ul class="py-2 text-sm text-gray-700 " aria-labelledby="dropdownUserAvatarButton">
                            <li>
                                <Link to = '/recruiter/dashboard' class="block px-4 py-2 hover:bg-gray-100 ">Dashboard</Link>
                            </li>
                            <li>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100 ">Settings</a>
                            </li>
                            </ul>
                            <div class="py-2">
                                <button onClick = {logoutHandler} class="block px-4 py-2 text-sm text-gray-700 tracking-wide">Sign out</button>
                            </div>
                        </div>
                </li>   
            </ul>
        </nav>
    }
    </>
  )
}

export default Navbar