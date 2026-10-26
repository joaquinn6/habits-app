import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Navbar from "./components/Navbar";
import FooterPropio from "@/components/Footer";
import awakeStore from "@/stores/awake.store";
const { Header, Footer, Content } = Layout;

const AuthLayout = () => {
  const { wakeUp } = awakeStore();

  useEffect(() => {
    wakeUp();
  }, []);

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
