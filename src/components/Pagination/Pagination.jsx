import React from 'react'
import { Typography,Button } from '@mui/material' 
import './Pagination.css';
import { useTheme } from '@emotion/react';
const Pagination = ({currentPage,setPage,totalPages}) => {
    const handlePrev= ()=>{
       
          if (currentPage!==1){
            setPage((prevPage)=>prevPage-1)
          }
    }
    const handleNext= ()=>{
        
        if(currentPage!==totalPages){
            setPage((prevPage)=>prevPage+1)
        }
    }
    if (totalPages===0) return null;
    const theme=useTheme();
  return (
    <div className={"container"}>
      <Button  onClick={handlePrev} sx={{margin:"30px 2px",borderRadius:"15px"}} variant="contained" color="primary" type='button'>Prev</Button>
      <Typography variant='h4' className='pageNumber' sx={theme.palette.text.primary}>{currentPage}</Typography>
      <Button onClick={handleNext} sx={{margin:"30px 2px",borderRadius:"15px"}} variant="contained" color="primary" type='button'>Next</Button>
    </div>
  )
}

export default Pagination
