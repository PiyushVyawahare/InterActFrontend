import { React, useEffect, useState } from 'react'
import ChatAppBar from '../../components/appbar'
import axios from 'axios'
import { GET_INVITES, ACCEPT_INVITE, REJECT_INVITE } from '../../utils/apis/index'
import axiosConfig from '../../utils/axios_config';
import { Card } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { CardMedia } from '@mui/material';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ButtonComp from '../../components/button';

const Invites = () => {
    const [invites, setInvites] = useState([]);
    const fetchData = async () => {
          try {
            const response = await axios.get(`${GET_INVITES}`, axiosConfig);
            setInvites(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };

    useEffect(() => {
        fetchData();
      }, []);

    const accept_invite = (invite_id) => {
      return async () => {
        try {
          await axios.post(`${ACCEPT_INVITE(invite_id)}`, {}, axiosConfig);
          fetchData();
          alert('Success');
        } catch (error) {
          alert('ERROR OCCURED');
          console.error('Error fetching data:', error);
        }
      }
    }

    const reject_invite = (invite_id) => {
      return async () => {
        try {
          await axios.post(`${REJECT_INVITE(invite_id)}`, {},axiosConfig);
          fetchData();
          alert('Success');
        } catch (error) {
          alert('ERROR OCCURED');
          console.error('Error fetching data:', error);
        }
      }
    }
  return (
    <div>
      <ChatAppBar />
      <Container fixed>
        <Box sx={{ marginTop: '8vh', padding: '40px' }}>
            {
                invites.map((invite) => {
                    return <Card variant="outlined">
                        <CardMedia
                        sx={{ height: 140 }}
                        image= {invite?.room_image || 'https://www.eirim.ie/eirim2017/wp-content/uploads/2016/09/dummy-profile-pic.jpg'}
                        title="green iguana"
                        />
                        <CardContent>
                          <h3>{invite.room_name}</h3>
                        </CardContent>
                        <CardContent>
                          <p>{invite.message}</p>
                        </CardContent>
                        <CardActions>
                            <ButtonComp name='Accept' theme='' onClick={accept_invite(invite.invitation_id)}/>
                            <ButtonComp name='Reject' theme='Dark' onClick={reject_invite(invite.invitation_id)} />
                        </CardActions>
                    </Card>
                })
            }
        </Box>
      </Container>
    </div>
  )
}

export default Invites;
