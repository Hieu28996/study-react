import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "components/Button";
import Input from "components/Input";
import { loginUser } from "redux/apiRequest";

export interface LoginUser {
  username?: string;
  password?: string;
};

export interface UserState {
  auth: {
    login: {
      currentUser:{
        username: string,
        password: string
      },
      isFetching: boolean,
      error: boolean,
    },
  },
}

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMess, setErrorMess] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state: UserState) => state.auth.login.error);
  const loading = useSelector((state: UserState) => state.auth.login.isFetching);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const user: LoginUser = {
      username: username,
      password: password
    };

    if(username && !password) {
      setErrorMess("Please enter password");
    } else if (!username && password) {
      setErrorMess("Please enter username");
    } else if (!username && !password) {
      setErrorMess("Please enter information");
    } else {
      loginUser(user, dispatch, navigate);
      error ? setErrorMess("Incorrect account or password") : setErrorMess("")
    }
  }

  return(
    <div className="login">
      <form
        onSubmit={handleSubmit}
      >
        <legend>Login Form</legend>
        <Input
          name="username"
          placeholder="User name"
          defaultValue={username}
          onChange={e => {
            setUsername(e.target.value);
            !e.target.value && setErrorMess("");
          }}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          defaultValue={password}
          onChange={e => {
            setPassword(e.target.value);
            !e.target.value && setErrorMess("");
          }}
        />
        {errorMess &&
          <p className="form_error">{errorMess}</p>
        }
        <div className="btn_wrap">
          <Button
            isFullWidth
            className="btn_primary"
            type="submit"
          >
            Login
          </Button>
          <Button
            isFullWidth
          >
            Register
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Login;