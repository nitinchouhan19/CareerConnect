import { useState , useEffect} from 'react'
import Navbar from '../../components/Navbar'
import { DataContext } from '../../contexts/DataContext';
import ApplicantJobCard from '../../components/ApplicantJobCard';
import axios from 'axios'

const Explore = () => {

    const [ jobs , setJobs ] = useState([]);
    const [ page , setPages ] = useState(Number);
    const [ currentPage , setCurrentPage ] = useState(1);
    const [ filteredJobs , setFilteredJobs] = useState([]);

    useEffect(() => {
        const getJobs = async() =>{
            const response = await axios.get(`http://localhost:8000/applicant/getjobs`);
            setJobs(response.data.jobs);
            setFilteredJobs(response.data.jobs);
            console.log(response.data)
            setPages(response.data.jobs.length / 10);
        }
        getJobs();
    },[]);

    const nextPageHandler = () => {
      setCurrentPage(currentPage + 1);
    }

    const previousPageHandler = () => {
      setCurrentPage(currentPage - 1);
    }

    useEffect(() => {
      window.scrollTo({
        top: 0, left: 0, behavior: "smooth"
      })
    }, [currentPage])

    const [checkedValuesState, setCheckedValuesState] = useState({});
    const handleInputChange = (event) => {
      const { name, value, checked } = event.target;
      let checkedValues = { ...checkedValuesState };
    
      if (checked) {
        checkedValues[name] = [...(checkedValues[name] || []), value];
      } else {
        checkedValues[name] = (checkedValues[name] || []).filter(val => val !== value);
      }
    
      let filteredSet = new Set();
      Object.values(checkedValues).forEach(values => {
        values.forEach(val => {
          filteredSet.add(val);
        });
      });
    
      let filteredJobs = jobs.filter(job => {
        return Object.keys(checkedValues).every(key => {
          if (checkedValues[key].length === 0) return true;
          if (key === 'jobtype') return checkedValues[key].includes(job.jobtype);
          if (key === 'jobTags') return checkedValues[key].includes(job.jobTag);
          if (key === 'location') return checkedValues[key].includes(job.location);
          return true;
        });
      });
    
      setFilteredJobs(filteredJobs);
      setCheckedValuesState(checkedValues);
    }
    
    
    
  return (
    <>
    <Navbar/>
    <div className = "flex p-2 w-screen justify-center">
      <div className = "flex flex-col basis-1/4 py-4 px-12 shadow mr-2 rounded-xl min-w-[200px]">
        <div className ="text-lg font-semibold">All Filters</div>
        <div className='h-0.5 w-full bg-teal-500'></div>
        <div className = 'p-4'>
          <div className ="py-2 font-semibold" >Work mode</div>
          <div>
            <input className = 'py-3' type = 'checkbox' name ="jobtype" value = 'Work From Office' onChange={handleInputChange}/>
            <label className = 'py-3 px-2 text-sm' htmlFor='jobtype' >Work From Office</label>
          </div>
          <div>
            <input className = 'py-3' type = 'checkbox' name ="jobtype" value = 'Remote' onChange={handleInputChange} />
            <label className = 'py-3 px-2 text-sm' htmlFor='jobtype' >Remote</label>
          </div>
          <div>
            <input className = 'py-3' type = 'checkbox' name ="jobtype" value = 'Hybrid' onChange={handleInputChange} />
            <label className = 'py-3 px-2 text-sm' htmlFor='jobtype'>Hybrid</label>
          </div>
        </div>
        <div className='h-[1px] w-full bg-teal-300'></div>
        <div className = 'p-4'>
          <div className ="py-2 font-semibold" >Job Type</div>
          <div>
            <input className = 'py-3' type="checkbox" id="it" name="jobTags" value="it" onChange={handleInputChange} />
            <label className = 'py-3 px-2 text-sm' htmlFor="it">IT</label>
          </div>
          <div>
            <input className = 'py-3' type="checkbox" id="hr" name="jobTags" value="hr" onChange={handleInputChange} />
            <label className = 'py-3 px-2 text-sm' htmlFor="hr">HR</label>
          </div>
          <div>
            <input className = 'py-3' type="checkbox" id="sales" name="jobTags" value="sales" onChange={handleInputChange} />
            <label className = 'py-3 px-2 text-sm' htmlFor="sales">Sales</label>
          </div>
          <div>
            <input className = 'py-3' type="checkbox" id="marketing" name="jobTags" value="marketing" onChange={handleInputChange} />
            <label className = 'py-3 px-2 text-sm' htmlFor="marketing">Marketing</label>
          </div>
        </div>
        <div className='h-[1px] w-full bg-teal-300'></div>
        <div className = 'p-4'>
          <div className="py-2 font-semibold">Location</div>
            <div>
              <input className="py-3" type="checkbox" id="indore" name="location" value="Indore" onChange={handleInputChange} />
              <label className="py-3 px-2 text-sm" htmlFor="indore">Indore</label>
            </div>
            <div>
              <input className="py-3" type="checkbox" id="delhi" name="location" value="Delhi" onChange={handleInputChange} />
              <label className="py-3 px-2 text-sm" htmlFor="delhi">Delhi</label>
            </div>
            <div>
              <input className="py-3" type="checkbox" id="mumbai" name="location" value="Mumbai" onChange={handleInputChange} />
              <label className="py-3 px-2 text-sm" htmlFor="mumbai">Mumbai</label>
            </div>
            <div>
              <input className="py-3" type="checkbox" id="pune" name="location" value="Pune" onChange={handleInputChange} />
              <label className="py-3 px-2 text-sm" htmlFor="Pune">Pune</label>
            </div>
            <div>
              <input className="py-3" type="checkbox" id="bengaluru" name="location" value="Bangalore" onChange={handleInputChange} />
              <label className="py-3 px-2 text-sm" htmlFor="bangalore">Bangalore</label>
            </div>
        </div>
        <div className='h-[1px] w-full bg-teal-300'></div>
      </div>
      <div className = "grid grid-cols-2 gap-4 w-min-5xl">
      { filteredJobs.length > 0 ? filteredJobs.slice(((currentPage - 1 ) * 10 ) + 1 , (currentPage  * 10 )+ 1 ).map((job) =>(
        <ApplicantJobCard key = {job._id} _id = {job._id} title = {job.title} salary = {job.salary} jobtype = {job.jobtype} location = {job.location} companyName = {job.recruiterId.recruiterInfo.companyName} qualification = {job.qualification} />
      )):
      <div className ='p-4 font-semibold text-xl'>
          Opps !! Seems like no relevent job available at the moment .
      </div>
      }
      {filteredJobs.length > 10 && <div className="flex justify-center">
        <button onClick = {previousPageHandler} className={`flex items-center justify-center px-4 h-10 me-3 text-base ${currentPage === 1 ?'invisible' : 'visible'} font-medium text-teal-500 bg-white border border-teal-500 rounded-lg hover:bg-teal-500 hover:text-white`}>
          <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
          </svg>
          Previous
        </button>
        <button onClick = {nextPageHandler} className={`flex items-center justify-center px-4 h-10 me-3 text-base ${currentPage === page ?'invisible' : 'visible'} font-medium text-teal-500 bg-white border border-teal-500 rounded-lg hover:bg-teal-500 hover:text-white`}>
          Next
          <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </button>
      </div>}
      <div>
      </div>
      </div>
    </div>
    </>
  )
}

export default Explore