import { useState } from "react";
import Button from "components/Button";
import Input from "components/Input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "redux/APIs/RegisterApiRequest";
import Loading from "components/Loading";

export interface SignUpUser {
	username?: string;
	password?: string;
	email?: string;
	roles?: Array<string>;
}

export interface RegisterState {
	register?: Array<string> | undefined;
	isFetching?: boolean;
	error?: boolean;
}

const Register = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isFetching = useSelector(
		(state: { register: RegisterState }) => state.register.isFetching
	);

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const SignUpUser = {
			username: username,
			password: password,
			email: email,
			roles: ["user"],
		};
		if (username && password && email) {
			registerUser(SignUpUser, dispatch, navigate);
		}
	};

	return (
		<div className="register">
			<form onSubmit={handleSubmit}>
				<fieldset>
					<legend>register</legend>
				</fieldset>
				<h2>Create a Account</h2>
				<Input
					name="username"
					placeholder="User name"
					defaultValue={username}
					onChange={(e) => {
						setUsername(e.target.value);
					}}
				/>
				<Input
					name="email"
					placeholder="username@gmail.com"
					defaultValue={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
				<Input
					type="password"
					name="password"
					placeholder="Password"
					defaultValue={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
				<div className="btn_wrap">
					<Button isFullWidth className="btn_primary" type="submit">
						Register
					</Button>
					<Button isFullWidth onClick={() => navigate("/")}>
						Login
					</Button>
				</div>
			</form>
			{isFetching && <Loading />}
		</div>
	);
};

export default Register;
