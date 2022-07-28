import Logo from "assets/images/logo.svg";
import Input from "components/Input";

const Header = () => {
  return (
    <header className="header">
      <h1 className="logo">
        <a
          href="/"
          className="logo_link"
        >
          {/* <Logo/> */}
        </a>
      </h1>
      <div className="search_form">
        <form>
          <fieldset>
            <legend>Search form</legend>
          </fieldset>
          <Input
            placeholder="Search"
          />
        </form>
      </div>
    </header>
  )
}

export default Header;
