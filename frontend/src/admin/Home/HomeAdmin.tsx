import LayoutAdmin from "admin/Layout";
import { Outlet } from "react-router-dom";

const HomeAdmin = () => {
	return (
		<LayoutAdmin>
			<div className="main_ct">
				<div className="card">
					<Outlet />
				</div>
			</div>
		</LayoutAdmin>
	);
};

export default HomeAdmin;
