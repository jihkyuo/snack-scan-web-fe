import { HomeOutlined, ShopOutlined, UserOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from '@tanstack/react-router';
import { Layout, Menu, theme } from 'antd';

export const RootLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Sider breakpoint="lg" collapsedWidth="0">
        <Menu
          onClick={(item) => navigate({ to: item.key })}
          items={[
            {
              label: '홈',
              key: '/',
              icon: <HomeOutlined />,
            },
            {
              label: '매장',
              key: 'stores',
              icon: <ShopOutlined />,
            },
            {
              label: '직원관리',
              key: 'members',
              icon: <UserOutlined />,
            },
          ]}
        />
      </Layout.Sider>
      <Layout>
        <Layout.Header style={{ backgroundColor: colorBgContainer }}>
          <div>Header</div>
        </Layout.Header>
        <Layout.Content style={{ margin: 24 }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              backgroundColor: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};
