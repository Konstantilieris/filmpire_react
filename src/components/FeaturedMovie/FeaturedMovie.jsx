import React from 'react'
import { Box,Typography,Card,CardContent,CardMedia } from '@mui/material'
import { Link } from 'react-router-dom'
import './FeaturedMovie.css'
const FeaturedMovie = ({movie}) => {
         console.log('movie',movie)
    if (!movie) return null;
 
    return (
     <Box component={Link} to={`/movie/${movie.id}`} className='featuredCardContainer'>
        <Card className='card' classes={{root:"cardRoot"}}>
          <CardMedia media='picture' title={movie.title} alt={movie.title} image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} className="cardMedia" />
            <Box padding="20px">
                   <CardContent className='cardContent' classes={{root:"cardContentRoot"}}>
                        <Typography variant='h5' gutterBottom>{movie.title}</Typography>
                        <Typography variant='body2' gutterBottom>{movie.overview}</Typography>
                   </CardContent>
            </Box>
        </Card>   
    </Box>
  )
}

export default FeaturedMovie
