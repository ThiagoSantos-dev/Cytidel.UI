import AuthService from "../hooks/AuthService";
//navigation bar
export default function Navbar() {
  return (
    <nav className="nav">
      <a href="#" className="site-title">
        Cytidel
      </a>
      <ul>
        <li>
          <a href="/tasks" className="active">
            Tasks
          </a>
        </li>
        <li>
          <a href="/create">Create</a>
        </li>
        <li>
          <a href="/" onClick={() => AuthService.logout()}>
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
}
