import React from 'react'
import { Typography,Grid,Grow,Tooltip,Rating } from '@mui/material'
import { Link } from 'react-router-dom'
import { useTheme } from '@emotion/react'
import './MoviePoster.css'

const Movie = ({movie,i}) => {
    const theme=useTheme();
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} sx={{padding:"10px"}}>
       
         <Grow in key={i} timeout={(i+1)*250}>
         <Link to={`/movie/${movie.id}`} className='movie-link'
         style={{[theme.breakpoints.up("xs")]:{display:"flex",flexDirection:"column",},}}>
           <img  className='movie-poster' alt={movie.title} src={movie.poster_path?`https://image.tmdb.org/t/p/w500/${movie.poster_path}`:`https://fillmurray.com/200/300`}/> 
           <Typography variant='h5'
         sx={{color:theme.palette.text.primary,textOverflow:'ellipsis',width:"230px",whiteSpace:'nowrap',marginTop:"10px",marginBottom:"0px",textAlign:"center",overflow:"hidden"}}>
         {movie.title}</Typography>
         <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
         <div>
         <Rating readOnly value={movie.vote_average/2} precision={0.1} sx={{ml:"30px"}}/>
         </div>
         </Tooltip>
         
         </Link>
         </Grow>
       
    </Grid>
                )
  }
export default Movie
