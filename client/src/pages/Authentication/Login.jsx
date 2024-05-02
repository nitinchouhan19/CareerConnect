import React, { useContext, useState , useEffect } from 'react'
import Image from '../../assets/RecruiterImage.jpg';
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setCookie } from '../../contexts/Cookie';
import { DataContext } from '../../contexts/DataContext';
import Input from '../../components/Input';
import { useToast } from '@chakra-ui/react'

const Login = () => {
    const navigate = useNavigate();
    const toast = useToast();

    const [email , setEmail ] = useState('');
    const [emailValid,setEmailValid] = useState(false);
    const [password , setPassword ] = useState('');
    const { isAuthenticated, userRole ,setUserRole,setUserInfo, userInfo, setIsAuthenticated} = useContext(DataContext);
    const [isRecruiter, setIsRecruiter] = useState(false);

    useEffect(() =>{
        if(isAuthenticated) navigate('/');
    })

    const emailHandler = (e)=>{
        setEmail(e.target.value);
        if(e.target.value.includes('@')) setEmailValid(true); 
        else setEmailValid(false);
    }

    const passwordHandler = (e)=>{
        setPassword(e.target.value)
    }

    const isFormValid = password && emailValid;

    const submitHandler = async (e)=>{
        e.preventDefault();
        try
        {
            const response = await axios.post(isRecruiter ? 'http://localhost:8000/api/auth/login/recruiter' : 'http://localhost:8000/api/auth/login/applicant' ,{
                email, password
            });
            const data = response.data;
            toast({
                title : 'Successfully Login',
                isClosable:true,
                status : 'success',
                position:'bottom',
                duration : 4000
            })
            console.log(data);
            localStorage.setItem('userInfo',JSON.stringify(data.userInfo));
            localStorage.setItem('access_token', JSON.stringify(data.token));
            setUserInfo(data.userInfo);
            setIsAuthenticated(true);
            setUserRole(data.userInfo.role);
            if( response.data.userInfo.role === 'recruiter') navigate('/recruiter/dashboard');
            else navigate('/');
        }
        catch(error)
        {
            toast({
                title : `${error.response.data.message}`,
                isClosable:true,
                status : 'error',
                position:'bottom',
                duration : 4000
            })
            console.log(error.response.data.message);
        }
        console.log(email,password,isFormValid);
        setEmail('');
        setPassword('');
        setEmailValid(false);
    }

  return (
    <>
    <div className="text-center text-5xl p-2 font-normal  tracking-wider">Welcome Back</div>
    <div className="w-full min-h-screen flex justify-center flex-col lg:flex-row items-center">
    <img className = " w-1/2" src = {Image}/>
        <div className = "relative w-9/12 max-w-md rounded-md p-4 " >
            <form className = "z-10" onSubmit = {submitHandler}>
            <div className="relative z-0 w-full mb-6 group">
                <Input type="email" name = 'Email' value = {email} onChange={emailHandler}  required />
            </div>
            <div className="relative z-0 w-full mb-6 group">
                <Input type="password" name="Password"  onChange={passwordHandler} required />
            </div>
            <div className="flex items-center mb-4">
                <input id="role" type="checkbox"  checked={isRecruiter} onChange={() => setIsRecruiter(!isRecruiter)} value="" className="w-4 h-4 text-teal-600  rounded focus:ring-teal-600 ring-offset-teal-800 focus:ring-2 bg-teal-700 border-teal-600" />
                <label htmlFor="role" className="ms-2 text-sm font-medium text-gray-600">Login as Recrutier</label>
            </div>
            <button type="submit" disabled = {!isFormValid}  className="text-white bg-teal-500 disabled:bg-gray-500 hover:bg-teal-600 focus:ring-4  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>
            </form>
            <div className = "flex flex-cols justify-center py-2">
                <div className = "px-2 text-sm text-gray-500">Didn't have an account?</div>
                <span className ="text-sm text-blue-700" ><Link to = "/auth/register">Register</Link></span>
            </div>
            <div className = "flex flex-cols justify-center py-2">
                {/* <span className ="text-sm text-blue-700" ><Link to = "/auth/forgotpassword">Forgot Password ?</Link></span> */}
            </div>
        </div>
    </div>
    </>
  )
}

export default Login