import React, {useState,useEffect} from 'react'
import { TextField,InputAdornment } from '@mui/material'
import {Search as SearchIcon} from '@mui/icons-material'
import { useDispatch,useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
 import { useTheme } from '@emotion/react'
 import { searchMovie } from '../../features/currentGenreOrCategory'
const Search = () => {
    const theme=useTheme();
    const [query, setQuery] = useState('')
    const dispatch=useDispatch()
    const handleKeyPress=(event)=>{
         if (event.key==='Enter'){
            dispatch(searchMovie(query))
         }
    };
    const location=useLocation();
    if(location.pathname!=='/') return null;
  return (
    <div style={{[theme.breakpoints.down("sm")]:{display:"flex",justifyContent:"center",width:"100%"}}}>
      <TextField onKeyDown={handleKeyPress} value={query} onChange={(e)=>setQuery(e.target.value)} variant='standard' 
      sx={{color:theme.palette.mode==='light'&&'black',filter:theme.palette.mode==='light'&&'invert(1)',
        [theme.breakpoints.down("sm")]:{marginTop:"-10px",marginBottom:'10px',}}} 
      InputProps={{
        startAdornment:(
            <InputAdornment position='start'>
                <SearchIcon/>
            </InputAdornment>
        )
      }}/>
    </div>
  )
}

export default Search
