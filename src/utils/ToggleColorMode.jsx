import React, { useState,createContext, useMemo } from 'react'
import { ThemeProvider} from '@emotion/react'
import { createTheme } from '@mui/material';
export const ColorModeContext =createContext();

const ToggleColorMode = ({children}) => {
    const [mode, setMode] = useState('light')
    const theme= useMemo(()=>createTheme({
        palette:{
            mode,
        },
    })

    ,[mode])
    const toggleColorMode= ()=>{
        setMode((prev)=>prev==='light'?'dark':'light')
    }
  return (
    <ColorModeContext.Provider value={{mode,setMode,toggleColorMode}}>
         <ThemeProvider theme={theme}>
           {children}
         </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default ToggleColorMode
