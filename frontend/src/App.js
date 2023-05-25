
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from  "./pages/ProfilePage"
import ChatPage from "./pages/ChatPage"
import { HomePage } from "./pages/HomePage";
import {Route} from 'react-router-dom'
import {Auth} from '../src/context/AuthContext'
import { useContext, useEffect} from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NewsPage } from "./components/NewsPage";

function App() {

  
  const {curr_user, setCurr_user} = useContext(Auth)

  useEffect(() => {
      const data = window.localStorage.getItem('Socially_Current_User')
      if(data !== null) setCurr_user(JSON.parse(data))
      // eslint-disable-next-line
  }, [])
  
  return (
      <div className="App">
        <Route exact path='/' component={(curr_user && curr_user._id) ? HomePage : RegisterPage}></Route>
        <Route exact path='/login' component={LoginPage}></Route>
        <Route exact path='/profile' component={ProfilePage}></Route>
        <Route exact path='/chat' component={ChatPage}></Route>
        <Route exact path='/news' component={NewsPage}></Route>


        <ToastContainer />
      </div>
  );
}

export default App;
