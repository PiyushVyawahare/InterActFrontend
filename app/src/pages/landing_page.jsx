import { React } from 'react'
import ChatAppBar from '../components/appbar'
import { Box } from '@mui/material';
const LandingPage = () => {
  return(
    <>
    <ChatAppBar />
    <Box sx={{fontFamily: 'tt hoves'}}>HELLO WORLD</Box>
    <Box sx={{fontFamily: 'Arial'}}>HELLO WORLD</Box>
    </>
  )
}

export default LandingPage;