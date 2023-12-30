import { React, useEffect, useState } from 'react'
import ChatAppBar from '../../components/appbar'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { GET_ROOM_DETAILS, GET_ROOM_MESSAGES } from '../../utils/apis';
import axiosConfig from '../../utils/axios_config/index'
import { Card, CardContent, CardMedia, TextField } from '@mui/material';
import { socket } from '../../utils/socketio';
import ButtonComp from '../../components/button';

const Room = () => {
  const location = useLocation();
  const [roomDetails, setRoomDetails] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const setNewMessageToState = (e) => { setNewMessage(e.target.value) };
  const fetchRoomDetails = async () => {
    try {
      const response = await axios.get(`${GET_ROOM_DETAILS(location.state.room_id)}`, axiosConfig);
      setRoomDetails(response.data);
    } catch (error) {
      console.error('Fetch Room Details', error);
    }
  }

  const fetchRoomMessage = async () => {
    try {
      const response = await axios.get(`${GET_ROOM_MESSAGES(location.state.room_id)}`, axiosConfig);
      setMessages(response.data.map(obj => obj.message));
    } catch (error) {
      console.error('Fetch Room Details', error);
    }
  }
  useEffect(() => {
    fetchRoomDetails();
    fetchRoomMessage();
    if (socket.connected) {
      socket.emit('joinRoom', {
        room_id: location.state.room_id,
      });
    }
    socket.on('newMessage', (obj) => {
      fetchRoomMessage();
    })
  }, []);

  const onMessageSend = async () => {
    if (socket.connected) {
      socket.emit('sendMessage', {
        message: newMessage,
        room_id: location.state.room_id,
      })
      fetchRoomMessage();
    }
  }
  return (
    <div>
      <ChatAppBar />
      <Card variant="outlined">
          <CardMedia
          sx={{ height: 140 }}
          image= {roomDetails?.room_image || 'https://www.eirim.ie/eirim2017/wp-content/uploads/2016/09/dummy-profile-pic.jpg'}
          title="green iguana"
          />
          <CardContent>
            <h3>{roomDetails?.name}</h3>
          </CardContent>
      </Card>
      <div>
          {
            messages.map(message => {
              return <h5>{message}</h5>;
            })
          }
      </div>
      <div>
        <TextField id='standard-basic' label='Enter Message' onChange={setNewMessageToState}/><br/>
        <ButtonComp onClick={onMessageSend} name='Send'/>
      </div>
    </div>
  )
}

export default Room;
