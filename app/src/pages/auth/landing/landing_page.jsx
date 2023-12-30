import { React } from 'react'
import { useState } from 'react';
import ChatAppBar from '../../../components/appbar'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextComp from '../../../components/textfield';
import ButtonComp from '../../../components/button';
import { connect } from 'react-redux';
import { switchCurrentState, register_user, switchAlert, verifyOtp, loginUser } from '../store/action'
import { LOGIN, SIGN_UP } from '../store/actionTypes';
import AlertComp from "../../../components/alert/index";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#F1F6F9',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

const LandingPage = (props) => {
  const isLogin = props.isLogin;
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [profile, setProfile] = useState(null);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const controlState = (params) => { return  () => { props.switchCurrentState({ type: params }) } };
  
  const setUsernameToState = (e) => { setUsername(e.target.value) };
  const setPasswordToState = (e) => { setPassword(e.target.value) };
  const setOtpToState = (e) => { setOtp(e.target.value) };
  const setEmailToState = (e) => { setEmail(e.target.value) };
  const setProfileToState = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setProfile(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = () => {
    switch (isLogin) {
      case 'SignUp':
        props.register_user({
          email, 
          user_name: username, 
          password,
          profile_picture: profile,
        })
        break;
      case 'Otp':
        props.verifyOtp({
          email, 
          otp
        })
        break;
      case 'Login':
        props.loginUser({
          email,
          password
        })
        break;
      default:
        console.log('default');
    }
  }

  return(
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
           { (isLogin === 'SignUp') ? <TextComp value={username} required theme='' onChange={setUsernameToState} label='Username' type='' fullWidth size='small' margin='normal'/> : <></>}
           { (isLogin === 'Login' || isLogin === 'SignUp' || isLogin === 'Forgot') ? <TextComp  value={email} required theme='' onChange={setEmailToState} label='Email' type='email' fullWidth size='small' margin='normal'/> : <></>}
           { (isLogin === 'Login' || isLogin === 'SignUp' || isLogin === 'Reset') ? <TextComp value={password} required theme='' onChange={setPasswordToState} label='Password' type='password' fullWidth size='small' margin='normal'/> : <></>}
           { (isLogin === 'SignUp') ? <TextComp value={profile} theme='' onChange={setProfileToState} label='' type='file' fullWidth size='small' margin='normal'/> : <></>}
           { (isLogin === 'Login') ? <ButtonComp varient='text' theme='Dark' name='Not Registered? Sign Up!' onClick = {controlState(SIGN_UP)} /> : <></>}
           { (isLogin === 'SignUp') ? <ButtonComp varient='text' theme='Dark' name='Already Registered? Login!' onClick = {controlState(LOGIN)} /> : <></>}
           { (isLogin === 'Otp') ? <TextComp value={otp} required theme='' onChange={setOtpToState} label='Otp' type='' fullWidth size='small' margin='normal'/> : <></>}
           <br/>
           <br/>
           <ButtonComp theme='Dark' name='Submit' onClick={onSubmit}/>
           <br/>
            { (props.alert) ? <AlertComp type={props.type} message={props.message} /> : <></> }
        </Box>
      </Modal>
      <ChatAppBar onLoginClick={handleOpen} />
      wasegdhtsdfj
    </>
  )
}

const mapStateToProps = state => {
  return {
    isLogin: state.login.isLogin,
    alert: state.login.alert,
    type: state.login.type,
    message: state.login.message,
  };
};

const mapDispatchToProps = () => ({ switchCurrentState, register_user, switchAlert, verifyOtp, loginUser });


export default connect(mapStateToProps, mapDispatchToProps())(LandingPage);