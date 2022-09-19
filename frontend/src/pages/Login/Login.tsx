import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "components/Button";
import Input from "components/Input";
import Loading from "components/Loading";
import { loginUser } from "redux/APIs/LoginApiRequest";
import { loginSuccess } from "redux/Slice/LoginSlice";

export interface LoginUser {
	username?: string;
	password?: string;
}

export interface User {
	[x: string]: any;
	username?: string;
	password?: string;
}

export interface UserState {
	[x: string]: any;
	login: {
		currentUser: {
			avatar: string;
			username: string;
			password: string;
			communities: Array<{ name: string }>;
		};
		isFetching: boolean;
		error: boolean;
	};
}

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMess, setErrorMess] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const error = useSelector((state: UserState) => state.login.error);
	const loading = useSelector((state: UserState) => state.login.isFetching);
	const currentUser = useSelector(
		(state: UserState) => state.login.currentUser
	);

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();

		if (username && !password) {
			setErrorMess("Please enter password");
			return;
		} else if (!username && password) {
			setErrorMess("Please enter username");
			return;
		} else if (!username && !password) {
			setErrorMess("Please enter information");
			return;
		} else {
			const user: LoginUser = {
				username: username,
				password: password,
			};
			loginUser(user, dispatch, navigate);
			error ? setErrorMess("Incorrect account or password") : setErrorMess("");
		}
	};

	useEffect(() => {
		if (currentUser) {
			dispatch(loginSuccess);
			navigate("/main/home");
		}
	}, [dispatch]);

	useEffect(() => {
		error && setErrorMess("Incorrect account or password");
	}, [error]);

	return (
		<div className="login">
			<form onSubmit={handleSubmit}>
				<fieldset>
					<legend>Login Form</legend>
				</fieldset>
				<Input
					name="username"
					placeholder="User name"
					defaultValue={username}
					onChange={(e) => {
						setUsername(e.target.value);
						!e.target.value && setErrorMess("");
					}}
				/>
				<Input
					type="password"
					name="password"
					placeholder="Password"
					defaultValue={password}
					onChange={(e) => {
						setPassword(e.target.value);
						!e.target.value && setErrorMess("");
					}}
				/>
				{errorMess && <p className="form_error">{errorMess}</p>}
				<div className="btn_wrap">
					<Button isFullWidth className="btn_primary" type="submit">
						Login
					</Button>
					<Button isFullWidth onClick={() => navigate("/register")}>
						Register
					</Button>
				</div>
			</form>
			{loading && <Loading />}
		</div>
	);
};

export default Login;
