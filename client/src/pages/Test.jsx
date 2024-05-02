import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import QuestionCard from '../components/QuestionCard'
import CloseImage from '../assets/close.svg';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Test = () => {
    const [ questions , setQuestions ] = useState([]);
    const [ isOpen , setIsOpen ] = useState(false);
    
    const [ testDetail , setTestDetail ] = useState('');
    const [ title , setTitle ] = useState('');
    const [ description , setDescription ] = useState('');
    const [ timing , setTiming ] = useState(Number);
    const params = useParams();
    const navigate = useNavigate();
    const jobId = params.id;

    const access_token = JSON.parse(localStorage.getItem('access_token'));
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${access_token}`
        }
    }
    


    const testDetailHandler = () => {
        const dict = {
            title : title,
            description : description,
            timing : timing
        }
        setTestDetail(dict);
    }

    const submitHandler = async() => {
        try{
            const response = await axios.post('http://localhost:8000/recruiter/createtest',{ jobId ,test : testDetail,questions},config);
            console.log(response.data);
            navigate(`/recruiter/job/${jobId}`)
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() =>{
        console.log(questions,testDetail);
    },[questions])

    const onRemove = (question) =>{
        setQuestions(questions.filter(ques => ques !== question));
    }

  return (
    <>
        <Navbar />
        
        <div className = "flex flex-col items-center p-2 justify-center w-screen">
            
            
            { testDetail === ''  ? <div className = "flex flex-col items-center p-2 justify-center w-1/2 rounded-xl shadow-2xl">
                <div className = 'w-full py-4'>
                    <div className = "text-center text-xl font-semibold">Test Details:</div>
                    <form class="max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                        <div class="relative z-0 w-full mb-5 group">
                            <input onChange = {(e) => setTitle(e.target.value)} value = {title} type="text" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-teal-500 appearance-none focus:outline-none focus:ring-0 focus:border-teal-600 peer" placeholder=" " required />
                            <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-text-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Test Title</label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                            <label for="message" class="block mb-2 text-sm font-medium text-gray-900">Description</label>
                            <textarea onChange = {(e) => setDescription(e.target.value)} value = {description} id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-teal-500 focus:border-teal-500" placeholder="Write desciption here..."></textarea>
                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                            <input onChange = {(e) => setTiming(e.target.value)} value = {timing} type="Number" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-teal-500 appearance-none focus:outline-none focus:ring-0 focus:border-teal-600 peer" placeholder=" " required />
                            <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-text-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Timing (in mins.)</label>
                        </div>
                        <button type="submit" onClick = {testDetailHandler} class="text-white bg-teal-500 hover:bg-teal-600  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Add Questions</button>
                    </form>
                </div>
            </div>:
            <div className = "flex flex-col px-20 py-4 w-2/3 rounded-2xl shadow-2xl">
                <div className = 'flex justify-around'>
                    <button type="button" onClick = {() => setIsOpen((prev) => !prev)} className = 'p-2 mr-2 bg-teal-500 text-white rounded-md shadow-lg' >{isOpen ?'Close':'Add Questions'}</button>
                    <button type="button" onClick = {submitHandler} className = {`p-2 bg-teal-500 text-white rounded-md shadow-lg ${questions.length >5 ? 'visible':'hidden'}`} >Create Test</button>
                </div>
                <div className = {`w-full shadow shadow-lg p-4 rounded-2xl shadow-2xl  ${isOpen ? 'visible':'hidden'}`}>
                    <QuestionCard questions={questions} setQuestions = {setQuestions} jobId = {jobId}/>
                </div>
                {
                    questions.length > 0 &&
                    questions.map((question) =>(
                        <div className = 'relative flex flex-col p-4 shadow-md rounded-lg'>
                            <button onClick = {() => onRemove(question)} className = 'absolute top-5 right-4'><img src = {CloseImage} className = 'h-4 w-auto'/></button>
                            <div className = 'text-lg font-semibold'>{question.question}</div>
                            <div className = 'py-2'>
                                <div className = 'pb-1'>Options: </div>
                                <div className = 'flex gap-4'>
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
        
    </>
  )
}

export default Test