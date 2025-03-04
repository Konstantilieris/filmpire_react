import React from 'react'
import { useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web'
import { ColorModeContext } from '../utils/ToggleColorMode';
import { useContext } from 'react';
import { fetchToken } from '../utils';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectGenreOrCategory,searchMovie, genreOrCategory } from '../features/currentGenreOrCategory';

const useAlan = () => {
   const  navigate=useNavigate();
    const {setMode}=useContext(ColorModeContext)
    const dispatch=useDispatch();
    useEffect(() => {
        alanBtn({
            key: '1dbf03fe2f13252b6cfab6e250f7219e2e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: ({command,mode,genres,genreOrCategory,query}) => {
              if(command==='chooseGenre'){
                    const foundGenre=genres.find((g)=>g.name.toLowerCase()===genreOrCategory.toLowerCase())
                    if(foundGenre){
                        navigate('/');
                        dispatch(selectGenreOrCategory(foundGenre.id));
                    }else{
                        const category=genreOrCategory.startsWith('top')? 'top_rated': genreOrCategory;
                        navigate('/');
                        dispatch(selectGenreOrCategory(category))
                    }
              }
             else  if (command=== 'changeMode') {
                if(mode==='light'){
                    setMode('light')
                }else{
                     setMode('dark')
                }
              } else if (command==='login'){
                fetchToken();
              } else if(command==='logout'){
                localStorage.clear();
                window.location.href='/'; 
              } else if (command==='search'){
                dispatch(searchMovie(query));
              }
            }
        });
      }, []);
 
}

export default useAlan
