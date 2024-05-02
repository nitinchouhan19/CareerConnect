import React, { useState , useEffect , useContext } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { DataContext } from '../contexts/DataContext'
import RecruiterJobCard from '../components/RecruiterJobCard'
import { Link, useNavigate } from 'react-router-dom'

const PostedJobs = () => {

  const [ jobs , setJobs ] = useState([]);
  const navigate = useNavigate();

    const { userInfo , isAuthenticated } = useContext(DataContext);

    const getJobs = async() =>{
        const recruiterId = userInfo._id;
        const response = await axios.get(`http://localhost:8000/getJobs/${recruiterId}`);
        setJobs(response.data.jobs);
    }
    useEffect(() => {
        if(!isAuthenticated) navigate('/');
        getJobs();
    },[]);

    const access_token = JSON.parse(localStorage.getItem('access_token'));
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${access_token}`
        }
    }

    const deleteJob = async (_id) => {
        console.log(_id)
        try{
            const response = await axios.delete(`http://localhost:8000/recruiter/jobs/delete/${_id}`, config);
            getJobs();
        }
        catch(err){
            console.log(err);
        }
    }

  return (
    <>
    <Navbar/>
    <div className = 'text-4xl pt-4 text-center tracking-wider'>Jobs Posted</div>
    <div className = "flex px-2 py-4 justify-center items-center w-screen">
      <div className = "flex flex-col gap-4 w-min-5xl items-center">
        <div class="overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead class="text-xs text-teal-800 uppercase bg-teal-100  ">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Position
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Salary
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Location
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Details
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Delete
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                      jobs.length > 0 && jobs.map((job) =>(
                    <tr class="bg-white border-b border-teal-100 ">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            <Link to = {`/recruiter/job/${job._id}`}>{job.title}</Link>
                        </th>
                        <td class="px-6 py-4">
                            {job.salary}
                        </td>
                        <td class="px-6 py-4">
                            {job.location}
                        </td>
                        <td class="px-6 py-4">
                          <Link to =  {`/jobapplicants/${job._id}`} class="font-medium text-teal-500 hover:underline">See Applicants</Link>
                        </td>
                        <td class="px-6 py-4">
                            <button onClick = {() => deleteJob(job._id)} class="font-medium text-red-500 hover:underline">Delete</button>
                        </td>
                    </tr>))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
    </>
  )
}

export default PostedJobs