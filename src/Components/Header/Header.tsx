import "./Header.css";
import Logo from "../../../public/Logo.png";

export default function Header() {
  return (
    <header>
      <div className="header1">
        <img src={Logo} alt="Logo de l'application" />
        <h1 className="h1white">Currency</h1>
        <h1 className="h1gray">Advisor</h1>
      </div>
      <div className="header2">
        <h2>Choose your currency</h2>
      </div>
    </header>
  );
}
