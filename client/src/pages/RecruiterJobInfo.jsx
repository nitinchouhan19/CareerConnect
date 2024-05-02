import { useState , useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
import LocationImage from '../assets/Location.png'
import RupeeImage from '../assets/Rupee.png'
import Qualification from '../assets/Qualification.png';

const RecruiterJobInfo = () => {
    const [ jobInfo , setJobInfo ] = useState();
    const [ testInfo , setTestInfo ] = useState(null);
    const [ questions , setQuestions ] = useState([]);
    const params = useParams();
    useEffect(() =>{
        const _id = params.id || null;
        const getJobInfo= async() =>{
            const response = await axios.get(`http://localhost:8000/recruiter/getjobInfo/${_id}`);
            console.log(response.data);
            setJobInfo(response.data.jobInfo);
            setTestInfo(response.data.testInfo);
            setQuestions(response.data.questions);
        }
        getJobInfo();
    },[])
  return (
    <>
        <Navbar />
        <div className = 'w-screen flex justify-center'>
            <div className = "flex p-2 justify-center ">
                <div className = "flex flex-col w-min-5xl">
                    {
                        jobInfo && 
                        <div>
                            <div>
                                <div className="max-w-3xl mb-2 p-6 bg-white border border-gray-200 rounded-lg shadow-lg ">
                                    <div>
                                        <h5 className="mb-1 text-2xl font-semibold tracking-wide text-gray-900 ">{jobInfo.title}</h5>
                                    </div>
                                    <p className="mb-2 font-normal text-gray-500 "></p>
                                    <div className = 'flex pb-2'>
                                        <div className = 'pr-2 flex items-center'>
                                            <img src = {RupeeImage} className = 'h-4 w-auto'/>
                                            <span>{jobInfo.salary}</span>
                                        </div>
                                        <div className = 'pr-2 flex items-center'>
                                            <img src = {LocationImage} className = 'h-4 w-auto'/>
                                            <span>{jobInfo.location}</span>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-800 flex items-center">
                                            <img src = {Qualification} className = 'h-4 w-auto'/>
                                            <span>{jobInfo.qualification}</span>
                                    </div>
                                </div>
                            </div>
                            <div className = 'flex flex-wrap  flex-col max-w-3xl mb-2 p-6 bg-white border border-gray-200 rounded-lg shadow-lg'>
                                <div className = ' w-full'>
                                    <div className = 'py-2 text-xl font-semibold flex flex-wrap'>Job Description</div>
                                    {  jobInfo.jobDescription.split('.').map((des, index) =>
                                            des!=='' && <div className="flex items-center text-sm font-medium py-0.5 me-3">{index+1 + ". " + des}</div>
                                        )}
                                </div>
                                <div className = 'py-2 text-xl font-semibold flex'>Key Skills </div>
                                <div className = 'flex flex-wrap gap-2'>
                                    {  jobInfo.skillsets.split(',').map((skill) =>
                                        <span class="bg-teal-100 text-teal-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded ">{skill}</span>
                                    )}
                                </div>   
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className = "flex justify-center p-2 w-1/2">
                <div className = "flex flex-col w-full">
                    <div className="w-max-3xl mb-2 p-6 bg-white border border-gray-200 rounded-lg shadow-lg ">
                        <div className = "text-2xl font-semibold p-1">Test Details:</div>
                        { testInfo === null ?
                        <>
                            <div className = 'p-2'>Seem's you haven't created a test for this job!</div>
                            {jobInfo && <div className = 'p-2'><Link to = {`/recruiter/createtest/${jobInfo._id}`} ><button className = "bg-teal-500 p-2 text-white rounded-md" >Create Test</button></Link></div>}
                        </>
                        :
                        <div className = 'flex flex-col w-max-2xl'>
                            <div className = 'p-2 font-semibold text-lg text-teal-600'>Test for Senior dev</div>
                            <div className = 'px-2'>Created a comprehensive test to assess candidates' qualifications for the Senior Software Engineer role. Cover areas such as full-stack development, JavaScript expertise (React, Node.js), software architecture, RESTful APIs, collaboration skills, Git proficiency, troubleshooting abilities, and relevant experience. Emphasize the importance of communication, team collaboration, and a Bachelor's degree in Computer Science.</div>
                            <div className = 'px-2 font-semibold text-2xl text-teal-600'>Questions:</div>
                            {
                                questions.length > 0 &&
                                questions.map((question) =>(
                                    <div className = 'flex flex-col p-4 shadow-md rounded-lg'>
                                        <div className = 'text-lg font-semibold'>{question.question}</div>
                                        <div className = 'py-2'>
                                            <div className = 'pb-1'>Options: </div>
                                            <div className = 'flex flex-col gap-2'>
                                                { question.options.map((option) => (
                                                    <div className = "flex items-center">
                                                        <div className = "bg-teal-400 w-2 h-2 rounded-full"></div>
                                                        <span className = 'ml-1'>{ option}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className = "pb-2">
                                            <span className = ''>Correct Answer: </span>
                                            <span class="bg-teal-100 text-teal-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded ">{question.answer}</span>
                                        </div>
                                        <div className = "pb-2">
                                            <span className = ''>Points: </span>
                                            <span class="bg-teal-100 text-teal-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded ">{question.points}</span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default RecruiterJobInfo