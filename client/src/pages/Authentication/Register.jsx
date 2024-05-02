import React,{useState , useContext , useEffect } from 'react'
import Image from '../../assets/RecruiterImage.jpg';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import axios from 'axios';
import { DataContext } from '../../contexts/DataContext';

const Register = () => {
    const navigate = useNavigate();
    const [email , setEmail ] = useState('');
    const [password , setPassword ] = useState('');
    const [confirmPassword , setConfirmPassword] = useState('');
    const [companyName , setCompanyName] = useState('');

    const [area,setArea] = useState('');
    const [city,setCity] = useState('');
    const [state,setState] = useState('');
    const [zipcode,setZipcode] = useState('');

    const { isAuthenticated, userRole ,setUserRole,setUserInfo, userInfo, setIsAuthenticated} = useContext(DataContext);


    const isFormValid = email && password && (password === confirmPassword) && companyName && area && city && state && zipcode  ;
    console.log(isFormValid);
    const submitHandler = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:8000/api/auth/register',
            {email , password, companyName ,area , city ,state , zipcode },
            { 'content-type': 'application/json' });
            const data = response.data;
            localStorage.setItem('userInfo',JSON.stringify(data.userInfo));
            localStorage.setItem('access_token', JSON.stringify(data.token));
            console.log(data);
            setUserInfo(data.userInfo);
            setIsAuthenticated(true);
            setUserRole(data.userInfo.role);
            navigate('/recruiter/dashboard');
        }catch(error){
            console.log(error);
        }
    }


  return (
    <>
    <div className="text-center  text-[50px] p-4 font-normal  tracking-wider">Welcome</div>
    <div className="w-full min-h-screen flex justify-center flex-col lg:flex-row items-center ">
    <img className = " w-1/2" src = {Image}/>
        <div className = "relative w-9/12 max-w-md rounded-md p-4 " >
            <form onSubmit={submitHandler}>
            <Input name = 'Email' type = 'email' onChange = {(e) => setEmail(e.target.value)}/>
            <Input name = 'Password' type = 'password' onChange = {(e) => setPassword(e.target.value)}/>
            <Input name = 'Confirm Password' type = 'password'onChange = {(e) => setConfirmPassword(e.target.value)}/>
            <div className="grid md:grid-cols-2 md:gap-6">
                <Input name = 'Company Name' type = 'text' onChange = {(e) => setCompanyName(e.target.value)}/>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
                <Input name = 'Street/Area' type = "text" onChange = {(e) => setArea(e.target.value)} />
                <Input name = 'City' type = "text" onChange = {(e) => setCity(e.target.value)} />
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
                <Input name = 'Zipcode' type = "number" onChange = {(e) => setZipcode(e.target.value)} />
                <Input name = 'State' type = "text" onChange = {(e) => setState(e.target.value)} />
            </div>
            <button type="submit" disabled= {!isFormValid} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
            <div className = "flex flex-cols justify-center">
                <div className = "px-2 text-sm text-gray-500">Already have an account?</div>
                <span className ="text-sm text-blue-700" ><Link to = "/auth/login">Login</Link></span>
            </div>
        </div>
    </div>
    </>
  )
}

export default Register