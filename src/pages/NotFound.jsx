import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Lo sentimos, la página que buscas no existe."
      extra={
        <Button type="primary" onClick={() => navigate("/home-page")}>
          Volver al inicio
        </Button>
      }
    />
  );
};

export default NotFound;
