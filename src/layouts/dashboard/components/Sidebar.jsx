import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside style={{ width: "200px", background: "#eee", padding: "20px" }}>
      <h3>Menú</h3>
      <ul>
        <li>
          <Link to="/home-page">Inicio</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
