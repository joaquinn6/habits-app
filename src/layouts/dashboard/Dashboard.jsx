import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Navbar from "./components/Navbar";
import FooterPropio from "@/components/Footer";
const { Header, Footer, Content } = Layout;
import userStore from "@/stores/user.store";
const DashboardLayout = () => {
  const { changeTestUser } = userStore();
  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("user") || sessionStorage.getItem("user")
    );
    if (user) changeTestUser(user.email);
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

export default DashboardLayout;
