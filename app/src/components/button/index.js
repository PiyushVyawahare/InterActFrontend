import React from 'react'
import { Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function ButtonComp(props) {

    const lightTheme = createTheme({
        palette: {
          primary: {
            main: '#F1F6F9',
          },
          secondary: {
            main: '#212A3E',
          },
          text: {
            primary: '#212A3E',
            secondary: '#000000',
          }
        },
        typography: {
          fontFamily: 'TT hoves',
          fontSize: 14,
          body1: {
            color: 'black',
          },
        },
    }); 

    const DarkTheme = createTheme({
        palette: {
          primary: {
            main: '#212A3E',
          },
          secondary: {
            main: '#F1F6F9',
          },
          text: {
            primary: '#F1F6F9',
            secondary: '#F1F6F9',
          }
        },
        typography: {
          fontFamily: 'TT hoves',
          fontSize: 14,
          body1: {
            color: 'black',
          },
        },
    }); 
  return (
    <ThemeProvider theme = {props.theme === 'Dark' ? DarkTheme : lightTheme}><Button variant= {props.varient ?? "contained"} onClick={props?.onClick} type={props?.type ?? 'Button'} >{props.name}</Button></ThemeProvider>
  )
}

export default ButtonComp;
