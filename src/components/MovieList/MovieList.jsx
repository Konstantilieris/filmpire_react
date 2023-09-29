import React from 'react'
import { Grid } from '@mui/material'
import { useTheme } from '@emotion/react'
import Movie from '../Movie/Movie'
const MovieList = ({movies}) => {
    const theme=useTheme();
  return (
    <Grid container sx={{display:'flex',flexWrap:"wrap",justifyContent:"space-between",overflow:"auto",[theme.breakpoints.down('sm')]:{justifyContent:'center',}}}> 
         {movies.results.map((movie,i)=>(
            <Movie key={i} movie={movie} i={i}/>
         ))}
      
    </Grid>

  )
}

export default MovieList
