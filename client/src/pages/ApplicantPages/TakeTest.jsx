import React, { useState , useEffect, useContext } from 'react'
import Navbar from '../../components/Navbar'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DataContext } from '../../contexts/DataContext';

const TakeTest = () => {
    
    const [ testInfo , setTestInfo ] = useState({});
    const [ questions , setQuestions ] = useState([]);
    const [ answers , setAnswers ] = useState({});
    const [ time , setTime ] = useState(Number);
    const { userInfo } = useContext(DataContext);
    const [ userId , setUserId ] = useState();
    const params = useParams();

    const access_token = JSON.parse(localStorage.getItem('access_token'));
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`
        }
    }

    useEffect(() => {
        const getInfo = async() =>{
            const response = await axios.get(`http://localhost:8000/applicant/taketest/${params.id}`)
            setTestInfo(response.data.testInfo);
            setTime(response.data.testInfo.timing);
            setQuestions(response.data.questions);
            console.log(response.data)
        }
        getInfo();
    },[]); 


    const submitTest = async() => {
        console.log(userInfo)
        
        try{
            const userId = userInfo._id ;
            console.log(userId)
            const response = await axios.post('http://localhost:8000/applicant/submitTest',{ userId : userId , testId : params.id , answers : answers }, config)
            console.log(response.data)
        }
        catch(error){
            console.log(error);
        }
    }

    const answerHandler = (_id,selectedOption) =>{
        console.log(answers);
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [_id]: selectedOption
        }));
    }

  return (
    <>
        <Navbar />
        {
            testInfo && 
            <>
                <div className = 'flex flex-col justify-center items-center p-2'>
                    <div className = 'py-2 px-4 shadow-xl rounded-xl w-2/3'>
                        <div className = 'py-2 text-3xl text-teal-600 font-semibold'>{testInfo.title}</div>
                        <div className ='py-2'>{testInfo.description}</div>
                        <div className = 'py-2'><span className = 'font-semibold pr-2'>Time:</span>{testInfo.timing} <span className = 'text-sm text-gray-500'>(in mins)</span></div>
                    </div>
                </div>
            </>
        }
        {
            questions && 
            <>
                <div className = 'flex flex-col justify-center items-center p-2'>
                    <div className = 'py-2 px-4 shadow-xl rounded-xl w-2/3'>
                    {    questions.map((ques,index) => (
                            <div key = {index} className = 'p-2'>
                                <div className = 'flex justify-between items-center'>
                                    <div className = 'font-semibold text-lg'><span>{index + 1}. </span>{ques.question}</div>
                                    <div>Pts:<span className="bg-teal-100 text-teal-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded ">{ques.points}</span></div>
                                </div>
                                
                                {
                                    ques.options.map((option,ind) =>(
                                        <div key={ind} class="flex flex-wrap">
                                            <div class="flex items-center me-4">
                                                <input id={`${ques._id}-${ind}`}  name = {`${ques._id}`} type="radio" value={option} onChange = { () => answerHandler(ques._id,option)}  class="w-4 h-4 text-teal-600 bg-teal-100 border-gray-300 " />
                                                <label htmlFor={`${ques._id}-${ind}`} class="ms-2 p-1 text-sm font-medium text-gray-900">{option}</label>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                    <div className = 'flex flex-end'>

                    </div>
                    <button type="button" onClick = {submitTest} className = "p-2 bg-teal-500 text-white rounded-lg">Submit</button>
                    </div>
                </div>
            </>
        }
    </>
  )
}

export default TakeTest