import React from 'react'
import Cookies from 'js-cookie';



const Logout = () => {

    const clickHandler = () => {
        Cookies.remove('userInfo', { path : ''});
    }
  return (
    <button type="button" onClick = {clickHandler} className="text-white bg-gradient-to-r from-teal-500 to-teal-300 hover:bg-gradient-to-bl  font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Logout</button>
  )
}

export default Logout