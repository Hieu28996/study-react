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

	// useEffect(() => {
	// 	if (loginUser !== null) {
	// 		dispatch(getUser({ username: loginUser.username }));
	// 	}
	// }, [dispatch, loginUser]);

	return (
		<>
			<Header user={currentUser?.user || loginUser} />
			<div className="container">
				<Outlet />
			</div>
		</>
	);
};

export default LayoutPortal;
