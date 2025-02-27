import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Navbar from "./components/Navbar";
import FooterPropio from "@/components/Footer";
const { Header, Footer, Content } = Layout;

const DashboardLayout = () => {
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
