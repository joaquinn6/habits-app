import { useEffect } from "react";
import userStore from "../store/user.store";

const Home = () => {
  const { create, loading, error, createUser } = userStore();
  useEffect(() => {
    createUser({
      "email": "test@gogoler.com",
      "first_name": "string",
      "last_name": "",
      "birth_date": "2025-02-23T01:19:26.636Z",
      "password": "123qwe"
    });
  }, []);
  return (
    <div>
      <h1>Inicio</h1>
      <p>Bienvenido a la página de inicio.</p>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error.error}</p>}
      <ul>
        {create}
      </ul>
    </div>
  );
};

export default Home;