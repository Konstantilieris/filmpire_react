 
 import React from 'react'
 import CssBaseline from '@mui/material/CssBaseline';
 import { Route,Routes } from 'react-router-dom';
import {Actors,MovieInformation,Movies,Navbar,Profile} from './index'
 
const App = () => {
  return (
   
    <div style={{display:"flex",height:"100%",}}>
       <CssBaseline/>
       <Navbar/>
        <main style={{display:"flex",flexGrow:1,padding:'4em',marginTop:"30px", justifyItems:"flex-start"}}>
        <div style={{height:'70px'}}>
          <Routes>
            <Route  exact path="/" element={<Movies />} >
             
            </Route>
            <Route  exact path="/movies" element={<MovieInformation />}>
              
            </Route>
            <Route  exact path="/actors/:id" element={<Actors/>}>
              
              </Route>
              <Route  exact path="/profile/:id" element={<Profile/>}>
              
              </Route>
          </Routes>
          </div>
        </main>
    </div>
   
  )
}

export default App

