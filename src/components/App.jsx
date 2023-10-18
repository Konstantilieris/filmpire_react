 
 import React, {useRef} from 'react'
 import CssBaseline from '@mui/material/CssBaseline';
 import { Route,Routes } from 'react-router-dom';
import {Actors,MovieInformation,Movies,Navbar,Profile} from './index'
 import useAlan from './Alan';
const App = () => {
  const alanBtnContainer=useRef()
  useAlan();
  return (
   
    <div style={{display:"flex",height:"100%",width:"100%"}}>
       <CssBaseline/>
       <Navbar/>
        <main style={{display:"flex",flexGrow:1,padding:'4em',marginTop:"40px", justifyItems:"flex-start",width:'100%'}}>
        <div style={{height:'70px'}}>
          <Routes>
            <Route  exact path='/' element={<Movies />} >
             
            </Route>
            <Route  exact path='/approved' element={<Movies />} >
             
            </Route>
            <Route  exact path="/movie/:id" element={<MovieInformation />}>
              
            </Route>
            <Route  exact path="/actors/:id" element={<Actors/>}>
              
              </Route>
              <Route  exact path="/profile/:id" element={<Profile/>}>
              
              </Route>
          </Routes>
          </div>
        </main>
        <div ref={alanBtnContainer}/>
    </div>
   
  )
}

export default App

