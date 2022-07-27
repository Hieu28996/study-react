import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "pages/Login";
import Home from "pages/Home";

const App = () => {  
  axios.defaults.baseURL = process.env.REACT_APP_SERVER_REQUEST;

  return (
    <Router>
      <div className="wrap"> 
        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/login" element={ <Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
