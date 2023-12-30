import { React, useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Autocomplete } from '@mui/material';
import ChatAppBar from '../../components/appbar'
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextComp from '../../components/textfield';
import ButtonComp from '../../components/button';
import axios from 'axios';
import { CREATE_ROOM, SEARCH_USER } from '../../utils/apis';
import axiosConfig from '../../utils/axios_config';
import { TextField } from '@mui/material';
import AlertComp from '../../components/alert';

async function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const NewRoom = (props) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState({ alert: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${SEARCH_USER}?data=${searchTerm}`, axiosConfig);
        setOptions(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [searchTerm]);

  const handleOnchange = (event, values) => {
    setUsers(values);
  };

  const createRoom = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const payload = {
      users: [...new Set(users)],
      name: data.get('name'),
      description: data.get('description'),
    }
    
    const file = data.get('room_image');
    if (file) {
      payload.room_image = await readFileAsBase64(file);
    }
    try {
      const response = await axios.post(CREATE_ROOM, payload, axiosConfig);
      const new_alert = { alert: 1, message: response.data.message ?? 'Success' };
      setAlert(new_alert)
      setTimeout(() => window.location = '/', 3000);
    } catch (err) {
      console.log(err);
      const new_alert = { alert: 1, message: err.response.data.message ?? 'Something went wrong' }
      setAlert(new_alert)
      setTimeout(() => window.location = '/', 3000);
    }
  }

  return (
    <div>
      <ChatAppBar />
      <Container fixed>
        <Box sx={{ bgcolor: '#F1F6F9', height: '60vh' , marginTop: '8vh', padding: '40px' }} component='Form' onSubmit= {createRoom}>
            <TextComp label='Room name' size='small' fullWidth name='name' margin='normal' />
            <TextComp label='Description' size='small' fullWidth name='description' margin='normal' />
            <TextComp label = '' size='small' fullWidth name='room_image' margin='normal' type='file' />
            <Autocomplete
              name = 'users'
              fullWidth
              size='small'
              loading
              multiple
              id="combo-box-demo"
              options={options}
              getOptionLabel={(option) => option.user_name}
              sx={{ marginTop: '10px' }}
              onChange={ handleOnchange }
              renderInput={(params) => <TextField 
                {...params} 
                onChange={(event) => { setSearchTerm(event.target.value) }} 
                label="Users" 
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading && <CircularProgress color="inherit" size={20} />}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
                />}
            />
            <br></br>
            <br></br>
            <ButtonComp type='Submit' theme= 'Dark' name='Submit' margin='normal' />
            { (alert.alert) ? <AlertComp type={alert.type} message={alert.message} /> : <></> }
        </Box>
      </Container>
    </div>
  )
}

const mapStateToProps = state => {
    return {
      loading: state.auth.loading,
      id: state.auth.id,
      user_name: state.auth.user_name,
      expiry: state.auth.expiry,
      photo: state.auth.photo
    };
};
  
export default connect(mapStateToProps)(NewRoom);
