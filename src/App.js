//going in between pages, guides what page to go to
import { BrowserRouter as Router, Route } from "react-router-dom";
//Toast npm i toastify -to display error messages
import { ToastContainer } from 'react-toastify';

import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    //Think of all this as your url.Be careful, with out the key word 'exact', the browser will render both pages since theres forward slash.
    <Router>
      <ToastContainer position="top-center" />
      <Nav className="Navbar"/>
      <>
        <Route exact path="/sign-up" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
      </>
    </Router>
  );
}

export default App;
