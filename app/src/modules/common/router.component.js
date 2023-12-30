import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../../pages/auth/landing/landing_page'
import Home from '../../pages/home/index';
import NewRoom from '../../pages/createRoom/index';
import Invites from '../../pages/invites';
import Room from '../../pages/room'
import { setUserDetails } from '../../store/action';
import { connect } from 'react-redux';
import { getUserDetailsFromStorage } from '../../helpers/token-helper';

const AppRouter = (props) =>{
  if (!props?.expiry) {
    const details = getUserDetailsFromStorage();
    if (details) {
      if (details?.expiry && details?.expiry > Date.now()) {
        props.setUserDetails(details);
      }
    }
  }
  return(
    <Router>
      <Routes>
        { 
          (props?.expiry && props.expiry > Date.now()) ? 
            <>
              <Route exact path='/Room' element={<NewRoom />}></Route>
              <Route exact path='/' element={<Home />}></Route>
              <Route exact path='/Invites' element={<Invites />}></Route>
              <Route exact path='/rooms/connect' element={<Room />}></Route>
            </>
          :
          <>
            <Route path='/' element={<LandingPage />}></Route>
            <Route path='*' element={<LandingPage />}></Route>
          </>
        }
        </Routes>
    </Router>
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

const mapDispatchToProps = () => ({ setUserDetails });

export default connect(mapStateToProps, mapDispatchToProps())(AppRouter);