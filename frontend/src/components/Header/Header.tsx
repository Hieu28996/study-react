import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import { useOnClickOutside } from "hooks";
import Input from "components/Input";
import { ReactComponent as Logo } from "assets/images/logo/logo.svg";
import { ReactComponent as LogoText } from "assets/images/logo/logo_text.svg";
import { ReactComponent as IconArrow } from "assets/images/icon/ic_arrow.svg";
import { ReactComponent as IconClose } from "assets/images/icon/ic_close.svg";
import { ReactComponent as IconPopular } from "assets/images/icon/ic_popular.svg";
import { ReactComponent as IconPlus } from "assets/images/icon/ic_plus.svg";
import { ReactComponent as IconAvatar } from "assets/images/icon/ic_avatar.svg";
import { logoutUser } from "redux/APIs/LoginApiRequest";

const Header = (props: any) => {
	const { user } = props;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [showAccountLayer, setShowAccountLayer] = useState(false);
	const accountRef = useRef(null);
	const History = ["javascript", "node", "react js"];

	useOnClickOutside(accountRef, () => {
		setShowAccountLayer(false);
		const accountLayer: HTMLElement | null =
			document.querySelector(".account_layer");
		if (accountLayer) {
			accountLayer.style.height = "0";
		}
	});

	const handleDropDown = () => {
		setShowAccountLayer(!showAccountLayer);
		const accountLayer: HTMLElement | null =
			document.querySelector(".account_layer");
		const accountControl = accountLayer?.querySelectorAll(".account_control");
		let heightLayer = 0;
		if (accountControl?.length) {
			accountControl.forEach((el) => {
				return (heightLayer = heightLayer + el.clientHeight);
			});
		}
		if (!showAccountLayer && accountLayer) {
			accountLayer.style.height = `${heightLayer}px`;
		} else if (showAccountLayer && accountLayer) {
			accountLayer.style.height = "0";
		}
	};

	const handleLogout = (e: React.BaseSyntheticEvent): void => {
		e.preventDefault();
		logoutUser(dispatch, navigate);
	};

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
				<div
					className={classNames("account", showAccountLayer && "is_extend")}
					ref={accountRef}
				>
					<button
						type="button"
						className="account_toggle"
						onClick={handleDropDown}
					>
						{user !== null && (
							<>
								<div className="account_avatar">
									{Object.keys(user.avatar).length ? (
										<img src={user.avatar} alt="" />
									) : (
										<IconAvatar width={24} height={24} color="#fff" />
									)}
									<span
										className={classNames(
											"status",
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
							</>
						)}
					</button>
					<div className="account_layer">
						<div className="account_control">
							<ul>
								<li>
									<a href="#none" className="account_btn">
										Profile
									</a>
								</li>
								<li>
									<a href="#none" className="account_btn">
										Create Avatar
									</a>
								</li>
								<li>
									<a href="#none" className="account_btn">
										User Setting
									</a>
								</li>
							</ul>
						</div>
						<div className="account_control">
							<a href="#none" className="account_btn" onClick={handleLogout}>
								Log Out
							</a>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
