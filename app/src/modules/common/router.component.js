import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../../pages/auth/landing/landing_page'
import Home from '../../pages/home/index';
import { setUserDetails } from '../../store/action';
import { connect } from 'react-redux';
import { getAccessToken, getUserDetailsFromStorage } from '../../helpers/token-helper';

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
            <Route path='/' element={<Home />}></Route>
          :
          <Route path='/' element={<LandingPage />}></Route>
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