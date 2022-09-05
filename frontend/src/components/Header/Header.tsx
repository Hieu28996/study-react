import classNames from "classnames";
import Input from "components/Input";
import { useSelector } from "react-redux";
import { ReactComponent as Logo } from "assets/images/logo/logo.svg";
import { ReactComponent as LogoText } from "assets/images/logo/logo_text.svg";
import { ReactComponent as IconArrow } from "assets/images/icon/ic_arrow.svg";
import { ReactComponent as IconClose } from "assets/images/icon/ic_close.svg";
import { ReactComponent as IconPopular } from "assets/images/icon/ic_popular.svg";
import { ReactComponent as IconPlus } from "assets/images/icon/ic_plus.svg";
import { ReactComponent as IconAvatar } from "assets/images/icon/ic_avatar.svg";
// import { ReactComponent as IconSearch } from "assets/images/icon/ic_search.svg";

const Header = () => {
	const History = ["javascript", "node", "reactjs"];
	const user = useSelector((state: any) => state.login.loginState.currentUser);

	return (
		<header className="header">
			<h1 className="logo">
				<a href="/" className="logo_link">
					<Logo width={32} height={32} />
					<LogoText width={57} height={18} />
				</a>
			</h1>
			<div className="gnb">
				<button type="button" className="btn_gnb is_toggle">
					Home
					<IconArrow
						className="ic_toggle"
						width={24}
						height={24}
						color="#000"
					/>
				</button>
			</div>
			<div className="search_form">
				<form>
					<fieldset>
						<legend>Search form</legend>
					</fieldset>
					<Input placeholder="Search Reddit" />
				</form>
				<div className="search_history">
					<ul className="history">
						{History?.map((item, index) => {
							return (
								<li key={index}>
									<button type="button" className="btn_history">
										r/{item}
									</button>
									<button type="button" className="btn_remove">
										<IconClose width={24} height={24} color="#000" />
									</button>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
			<div className="right_group">
				<ul className="controls">
					<li>
						<a className="controls_link" href="#none">
							<IconPopular width={24} height={24} color="#000" />
						</a>
					</li>
					<li>
						<a className="controls_link" href="#none">
							<IconPopular width={24} height={24} color="#000" />
						</a>
					</li>
				</ul>
				<ul className="controls">
					<li>
						<a className="controls_link" href="#none">
							<IconPopular width={24} height={24} color="#000" />
						</a>
					</li>
					<li>
						<a className="controls_link" href="#none">
							<IconPopular width={24} height={24} color="#000" />
						</a>
					</li>
					<li>
						<a className="controls_link" href="#none">
							<IconPlus width={24} height={24} color="#000" />
						</a>
					</li>
				</ul>
				<div className="account">
					<button type="button" className="account_toggle">
						<div className="account_avatar">
							{Object.keys(user.avatar).length ? (
								<img src={user.avatar} />
							) : (
								<IconAvatar width={24} height={24} color="#fff" />
							)}
							<span
								className={classNames(
									"account_status",
									user.status && `is_${user.status}`
								)}
							></span>
						</div>
						<div className="account_info">
							<span>{user.username}</span>
						</div>
						<IconArrow
							className="ic_toggle"
							width={24}
							height={24}
							color="#000"
						/>
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
