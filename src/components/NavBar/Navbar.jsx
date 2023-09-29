import React, {useState} from 'react'
import { AppBar,IconButton,Toolbar,Drawer,Button,Avatar,useMediaQuery } from '@mui/material'
import {Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useTheme } from '@emotion/react'
import Sidebar from '../Sidebar/Sidebar'
import Search from '../Search/Search'
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);  
  const isMobile=useMediaQuery('(max-width:600px)')
  const theme=useTheme();
  const isAuthenticated=true;
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
          <IconButton color="inherit" sx={{ml:1}} onClick={()=>{}}>
            {theme.palette.mode==="dark"?<Brightness7 />:<Brightness4 />}
          </IconButton>
          {!isMobile && <Search/>}
          <div >
            {!isAuthenticated ? (<Button color='inherit' onClick={()=>{}}> Login &nbsp; <AccountCircle /></Button>)
            :(<Button color="inherit" component={Link} to={`/profile/:id`} onClick={()=>{}} sx={{'&:hover':{ color:'white !important',textDecoration:'none'}}}>
            {!isMobile && <>My Movies &nbsp;</>}<Avatar variant="rounded" style={{width:30,height:30}} alt='Profile' src={"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"} /> 
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
