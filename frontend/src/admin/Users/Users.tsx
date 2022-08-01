import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "redux/APIs/AllUserApiRequest";

const Users = () => {
	const dispatch = useDispatch();
	const users = useSelector(
		(state: any) => state.allUser.allUserState.allUser.users
	);

	useEffect(() => {
		getAllUser(dispatch);
	}, [dispatch]);

	return (
		<div>
			<ul>
				{users.map((item: any, index: number) => {
					const obj = item;
					return (
						<li key={index}>
							{Object.keys(obj).map((item: any, index: number) => {
								if (item === "username" || item === "password") {
									return (
										<Fragment key={index}>
											<button type="button">
												<span>{item}</span>
												<span style={{ marginLeft: "20px" }}>{obj[item]}</span>
											</button>
										</Fragment>
									);
								}
							})}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Users;
