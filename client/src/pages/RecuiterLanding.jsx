import React, { useEffect , useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { DataContext } from '../contexts/DataContext'

const RecuiterLanding = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(DataContext);
    useEffect(() =>{
        if(!isAuthenticated) navigate('/');
    })
  return (
    <>
        <Navbar />
        <section class="w-screen h-screen flex items-center bg-white ">
            <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
                <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl ">Elevate Your Hiring Experience</h1>
                <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 ">Unlock your recruitment potential: Seamlessly upload jobs and connect with top talent effortlessly.</p>
                <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                    <Link to = '/recruiter/createjob' class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-teal-500  ">
                        Get started
                        <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    </>
  )
}

export default RecuiterLanding