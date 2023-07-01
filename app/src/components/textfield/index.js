import React from 'react'
import { TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function TextComp(props) {

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
    const currentTheme = (props.theme) ? props.theme === 'Dark' ? DarkTheme : lightTheme : '';
  return (
    <ThemeProvider theme = {currentTheme}>
        <TextField 
            id="outlined-basic" 
            label= {props.label ?? 'Label'} 
            variant="outlined" 
            onChange={props.onChange} 
            required = {props.required ?? 0}
            type={props.type ?? ''}
            fullWidth = {props.fullWidth ?? 0}
            size = {props.size ?? 'medium'}
            margin = {props.margin ?? 'none'}
        />
        
    </ThemeProvider>
  )
}

export default TextComp;
