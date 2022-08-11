import { Link } from "react-router-dom";
function Header() {
  return (
    <header className="header">
      <div className="header_logo">
        <Link to={`/`}>NETFELX</Link>
      </div>

      <nav>
        <ul>
          <li>NETFELX</li>
          <li>
            <span>NETFELX</span>
          </li>
          <li>
            <span>NETFELX</span>
          </li>
          <li>
            <span>NETFELX</span>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
