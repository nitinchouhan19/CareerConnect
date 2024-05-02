import React from 'react'

const ApplicationCard = ({sop, onDownload}) => {
  return (
    <>
    <div className = 'flex p-2 w-full items-center justify-between rounded-md shadow shadow-md'>
        <div className = 'px-2 font-semibold'>
            {sop}
        </div>
        <div>
            <button onClick = {onDownload} className = 'p-2 bg-teal-500 text-white rounded-md shadow-lg'>Download Resume</button>
        </div>
    </div>
    </>
  )
}

export default ApplicationCard