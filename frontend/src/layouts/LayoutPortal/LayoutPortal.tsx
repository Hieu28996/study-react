import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "components/Header";
import { UserState } from "pages/Login/Login";
import { getUser } from "redux/Slice/UserSlice";

const LayoutPortal = () => {
	const dispatch = useDispatch();
	const loginUser = useSelector((state: UserState) => state.login.currentUser);
	const currentUser = useSelector(
		(state: { allUser: { currentUser: UserState } }) =>
			state.allUser.currentUser
	);
	console.log(currentUser);

	useEffect(() => {
		dispatch(getUser({ username: loginUser.username }));
	}, [dispatch]);

	return (
		<>
			<Header user={currentUser.user} />
			<div className="container">
				<Outlet />
			</div>
		</>
	);
};

export default LayoutPortal;
