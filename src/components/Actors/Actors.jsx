import React,{useState} from "react";
import {Box,Button,CircularProgress,Grid,Typography} from '@mui/material'
import { useNavigate,useParams } from "react-router-dom";
import { ArrowBack,Movie as MovieIcon } from "@mui/icons-material";
 import { useGetActorQuery, useGetMoviesByActorIdQuery } from "../../services/TMDB";
import { useTheme } from "@emotion/react";
import MovieList from "../MovieList/MovieList";
import Pagination from "../Pagination/Pagination";
const Actors =() => {
 const {id}=useParams();
 const {data,isFetching,error}=useGetActorQuery(id)
 const navigate=useNavigate();
 const [page,setPage]=useState(1);
 const {data:movies,isFetching:isFetchingMovies}=useGetMoviesByActorIdQuery({id,page})

 if (isFetching){
   return (
    <Box display='flex' justifyContent='center'>
      <CircularProgress size='8rem'/>
    </Box>
   );
 }
 if (error) {
  return(
    <Box display='flex' justifyContent='center' alignContent='center'>
      <Button startIcon={<ArrowBack/>} onClick={()=>navigate(-1)}> Go Back</Button>
    </Box>
  )
 }
 return(
     <>
       <Grid container spacing={3}>
          <Grid item lg={5} xl={4}>
          <img  src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`} alt={data.name}
      style={{borderRadius:"20px",boxShadow:"0.5em 0.5em 1em purple",maxWidth:'90%',objectFit:"cover"}} />
          </Grid>
          <Grid item lg={7} xl={8} sx={{display:'flex',justifyContent:"center",flexDirection:"column"}}>
           <Typography variant="h2" gutterBottom>{data?.name}</Typography>
           <Typography variant="h5" gutterBottom>Born: {new Date(data?.birthday).toDateString()}</Typography>
           <Typography variant="body2" align="justify" paragraph>{data?.biography|| 'Sorry no biography yet'}</Typography>
           <Box mt='2rem' display='flex' justifyContent='space-around'>
               <Button variant="contained" color="primary" target="_blank" rel="noopener noreferrer"  href={`https://www.imdb.com/name/${data?.imdb_id}`}>
                 IMDB
               </Button>
               <Button startIcon={<ArrowBack />} onClick={()=>navigate(-1)}>
                 Back
               </Button>
           </Box>
          </Grid>
       </Grid>
       <Box margin='2rem 0'>
           <Typography variant="h2" gutterBottom align="center">Movies</Typography>
           {movies && <MovieList movies={movies} numberOfMovies={8}/>}
           <Pagination currentPage={page} setPage={setPage} totalPages={movies?.total_pages}/>
       </Box>
     </>
 );
};
export default Actors;