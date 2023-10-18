import React, {useContext, useEffect, useState} from 'react'
import { AppBar,IconButton,Toolbar,Drawer,Button,Avatar,useMediaQuery } from '@mui/material'
import {Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useTheme } from '@emotion/react'
import Sidebar from '../Sidebar/Sidebar'
import Search from '../Search/Search'
import { useDispatch,useSelector } from 'react-redux'
import { fetchToken,moviesApi,createSessionId } from '../../utils'
import {setUser,userSelector} from '../../features/auth';
import { ColorModeContext } from '../../utils/ToggleColorMode'
import './Navbar.css'
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);  
  const isMobile=useMediaQuery('(max-width:600px)')
  const theme=useTheme();
  const colorMode=useContext(ColorModeContext);
  const token= localStorage.getItem('request_token')
  const sessionIdFromLocalStorage= localStorage.getItem('session_id')
  const dispatch=useDispatch();
  const {isAuthenticated,user}=useSelector(userSelector)
  
  useEffect(()=>{
      const logInUser= async ()=>{
        if (token){
           if(sessionIdFromLocalStorage){
            const {data: userData}= await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`)
            dispatch(setUser(userData))
           } else {
               const sessionId= await createSessionId();
               const {data: userData}= await moviesApi.get(`/account?session_id=${sessionId}`)
               dispatch(setUser(userData))
           }
        }
      };
      logInUser();
  },[token]);
   
  return (
   <>
    <AppBar position='fixed'>
      <Toolbar sx={{height:"80px",display:"flex",justifyContent:"space-between",marginLeft:"240px",[theme.breakpoints.down("sm")]:{marginLeft:0,flexWrap:"wrap"}}}>
          {isMobile && (
            <IconButton color='inherit' edge="start" style={{outline:'none'}} onClick={()=>setMobileOpen((prevMobileOpen)=>!prevMobileOpen)} sx={{marginRight: theme.spacing(2)
            ,[theme.breakpoints.up('sm')]:{display:"none"} }}>
              <Menu/>
            </IconButton>
          )}
          <IconButton color="inherit" sx={{ml:1}} onClick={colorMode.toggleColorMode}>
            {theme.palette.mode==="dark"?<Brightness7 />:<Brightness4 />}
          </IconButton>
          {!isMobile && <Search/>}
          <div >
            {!isAuthenticated ? (<Button className='login_button'color='inherit' onClick={fetchToken}> Login &nbsp; <AccountCircle /></Button>)
            :(<Button color="inherit" component={Link} to={`/profile/${user.id}`} onClick={()=>{}} className='auth_button'>
            {!isMobile && <>My Movies &nbsp;</>}<Avatar variant="rounded" style={{width:30,height:30}} alt='Profile'
             src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar_path}`} /> 
            </Button> )}
          </div>
          {isMobile && <Search/>}
      </Toolbar>
    </AppBar>
    <div>
      <nav  style={{[theme.breakpoints.up('sm')]:{display:"none"}, width:"240px",flexShrink:0 }} >
            {isMobile?(
              <Drawer variant='temporary' anchor='right' open={mobileOpen} onClose={()=>setMobileOpen((prevMobileOpen)=>!prevMobileOpen)} sx={{width:"240px"}} ModalProps={{keepMounted:true}}>
                 <Sidebar setMobileOpen={setMobileOpen}/>
            </Drawer>):(
              <Drawer sx={{width:"240px"}} variant="permanent" open>
                 <Sidebar setMobileOpen={setMobileOpen}/>
              </Drawer>
            )}
      </nav>
    </div>
   </>
  )
}

export default Navbar
