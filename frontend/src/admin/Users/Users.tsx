import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "redux/APIs/UserApiRequest";

const Users = () => {
	const dispatch = useDispatch();
	const users = useSelector((state: any) => state.allUser?.users);

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
							{Object.keys(obj || {}).map((item: any, index: number) => {
								if (item === "username" || item === "password") {
									return (
										<button type="button" key={index}>
											<span>{item}</span>
											<span style={{ marginLeft: "20px" }}>{obj[item]}</span>
										</button>
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
