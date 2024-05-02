import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ApplicationCard from '../components/ApplicationCard'

const JobApplicants = () => {

    const [ applications , setApplications] = useState([]);
    const [ resultInfo , setResultInfo] = useState([]);
    const [ isdropDown , setIsDropDown] = useState(false);
    const params = useParams();
    const access_token = JSON.parse(localStorage.getItem('access_token'));
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${access_token}`
        }
    }

    const downloadResume = async(resumefile) =>{
        try{
            const response = await axios.get(`http://localhost:8000/getapplicants/resume/${resumefile}`);
            const blob = new Blob([response.data], { type: 'application/pdf' });

            const url = window.URL.createObjectURL(blob);
      
            // Create a temporary link element
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Resume.pdf');
            
            // Simulate a click event to trigger the download
            document.body.appendChild(link);
            link.click();
            
            // Cleanup
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
            
        }
        catch(err){
            console.log(err);
        }
    }

    const changeHandler = async (event,applicationId) => {
        console.log(event.target.value);
        console.log(applicationId)
        try{
            const response = await axios.put('http://localhost:8000/recruiter/update/applicationstatus',{ applicationId , status : event.target.value },config);
            console.log(response.data);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() =>{
        const getApplications = async() =>{
            const jobId = params.id;
            const response = await axios.get(`http://localhost:8000/getapplicants/${jobId}`);
            setApplications(response.data.applications);
            setResultInfo(response.data.resultInfo);
            console.log(response.data);
        }
        getApplications();
    },[])
  return (
    <>
    <Navbar/>
    <div className = 'text-4xl pt-4 text-center tracking-wider'>Applied Candidates List</div>
    <div className = "flex px-2 py-4 justify-center items-center w-screen">
      <div className = "flex flex-col gap-4 w-min-5xl items-center">
        <div class="overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead class="text-xs text-teal-800 uppercase bg-teal-100  ">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            First Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Last Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Resume
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Test Marks
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                      applications.length > 0 ? applications.map((application) =>(
                    <tr class="bg-white border-b border-teal-100 ">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            {application.applicantId.applicantInfo.firstName}
                        </th>
                        <td class="px-6 py-4">
                            {application.applicantId.applicantInfo.lastName}
                        </td>
                        <td class="px-6 py-4">
                            {application.applicantId.email}
                        </td>
                        <td class="relative px-6 py-4">
                            <select onChange={(event) => changeHandler(event, application._id)} class="bg-teal-100  text-teal-500 text-sm rounded-lg p-2.5">
                            {application.status !== 'shortlisted' && application.status !== 'accepted' &&
                                <option value="applied" selected={application.status === 'applied'}>Applied</option>
                            }
                            {application.status !== 'accepted' &&
                                <option value="shortlisted" selected={application.status === 'shortlisted'}>Shortlist</option>
                            }
                            {application.status === 'shortlisted' && application.status !== 'accepted' &&
                                <option value="accepted" selected={application.status === 'accepted'}>Accept</option>
                            }
                            <option value="rejected" selected={application.status === 'rejected'}>Reject</option>
                            <option value="shortlisted" selected={application.status === 'shortlisted'}>Shortlist</option>
                            </select>
                        </td>
                        <td class="px-6 py-4">
                            <button onClick = {() => downloadResume(application.resume)} class="font-medium bg-teal-100 p-2 rounded-lg text-teal-500">Download</button>
                        </td>
                        <td class="px-6 py-4">
                            { resultInfo && resultInfo.find( result => result.applicantId === application.applicantId._id ) ?
                            <div className = 'px-2 text-teal-700 text-md '>{resultInfo.find(result => result.applicantId === application.applicantId._id).marks_obtained} / <span className = 'text-md text-teal-800'>{resultInfo.find(result => result.applicantId === application.applicantId._id).total_marks}</span> </div>
                            : <div>-:-</div>} 
                        </td>
                    </tr>))
                    :
                    <div className = 'p-2 text-center'>No Candidates have applied yet.</div>
                    }
                </tbody>
            </table>
        </div>
      </div>
    </div>
    </>
    // <>
    // <Navbar />
    // <div className = 'flex max-w-5xl justify-center'>
    // <main className = 'flex flex-cols justify-center items-center w-full'>
    //     {
    //         applicants.length > 0 ?
    //         applicants.map((applicant) =>(
    //             <ApplicationCard key = {applicant._id} sop = {applicant.sop} onDownload = {() => downloadResume(applicant.resume)}/>
    //         )):
    //         <>
    //         <div>No Applicants have applied till now .</div>
    //         </>
    //     }
    //     </main>
    // </div>
    // </>
  )
}

export default JobApplicants