import React, { useEffect, useState } from 'react'
import{Modal,Typography,Button,ButtonGroup,Grid,Box,CircularProgress,useMediaQuery,Rating, Divider} from "@mui/material"
import {Movie as MovieIcon,Theathers,Language,PlusOne,Favorite,FavoriteBorderOutlined,Remove,ArrowBack, Theaters} from '@mui/icons-material'
import {Link,useParams} from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import genreIcons from '../../assets/genres'
import { useGetListQuery, useGetMovieQuery } from '../../services/TMDB'
import { useTheme } from '@emotion/react'
import { useGetRecommendationsQuery } from '../../services/TMDB'
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import MovieList from '../MovieList/MovieList'
import { userSelector } from '../../features/auth'
import { createAsyncThunk } from '@reduxjs/toolkit'
const MovieInformation = () => {
  const {user}=useSelector(userSelector)
  const {id}=useParams();
  const [open,setOpen]=useState(false)
  const theme=useTheme();
  const dispatch= useDispatch();
  const [isMovieFavorited,setIsMovieFavorited]=useState(false)
  const [isMovieWatchlisted,setIsMovieWatchlisted]=useState(false)
  const {data,isFetching,error}= useGetMovieQuery(id)
  const {data:recommendations,isFetching:isRecommendationsFetching}=useGetRecommendationsQuery({list:'recommendations',movie_id:id});
  const {data:favoriteMovies} = useGetListQuery({listName:'favorite/movies',accountId:user.id,sessionId:localStorage.getItem('session_id'),page:1})
  const {data:watchlistMovies} = useGetListQuery({listName:'watchlist/movies',accountId:user.id,sessionId:localStorage.getItem('session_id'),page:1})

   useEffect(()=>{
       setIsMovieFavorited(!!favoriteMovies?.results?.find((movie)=>movie?.id===data?.id))
   }
   ,[favoriteMovies,data])
   useEffect(()=>{
    setIsMovieWatchlisted(!!watchlistMovies?.results?.find((movie)=>movie?.id===data?.id))
}
,[watchlistMovies,data])
  const addToFavorites= async ()=>{
       await axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`,
       {media_type:'movie',
       media_id:id, 
       favorite:!isMovieFavorited,
      });
      setIsMovieFavorited((prev)=>!prev);
  };
  const addToWatchlist= async()=>{
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`,
    {media_type:'movie',
    media_id:id, 
    watchlist:!isMovieWatchlisted,
   });
   setIsMovieWatchlisted((prev)=>!prev);
  };
  if ( isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems='center'> <CircularProgress size="8rem"/> </Box>
    )
  }
  if ( error) {
    return (
      <Box display="flex" justifyContent="center" alignItems='center'> <Link to="/">Something has gone wrong go back</Link> </Box>
    )
  }
  
  return (
  <Grid container sx={{display:'flex',justifyContent:"space-around",margin:'10px 0 !important',[theme.breakpoints.down('sm')]:{flexDirection:"column",flexWrap:"wrap"}}}>
    <Grid item sm={12} lg={4} style={{display:"flex",marginBottom:"30px"}} >
      <img  src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`} alt="image of the movie" 
      style={{borderRadius:"20px",boxShadow:"0.5em 1em 1em black"
      ,[theme.breakpoints.down('md')]:{margin:'0 auto',width:'50%',height:"50%"},[theme.breakpoints.down('sm')]:{margin:'0 auto',width:'100%',height:'350px',marginBottom:'30px'},
     }} />
    </Grid>
     <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>{data?.title } ({data?.release_date.split("-")[0]})</Typography>
        <Typography variant="h5" align="center" gutterBottom>{data?.title } {data?.tagline}</Typography>
        <Grid item sx={{display:'flex',justifyContent:"space-around",margin:'10px 0 !important',[theme.breakpoints.down('sm')]:{flexDirection:"column",flexWrap:"wrap"}}} >
             <Box display="flex" align="center">
                <Rating readOnly value={data?.vote_average / 2}/>
             <Typography variant="subtitle1" gutterBottom style={{marginLeft:"10px"}}>{data?.vote_average.toFixed(1)}/10</Typography> 
             </Box>
             <Typography variant='h6' align='center' gutterBottom >{data?.runtime} min | Language: 
             {data?.spoken_languages[0].name}</Typography>
             </Grid>
             <Grid item sx={{margin:"10px 0 !important",display:"flex",justifyContent:"space-around",flexWrap:'wrap'}}>
                 {data?.genres?.map((genre,i)=>(
                       <Link key={genre.name} to= '/' onClick={()=>dispatch(selectGenreOrCategory(genre.id))}
                       style={{display:"flex",justifyContent:"center",alignItems:"center",textDecoration:"none",
                        [theme.breakpoints.down('sm')]:{padding:"0.5rem 1rem",}}} >
                        <Typography color='textPrimary' variant="subtitle1" >{genre?.name}</Typography>
                       <img src={genreIcons[genre.name.toLowerCase()]} height={30} width={30} style={{filter:theme.palette.mode==="dark"&&'invert(1)',marginRight:"10px"}}/>
                     
                       </Link>
                 ))}
             </Grid>
            <Typography variant='h5' gutterBottom style={{marginTop:"10px"}}>
               Overview 
            </Typography>
            <Typography style={{marginBottom:"2em"}}>
              {data?.overview}
            </Typography>
            <Typography variant='h5' gutterBottom>Top Cast</Typography>
            <Grid item container spacing={2}>
               {data && data.credits?.cast?.map((character,i)=>(
                character.profile_path &&(
                  <Grid key={i} item xs={4} md={2} component={Link} to={`/actors/${character.id}`} style={{textDecoration:"none"}}>
                   <img src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`} alt={character.name} 
                   style={{width:'100%',maxWidth:"7em",height:"8em",objectFit:"cover",borderRadius:"10px"}}/>
                   <Typography color="textPrimary">{character?.name}</Typography>
                   <Typography color="textSecondary">{character?.character}</Typography>
                  </Grid>
                )
               )).slice(0,6)}
            </Grid>
            <Grid item container style={{marginTop:"2rem"}}>
              <div style={{display:"flex",justifyContent:"space-between",width:'100%',[theme.breakpoints.down('sm')]:{flexDirection:"column"}}}>
                <Grid item xs={12} sm={6} sx={{display:"flex",justifyContent:"space-between",width:'100%',[theme.breakpoints.down('sm')]:{flexDirection:"column"}}}>
                     <ButtonGroup size="medium" variant='outlined' style={{gap:'4px'}}>
                          <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language />}>Website</Button>
                          <Button target="_blank" rel="noopener noreferrer" 
                          href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>Imdb</Button>
                           <Button onClick={()=>setOpen(true)} href='#'endIcon={<Theaters />}>Trailer</Button>
                     </ButtonGroup>
                </Grid>
                <Grid item xs={12} sm={6} sx={{display:"flex",justifyContent:"space-between",width:'100%',[theme.breakpoints.down('sm')]:{flexDirection:"column"}}}>
                     <ButtonGroup size="medium" variant='outlined' style={{gap:'4px'}}>
                          <Button onClick={addToFavorites} endIcon={isMovieFavorited?<FavoriteBorderOutlined />: <Favorite/>}>
                           {isMovieFavorited?"Unfavorite":"Favorite"}</Button>
                           <Button onClick={addToWatchlist} endIcon={isMovieWatchlisted?<Remove />: <PlusOne/>}>
                           Watchlist</Button>
                           <Button endIcon={<ArrowBack/>} sx={{borderColor:"primary.main"}}>
                            <Typography component={Link} to="/" color="inherit" variant='subtitle' sx={{textDecoration:"none"}}>Back</Typography>
                           </Button>
                     </ButtonGroup>
                </Grid>
              </div>
            </Grid>
     </Grid>
           
            <Box   marginTop="5rem" width='100%'>
            <Typography variant='h3' gutterBottom align='center'>
              You  might also like
            </Typography>
              {recommendations?
              <MovieList movies={recommendations} numberOfMovies={12}/>:<Box>Sorry,nothing was found</Box>}
            </Box>
            <Modal closeAfterTransition open={open} onClose={()=> setOpen(false)} sx={{display:"flex",alignItems:"center",justifyContent:'center'}}>
               {data?.videos?.results?.length >0 ? (
                <iframe autoPlay title="Trailer" src={`https://www.youtube.com/embed/${data?.videos?.results[0]?.key}`} allow="autoplay"
                  style={{border:0,width:'50%',height:'50%',[theme.breakpoints.down('sm')]:{width:'90%',height:'90%'}}}
                />
               ):(<div>no video available</div>)}
            </Modal>
  </Grid>
  )
}

export default MovieInformation;
