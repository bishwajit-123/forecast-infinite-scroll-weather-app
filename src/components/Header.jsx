import React from 'react'
import logo5 from "../assets/Images/logo5.jpg"; 
import Tables from './Tables';

export default function Header() {
  return (
    <>
   <div className=" bg-[url('../src/assets/images/sunny.jpg')] text-white bg-cover bg-center h-40">
    <div className="max-width-[1300px] mx-auto">
    <div className="py-5 px-3">
         <img src ={logo5} className="w-[80px] h-[100px] rounded-full" /> 
         <span className="text-2xl font-bold">WEATHER APP</span>
     </div>
 </div>
 </div>
 <>
   <Tables></Tables>
  </>
  </>
   

  )
}
