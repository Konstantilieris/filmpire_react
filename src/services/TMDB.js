import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const tmdbApiKey= process.env.REACT_APP_TMDB_KEY;

export const tmdbApi=createApi({
    reducerPath:'tmdbApi',
    baseQuery: fetchBaseQuery({baseUrl:'https://api.themoviedb.org/3'}),
    endpoints:(builder)=>({
        //*Get Genres
        getGenres:builder.query({
            query:()=> `/genre/movie/list?api_key=${tmdbApiKey}`
        }),
        //* Get Movies by [Type]
        getMovies:builder.query({
            query: ({genreIdOrCategoryName,page,searchQuery})=> {
                //* Get Movies by Search
                if(searchQuery){
                    return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`
                }
                if(genreIdOrCategoryName && typeof genreIdOrCategoryName==='string'){
                  //*Get Movies by Category
                  return `/movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`
                }
                if(genreIdOrCategoryName && typeof genreIdOrCategoryName==='number'){
                    //* Get Movies by Genre
                    return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`
                }
                //*Get Popular Movies
             return   `/movie/popular?page=${page}&api_key=${tmdbApiKey}`
        },
            
        }),
        //* Get Movie by Id
        getMovie: builder.query({
            query:(id)=>{
                return `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`
            }
        }),
        getList:builder.query({
              query:({listName,accountId,sessionId,page})=> `/account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`
        }),
        //*Get User Recommendations
        getRecommendations:builder.query({
            query:({movie_id,list})=> `/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`
                
        }),
        getActor :builder.query({
          query:(id)  => `/person/${id}?api_key=${tmdbApiKey}`
        }),
        getMoviesByActorId:builder.query({
            query:({id,page}) => `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`
        })
    }),
});

 export const {useGetMoviesQuery,useGetGenresQuery,useGetMovieQuery,useGetRecommendationsQuery,useGetActorQuery,useGetMoviesByActorIdQuery,useGetListQuery}=tmdbApi;
