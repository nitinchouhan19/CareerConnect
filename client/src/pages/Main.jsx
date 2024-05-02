import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import Navbar from '../components/Navbar';
import BussinessImage from '../assets/Bussiness.svg'
import JobImage from '../assets/Applicant.jpg'
import { DataContext } from '../contexts/DataContext';





const Main = () => {
  const navigate = useNavigate();
  const { isAuthenticated , userRole , userInfo } = useContext(DataContext)
  useEffect(() =>{
    if(isAuthenticated){
      if(userRole === 'recruiter') navigate('/recruiter/dashboard');
      else navigate('/applicant/dashboard');
    }
  })
  return (
    <>
      <div className = 'w-screen flex items-center'>
        <div className = 'w-1/2 p-2 flex flex-col justify-center items-center'>
          <img src = {BussinessImage} className = 'max-h-80 w-auto rounded-xl ' alt = 'BussinessImage' />
          <div className = 'font-bold p-2 text-lg text-gray-600'>Streamline your hiring process</div>
          <div className = 'font-semibold p-2 text-sm text-gray-800'>Seamlessly upload jobs and connect with top talent effortlessly</div>
          <div className = 'py-2'>
          <Link to = '/applicant/dashboard'><button className = 'text-white bg-gradient-to-r from-teal-500 to-teal-300 hover:bg-gradient-to-bl  font-medium rounded-lg text-sm px-5 py-2.5 text-center '>
              Continue<svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </button></Link>
          </div>
        </div>
        <div className = 'p-[0.5px] h-screen bg-teal-400'></div>
        <div className = 'w-1/2 p-2 flex flex-col justify-center items-center'>
          <img src = {JobImage} className = 'max-h-80 w-auto rounded-xl ' alt = 'BussinessImage' />
          <div className = 'font-bold p-2 text-lg text-gray-600'>Discover Your Dream Job</div>
          <div className = 'font-semibold p-2 text-sm text-gray-800'> Explore Opportunities That Match Your Passion and Expertise!</div>
          <div className = 'py-2'>
            <Link to = '/applicant/dashboard'><button className = 'text-white bg-gradient-to-r from-teal-500 to-teal-300 hover:bg-gradient-to-bl  font-medium rounded-lg text-sm px-5 py-2.5 text-center '>
              Continue<svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </button></Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Main