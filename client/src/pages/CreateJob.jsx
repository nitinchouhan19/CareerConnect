import React, { useEffect ,useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import Input from '../components/Input'
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { DataContext } from '../contexts/DataContext'

const CreateJob = () => {
    const navigate = useNavigate();
    const [ title , setTitle] = useState(String);
    const [ skills , setSkills ] = useState('');
    const [ jobDescription , setJobDescription ] = useState(String);
    const [ location , setLocation ] = useState(String);
    const [ vacancy , setVacancy ] = useState(Number);
    const [ jobtype , setJobtype ] = useState(String);
    const [ maxApplicant , setMaxApplicant ] = useState(Number);
    const [ salary , setSalary ] = useState(String);
    const [ yearsOfExperience , setYearOfExperience ] = useState(String);
    const [ jobTag , setJobTag ] = useState(String);
    const [ qualification , setQualification ] = useState(String);
    const { isAuthenticated , userInfo } = useContext(DataContext);

    useEffect(() =>{
        if(!isAuthenticated) navigate('/auth/login');
    })

    const access_token = JSON.parse(localStorage.getItem('access_token'));
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${access_token}`
        }
    }
    

    const submitHandler = async (event) => {
        const recruiterId = userInfo._id;
        event.preventDefault();
        try{
            const response = await axios.post('http://localhost:8000/createjob',{
                recruiterId , title , skills , jobDescription, location , maxApplicant , jobtype , jobTag , qualification , vacancy , salary ,yearsOfExperience
            },config);
            console.log(response.data);
           
        }
        catch(error){
            console.log(error);
        }
        navigate('/recruiter/livejobs');
    }
    const isValid = title && skills && jobDescription && location && maxApplicant && jobtype && jobTag && qualification && vacancy && salary && yearsOfExperience;

  return (
    <>
    <Navbar />
    <div className="WelcomeBack text-center text-[50px] p-4 font-normal tracking-wider">Create Job</div>
    <div className=" w-full min-h-screen flex justify-center flex-col lg:flex-row  ">
        <div className = "w-9/12 max-w-3xl rounded-md p-4" >
            <form onSubmit = {submitHandler}>
                <div class="grid md:grid-cols-2 md:gap-6">
                    <Input name = 'Title' type = 'text' onChange = {(e) => setTitle(e.target.value)} />
                    <Input name = 'Skills' type = 'text' onChange = {(e) => setSkills(e.target.value)} />
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <textarea type='String'  id="Job Description" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-teal-300 peer" placeholder=" " onChange = {(e) =>setJobDescription(e.target.value) } required > </textarea>
                    <label htmlFor="Job Description" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-teal-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >Job Description</label>
                </div>
                <div class="grid md:grid-cols-2 md:gap-6">
                    <div className = "pb-3">
                        <label htmlFor="JobType" className="block mb-2 text-sm font-medium text-gray-900 ">Select an option</label>
                        <select id="JobType" className="border border-gray-300 text-gray-500  text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 " onChange = {(e) => setJobtype(e.target.value)}>
                            <option selected value = "">Job Type</option>
                            <option value="Remote">Remote</option>
                            <option value="Work From Office">Work From Office</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                    </div>
                    <div className = "pb-3">
                        <label htmlFor="JobTag" className="block mb-2 text-sm font-medium text-gray-900 ">Select a Tag</label>
                        <select id="JobTag" className=" border border-gray-300 text-gray-500  text-sm rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 " onChange = {(e) => setJobTag(e.target.value)}>
                            <option selected value = "">Job Tag</option>
                            <option value="it" className = "">IT</option>
                            <option value="hr">HR</option>
                            <option value="sales">Sales</option>
                            <option value="marketing">Marketing</option>
                            <option value="others">Others</option>
                        </select>
                    </div>
                </div>
                <div class="grid md:grid-cols-2 md:gap-6">
                    <Input name = 'Location' type = 'text' onChange = {(e) => setLocation(e.target.value)} />
                    <Input name = 'Highest Qualification' type = 'text' onChange = {(e) => setQualification(e.target.value)} />
                </div>
                <div class="grid md:grid-cols-2 md:gap-6">
                    <Input name = 'Vacancy' type = 'number' onChange = {(e) => setVacancy(e.target.value)} />
                    <Input name = 'Maximum Applicants' type = 'number' onChange = {(e) => setMaxApplicant(e.target.value)} />
                </div>
                <div class="grid md:grid-cols-2 md:gap-6">
                    <Input name = 'Salary' type = 'text' onChange = {(e) => setSalary(e.target.value)} />
                    <Input name = 'Expericence Required' type = 'text' onChange = {(e) => setYearOfExperience(e.target.value)} />
                </div>
                <button type="submit" disabled= {!isValid} className="text-white bg-teal-600 hover:bg-teal-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
            </form>
        </div>
    </div>
    </>
  )
}

export default CreateJob