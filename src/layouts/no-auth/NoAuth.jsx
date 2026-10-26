import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Navbar from "./components/Navbar";
import FooterPropio from "@/components/Footer";
import awakeStore from "@/stores/awake.store";
import { useNotificationContext } from "@/context/NotificationContext";
const { Header, Footer, Content } = Layout;

const AuthLayout = () => {
  const { t } = useTranslation();
  const { error, wakeUp } = awakeStore();
  const { openNotification } = useNotificationContext();

  useEffect(() => {
    wakeUp();
  }, []);

  useEffect(() => {
    if (error) {
      openNotification(
        "error",
        t("awake.errorTitle"),
        t("awake.errorDescription")
      );
    }
  }, [error]);

  return (
    <Layout className="layout-container">
      <Header className="layout-header">
        <Navbar />
      </Header>
      <Content className="layout-content">
        <Outlet />
      </Content>
      <Footer>
        <FooterPropio />
      </Footer>
    </Layout>
  );
};

export default AuthLayout;
