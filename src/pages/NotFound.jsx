import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle={t("notFound.subtitle")}
      extra={
        <Button type="primary" onClick={() => navigate("/home-page")}>
          {t("notFound.back")}
        </Button>
      }
    />
  );
};

export default NotFound;
