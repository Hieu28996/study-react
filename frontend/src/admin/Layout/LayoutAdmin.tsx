import { UserState } from "pages/Login/Login";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

export interface LayoutAdminProp {
	children: ReactNode;
}

const LayoutAdmin = (props: LayoutAdminProp) => {
	const { children } = props;
	const currentUser = useSelector(
		(state: UserState) => state.login.loginState.currentUser
	);

	return (
		<>
			<header className="header">
				<div className="header_ct">
					<h1 className="logo">
						<a href="#none" className="txt_logo">
							REDDIT ADMIN
						</a>
					</h1>
					<ul className="header_control">
						{currentUser.avatar && (
							<li className="avatar">
								<img
									src="https://scontent.fhan14-2.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=cp0_dst-png_p40x40&_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=1VCfoj_TtCEAX8vHit7&_nc_ht=scontent.fhan14-2.fna&oh=00_AT_loeXn7TwzItdFeQ_dAhIn5JCHUaduqEBDxrKVj7DH3g&oe=6309BFF8"
									alt=""
								/>
							</li>
						)}
						<li>{currentUser.username}</li>
						<li>
							<button type="button" className="btn_logout">
								Logout
							</button>
						</li>
					</ul>
				</div>
			</header>
			<nav className="sidebar">
				<ul className="lnb">
					<li className="on">
						<Link to="/admin/users" className="txt_heading">
							<i className="bi bi-columns-gap ico_desc"></i>
							<strong>User Management</strong>
							<i className="bi bi-chevron-down ico_arrow"></i>
						</Link>
						{/* <ul className="lnb_depth">
							<li className="item">
								<Link className="is_active">
									<span className="txt">All User</span>
								</Link>
							</li>
						</ul> */}
					</li>
					<li>
						<Link to="/" className="txt_heading">
							<i className="bi bi-gift ico_desc"></i>
							<strong>Post Management</strong>
							<i className="bi bi-chevron-down ico_arrow"></i>
						</Link>
						{/* <ul className="lnb_depth">
							<li className="item">
								<Link>
									<span className="txt">이벤트</span>
								</Link>
							</li>
						</ul> */}
					</li>
				</ul>
			</nav>
			<main className="main_wrap">
				{children}
			</main>
		</>
	);
};

export default LayoutAdmin;
