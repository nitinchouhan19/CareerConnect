import React, { useState } from 'react'

const QuestionCard = ({ questions , setQuestions , testId}) => {
    const [ option1,setOption1 ] = useState('');
    const [ option2,setOption2 ] = useState('');
    const [ option3,setOption3 ] = useState('');
    const [ option4,setOption4 ] = useState('');
    const [ problem , setProblem ] = useState('');
    const [ answer , setAnswer ] = useState('');
    const [ points , setPoints ] = useState(1);

    const onAddQuestion = () => {
        const newQuestion = {
            question : problem,
            options : [ option1 , option2 , option3, option4],
            answer : answer,
            points : points,
            testId : testId,
        }
        const updatedQuestions = questions.length === 0 || questions === undefined
        ? [newQuestion]
        : [...questions, newQuestion];
        setQuestions(updatedQuestions);
        setOption1('');
        setOption2('');
        setOption3('');
        setOption4('');
        setAnswer('');
        setPoints(1);
        setProblem('');
    }
    const isValid = problem && option1 && option2 && option3 && option4 && answer && points
  return (
    <>
        <div className = "text-center text-2xl font-semibold">
            Add Question
        </div>
        <div>
            <label htmlFor="question" class="block mb-2 text-sm font-medium text-teal-700 ">Question</label>
            <input onChange = {(e) => setProblem(e.target.value)} value = {problem} type="text" id="question" class="bg-gray-50 border border-gray-300 text-teal-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter Your Question" required />
        </div>
        <div class="grid gap-6 grid-cols-2">
            <div className = 'py-2'>
                <div className = 'py-2'>
                    <label htmlFor="option1" class="block mb-2 text-sm font-medium text-teal-700 ">Option 1</label>
                    <input onChange = {(e) => setOption1(e.target.value)} value = {option1}type="text" id="option1" class="bg-gray-50 border border-gray-300 text-teal-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Option 1" required />
                </div>
                <div className = 'py-2'>
                    <label htmlFor="option2" class="block mb-2 text-sm font-medium text-teal-700 ">Option 2</label>
                    <input onChange = {(e) => setOption2(e.target.value)} value = {option2} type="text" id="option2" class="bg-gray-50 border border-gray-300 text-teal-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Option 2" required />
                </div>
            </div>
            <div className = 'py-2'>
                <div className = 'py-2'>
                    <label htmlFor="option3" class="block mb-2 text-sm font-medium text-teal-700 ">Option 3</label>
                    <input onChange = {(e) => setOption3(e.target.value)} value = {option3} type="text" id="option3" class="bg-gray-50 border border-gray-300 text-teal-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Option 3" required />
                </div>
                <div className = 'py-2'>
                    <label htmlFor="option4" class="block mb-2 text-sm font-medium text-teal-700 ">Option 4</label>
                    <input onChange = {(e) => setOption4(e.target.value)} value = {option4} type="text" id="option4" class="bg-gray-50 border border-gray-300 text-teal-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Option 4" required />
                </div>
            </div>
            <div className = ''>
                <div className = 'py-2'>
                <label htmlFor="answer" class="block mb-2 text-sm font-medium text-teal-700 ">Correct Answer</label>
                    <select onChange = {(e) => setAnswer(e.target.value)} className="w-[300px] text-teal-500 text-sm rounded-lg py-2 border border-teal-500">
                        <option value = {option1} selected >Option1 - {option1}</option>
                        <option value = {option2}>Option2 - {option2}</option>
                        <option value = {option3}>Option3 - {option3}</option>
                        <option value = {option4}>Option4 - {option4}</option>
                    </select>
                </div>
            </div>
            <div className = ''>
                <div className = 'py-2'>
                    <label htmlFor="points" class="block mb-2 text-sm font-medium text-teal-700 ">Points</label>
                    <input onChange = {(e) => setPoints(e.target.value)} value = {points} type="Number" defaultValue = {1} id="points" class="bg-gray-50 border border-gray-300 text-teal-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Points" required />
                </div>
            </div>
        </div>
        <div className = 'py-2'>
            <button onClick = {onAddQuestion} disabled= {!isValid} className = 'p-2 bg-teal-500 text-white rounded-md shadow-lg'>Add Question</button>
        </div>
    </>
  )
}

export default QuestionCard