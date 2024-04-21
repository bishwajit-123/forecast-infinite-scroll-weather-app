import { useState } from 'react'
import Tables from './components/Tables'
import Header from './components/Header'
import Weather from './components/Weather'
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  return (
    <> 
   
         <BrowserRouter>
               <Routes>
                    <Route path="/"  element={<Header/>}/>
                    <Route path="/table"  element={<Tables/>}/>
                    <Route path="/weather/:cityName"  element={<Weather/>}/>   
              </Routes>
         </BrowserRouter>
     
    </>
  )
}

export default App
