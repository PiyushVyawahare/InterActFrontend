import { React, useEffect, useState } from 'react'
import { connect } from 'react-redux';
import ChatAppBar from '../../components/appbar'
import { GET_ROOMS } from '../../utils/apis';
import axiosConfig from '../../utils/axios_config';
import axios from 'axios';
import { Box, Card, CardContent, CardMedia, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = (props) => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const fetchRooms = async () => {
    try {
      const roomsData = await axios.get(`${GET_ROOMS}`, axiosConfig);
      setRooms(roomsData.data);
    } catch (error) {
      console.error('Fetch Rooms', error);
    }
  }
  useEffect(() => {
    fetchRooms();
  }, []);

  const naviteToRoom = (room_id) => { return () => navigate(`/rooms/connect`, {state: { room_id }}) }
  return (
    <div>
      <ChatAppBar />
      <Container fixed>
        <Box sx={{ marginTop: '8vh', padding: '40px' }}>
            {
                rooms.map((room) => {
                    return <Card variant="outlined" onClick={naviteToRoom(room._id)} >
                        <CardMedia
                        sx={{ height: 140 }}
                        image= {room?.room_image || 'https://www.eirim.ie/eirim2017/wp-content/uploads/2016/09/dummy-profile-pic.jpg'}
                        title="green iguana"
                        />
                        <CardContent>
                          <h3>{room.name}</h3>
                        </CardContent>
                        <CardContent>
                          <p>{room.description}</p>
                        </CardContent>
                        <CardContent>
                          <p>{room.created_by}</p>
                          <p>{room.created_at}</p>
                        </CardContent>
                    </Card>
                })
            }
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
  
export default connect(mapStateToProps)(Home);
