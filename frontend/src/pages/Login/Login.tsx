import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "components/Button";
import Input from "components/Input";
import { loginUser } from "redux/apiRequest";

export interface LoginUser {
  username?: string;
  password?: string;
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const user: LoginUser = {
      username: username,
      password: password
    };
    loginUser(user, dispatch, navigate);
  }

  return(
    <div className="login">
      <form onSubmit={handleSubmit}>
        <legend>Login Form</legend>
        <Input
          placeholder="User name"
          defaultValue={username}
          onChange={e => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          defaultValue={password}
          onChange={e => setPassword(e.target.value)}
        />
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