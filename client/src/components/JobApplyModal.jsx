import React from 'react'

const JobApplyModal = ({ onClose , setSelectedFile , setSop ,selectedFile , onSave, isValid}) => {
  return (
    <div tabindex="" aria-hidden="true" className ="absolute backdrop-blur-sm overflow-y-auto overflow-x-hidden top-1/2 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className ="p-4 w-full max-w-md max-h-full">
            <div className ="relative bg-white rounded-lg shadow ">
                <div className ="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                    <h3 className ="text-xl font-semibold text-gray-900 ">
                        Apply Now
                    </h3>
                    <button type="button" onClick= {() => {onClose(false); setSelectedFile(null);}} className ="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="authentication-modal">
                        <svg className ="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="teal" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>
                <div className ="p-4 md:p-5">
                    <form className ="space-y-4" action="#">
                        <div>
                            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 ">Write SOP</label>
                            <textarea id="message" rows="4" onChange = {(event) => setSop(event.target.value)} class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your sop here..."></textarea>
                        </div>
                        <div class="flex items-center justify-center w-full">
                            <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 ">
                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg class="w-8 h-8 mb-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="teal" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                    { selectedFile ? <p class="mb-2 text-sm text-gray-500 "><span class="font-semibold">{selectedFile.name}</span></p>:
                                        <>
                                            <p class="mb-2 text-sm text-gray-500 "><span class="font-semibold">Click to upload</span> or drag and drop Your Resume</p>
                                            <p class="text-xs text-gray-500 ">JPG (MAX. 2MB)</p>
                                        </>
                                    }
                                </div>
                                <input id="dropzone-file" name = 'resume' onChange = {(event) => setSelectedFile(event.target.files[0])} type="file" accept="application/pdf" class="hidden" />
                            </label>
                        </div> 
                        <button onClick = {onSave} disabled={!isValid} type = "button" className = "text-white bg-teal-500 p-2 mr-2 rounded-md">Apply</button>
                        <button onClick= {() => {onClose(false);setSelectedFile(null);}} type = "button" className = "text-teal-500 p-2 border border-teal-500 rounded-md">Close</button>
                    </form>
                </div>
            </div>
        </div>
    </div> 
  )
}

export default JobApplyModal;