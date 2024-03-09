// Navbar.js
import "./Navbar.css";
import ring from "./assets/ring.png";
import { Link, useParams } from "react-router-dom";

const Navbar = () => {
  const { userName } = useParams();

  return (
    <header>
      <nav>
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={ring} alt="ring" />
            <p style={{ fontSize: "23px" }}>NaziShop</p>
          </div>
        </Link>
        {!userName && (
          <Link
            to="/LogIn"
            style={{ textDecoration: "none", color: "black" }}
          >
            <p>შესვლა</p>
          </Link>
        )}

        <p>ტელ: 557662774</p>
      </nav>
    </header>
  );
};

export default Navbar;
