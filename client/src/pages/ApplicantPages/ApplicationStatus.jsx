import React, { useContext , useEffect ,useState } from 'react'
import Navbar from '../../components/Navbar'
import { DataContext } from '../../contexts/DataContext'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ApplicationStatus = () => {
    const navigate = useNavigate();
    const { isAuthenticated , userInfo } = useContext(DataContext);
    const [ applications , setApplications ] = useState([]);
    const [ testInfo , setTestInfo ] = useState([]);
    const [ resultInfo , setResultInfo] = useState([])

    const getApplications = async() =>{
        const applicantId = userInfo._id;
        const response = await axios.get(`http://localhost:8000/applicant/getapplications/${applicantId}`);
        setApplications(response.data.applications);
        setTestInfo(response.data.testInfo);
        setResultInfo(response.data.resultInfo)
        console.log(response.data);
    };

    useEffect(() =>{
        if(!isAuthenticated) navigate('/');
        getApplications();
    },[]);
    

    const deleteApplication = async(_id) =>{
        try{
            const response = await axios.delete(`http://localhost:8000/applicant/getapplications/delete/${_id}`);
            getApplications();
        }
        catch(err){
            console.log(err);
        }
    }



  return (
    <>
    <Navbar/>
    <div className = 'text-4xl pt-4 text-center tracking-wider'>Applications</div>
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
                            Company
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Delete
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Test
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                      applications.length > 0 && applications.map((application) =>(
                    <tr class="bg-white border-b border-teal-100 ">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            {application.jobId.title}
                        </th>
                        <td class="px-6 py-4">
                            {application.jobId.recruiterId.recruiterInfo.companyName}
                        </td>
                        <td class="px-6 py-4">
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </td>
                        <td class="px-6 py-4">
                            <button onClick = {() => {deleteApplication(application._id)}} class="font-medium text-red-500 hover:underline">Delete</button>
                        </td>
                        <td className="px-6 py-4 text-center">
                            { resultInfo.find(result =>result.testId.jobId._id === application.jobId._id) ? (
                                // Display marks obtained if a result exists for the job application
                                <div className = 'px-2 text-teal-700 text-md '>{resultInfo.find(result => result.testId.jobId._id === application.jobId._id).marks_obtained} / <span className = 'text-md text-teal-800'>{resultInfo.find(result => result.testId.jobId._id === application.jobId._id).total_marks}</span> </div>
                            ) : (
                                // Display "Take Test" button if no result exists but the test info is available
                                testInfo.find(info => info.jobId === application.jobId._id) ? (
                                    <Link to={`/applicant/taketest/${testInfo.find(info => info.jobId === application.jobId._id)._id}`}>
                                        <button className="font-medium text-teal-500">Take Test</button>
                                    </Link>
                                ) : (
                                    // Display "-" if no result or test info is available
                                    <div className="text-teal-500 text-xl">-:-</div>
                                )
                            )}
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

export default ApplicationStatus