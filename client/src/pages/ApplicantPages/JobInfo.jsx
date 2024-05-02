import { useState , useEffect, useContext } from 'react'
import Navbar from '../../components/Navbar'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { DataContext } from '../../contexts/DataContext';
import LocationImage from '../../assets/Location.png'
import RupeeImage from '../../assets/Rupee.png'
import Qualification from '../../assets/Qualification.png';
import JobApplyModal from '../../components/JobApplyModal';
import Toast from '../../components/Toast';
import ApplicantJobCard from '../../components/ApplicantJobCard';
import { useToast } from '@chakra-ui/react'

const JobInfo = () => {
    const [ jobInfo , setJobInfo ] = useState();
    const [ isModal , setIsModal ] = useState(false);
    const [ selectedFile , setSelectedFile ] = useState(null);
    const [ sop , setSop ] = useState(String);
    const [recruiterInfo , setRecruiterInfo ] = useState();
    const [ status , setStatus ] = useState('');
    const { userInfo , isAuthenticated } = useContext(DataContext);
    const [recommended_jobs,setRecommendedJobs] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const toast = useToast();

    const access_token = JSON.parse(localStorage.getItem('access_token'));
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${access_token}`
        }
    }

    useEffect(() =>{
        const _id = params.id;
        const getJobInfo= async() =>{
            const response = await axios.get(`http://localhost:8000/applicant/getjobInfo/${_id}`);
            console.log(response.data);
            setJobInfo(response.data.jobInfo);
            setRecruiterInfo(response.data.jobInfo.recruiterId.recruiterInfo);
            if (response.data.recommended_jobs) setRecommendedJobs(response.data.recommended_jobs.slice(0, 5));
            console.log(response.data);
        }
        getJobInfo();
    },[params.id])


    const submitHandler = async() => {
        if(!isAuthenticated){
            navigate('/auth/login')
            return;
        }
        const jobId = jobInfo ? jobInfo._id : null;
        const applicantId = userInfo ? userInfo._id : null;
        const resume = new File([selectedFile], 'Resume.pdf'); 
        try{
            const jobData = new FormData();
            jobData.append('sop' , sop);
            jobData.append('resume' , resume);
            jobData.append('applicantId', applicantId);
            jobData.append('jobId', jobId);
            const response = await axios.post('http://localhost:8000/applicant/job/apply',jobData,config)
            setIsModal(false);
            toast({
                title : 'Successfully Applied',
                isClosable:true,
                status : 'success',
                position:'bottom',
                duration : 2000
            })
            setSop('');
            setSelectedFile(null);
            console.log(response.data);
        }
        catch(error){
            toast({
                title : `${error.response.data.message}`,
                isClosable:true,
                status : 'error',
                position:'bottom',
                duration : 4000
            })
            setIsModal(false);
        }
    }

    const isValid = sop && selectedFile;
  return (
    <div className = ''>
        <Navbar />
    <div className = "flex p-2 justify-center w-screen">
      <div className = "relative  h-screen flex flex-col w-min-5xl">
      { isModal && <JobApplyModal onClose = {setIsModal} isValid = {isValid} selectedFile = {selectedFile} setSelectedFile = {setSelectedFile} setSop = {setSop} onSave = {submitHandler}/>}
        {
            jobInfo  && 
            <>
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
                        <div className = 'pt-4'>
                            <button onClick = {() => setIsModal(true)} className ="inline-flex items-center rounded-md shadow shadow-md bg-teal-500 p-2">
                                <span className = "bg-transparent text-white">Apply Now</span>
                                <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className = 'flex flex-wrap  flex-col max-w-3xl mb-2 p-6 bg-white border border-gray-200 rounded-lg shadow-lg'>
                    <div className = ' w-full'>
                        <div className = 'py-2 text-xl font-semibold flex flex-wrap'>Job Description</div>
                        {  jobInfo.jobDescription.split('.').map((des, index) =>
                                des !== '' && <div className="flex items-center text-sm font-medium py-0.5 me-3">{index+1 + ". " + des}</div>
                            )}
                        </div>
                        <div className = 'py-2 text-xl font-semibold flex'>Key Skills </div>
                            <div className = 'flex flex-wrap gap-2'>
                            {  jobInfo.skillsets.split(',').map((skill) =>
                                <span class="bg-teal-100 text-teal-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded ">{skill}</span>
                            )}
                            </div>
                            
                    </div>
                <div>
                <div className = "max-w-3xl p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <div className = 'px-2'>
                        <div className = 'py-2 text-xl font-semibold'>About Company</div>
                        <div className = 'text-sm'>{recruiterInfo.companyName} is a global professional services company with leading capabilities in digital, cloud and security. Combining unmatched experience and specialized skills across more than 40 industries, we offer Strategy and Consulting, Interactive, Technology and Operations services—all powered by the world’s largest network of Advanced Technology and Intelligent Operations centers. Our 514,000 people deliver on the promise of technology and human ingenuity every day, serving clients in more than 120 countries. We embrace the power of change to create value and shared success for our clients, people, shareholders, partners and communities.</div>
                        </div>
                        <div className = 'px-2 pt-2 text-lg font-semibold'>Address</div>
                        <div className = 'px-2 text-sm'>
                            {recruiterInfo.address.area},{recruiterInfo.address.city},{recruiterInfo.address.state}-{recruiterInfo.address.zipcode}
                        </div>
                    </div>
                </div>
            </>
        }
        </div>
        {recommended_jobs.length > 0 && <div className = "flex flex-col gap-4 w-min-3xl px-6 ml-2">
            <div className="mb-1 text-2xl font-semibold tracking-wide text-gray-900 px-1">Recommended For You</div>
        {  recommended_jobs.map((recommendjob) =>(
            <ApplicantJobCard key = {recommendjob._id} _id = {recommendjob._id} title = {recommendjob.title} salary = {recommendjob.salary} location = {recommendjob.location} companyName = {recommendjob.recruiterId.recruiterInfo.companyName} qualification = {recommendjob.qualification} />
        ))}
        </div>}
    </div>
    
    </div>

  )
}

export default JobInfo