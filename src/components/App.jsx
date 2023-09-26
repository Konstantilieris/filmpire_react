 
 import React from 'react'
 import CssBaseline from '@mui/material/CssBaseline';
 import { Route,Routes } from 'react-router-dom';
import {Actors,MovieInformation,Movies,Navbar,Profile} from './index'
 import { Box } from '@mui/material';
const App = () => {
  return (

    <Box sx={{display:"flex",height:"100%",}}>
       <CssBaseline/>
       <Navbar/>
        <main style={{flexGrow:1,padding:"2em"}}>
        <Box sx={{height:'70px'}}>
          <Routes>
            <Route  exact path="/" element={<Movies/>} >
             
            </Route>
            <Route  exact path="/movies" element={<MovieInformation />}>
              
            </Route>
            <Route  exact path="/actors/:id" element={<Actors/>}>
              
              </Route>
              <Route  exact path="/profile/:id" element={<Profile/>}>
              
              </Route>
          </Routes>
          </Box>
        </main>
    </Box>
  )
}

export default App

