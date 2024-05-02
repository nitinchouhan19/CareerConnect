import { Link } from "react-router-dom"
import LocationImage from '../assets/Location.png'
import RupeeImage from '../assets/Rupee.png'


const ApplicantJobCard = ({ _id , title , companyName , salary , jobtype, location , qualification}) => {
  return (
    <div className="max-w-2xl p-6 bg-white border border-gray-200 rounded-lg shadow-lg ">
        <Link to = {`/applicant/job/${_id}`}>
            <h5 className="mb-1 text-2xl font-semibold tracking-tight text-gray-900 ">{title}</h5>
        </Link>
        <p className="mb-2 font-normal text-gray-500 ">{companyName}</p>
        <div className = 'flex pb-2'>
          <div className = 'pr-2 flex items-center'>
            <img src = {RupeeImage} className = 'h-4 w-auto'/>
            <span>{salary}</span>
          </div>
          <div className = 'pr-2 flex items-center'>
            <img src = {LocationImage} className = 'h-4 w-auto'/>
            <span>{location}</span>
          </div>
        </div>
        <p className="font-normal text-gray-400 text-sm ">{jobtype}</p>
        <div className="text-sm text-gray-800 py-1">{qualification}</div>
        <Link to = {`/applicant/job/${_id}`}  className ="inline-flex items-center rounded-md shadow shadow-md bg-teal-500 p-2">
            <span className = "bg-transparent text-white">Apply Now</span>
            <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
            </svg>
        </Link>
    </div>
  )
}

export default ApplicantJobCard