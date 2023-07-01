import { React } from 'react'
import { connect } from 'react-redux';
import ChatAppBar from '../../components/appbar'

const Home = (props) => {
  return (
    <div>
      <ChatAppBar />
      Home Page;
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
