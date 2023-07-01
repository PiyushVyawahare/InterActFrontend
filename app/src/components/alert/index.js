import React from 'react'
import { Alert } from '@mui/material';

function AlertComp(props) {
  return (
    <Alert severity={props.type}>{props.message}</Alert>
  )
}

export default AlertComp;
