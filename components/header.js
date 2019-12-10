import Link from "next/link";
import { logout } from "../utils/auth";

const Header = props => (
  <header>
    <nav>
      <ul>
        <li>
          <Link href="/home">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <a
            href={`http://dev.are.na/oauth/authorize?client_id=${process.env.APP_ID}&redirect_uri=${process.env.LOCAL_CALLBACK}&response_type=code`}
          >
            Login
          </a>
        </li>
        <li>
          <button onClick={logout}>Logout</button>
        </li>
      </ul>
    </nav>
    <style jsx>{`
      ul {
        display: flex;
        list-style: none;
        margin-left: 0;
        padding-left: 0;
      }

      li {
        margin-right: 1rem;
      }

      li:first-child {
        margin-left: auto;
      }

      a {
        color: #fff;
        text-decoration: none;
        border-bottom: 1px solid white;
      }

      header {
        padding: 20px;
        color: white;
        background: black;
        font-family: arial
      }
    `}</style>
  </header>
);

export default Header;
