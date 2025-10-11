import styled from '@emotion/styled';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Button } from 'antd';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Home</h1>
      <Content>
        <Button onClick={() => navigate({ to: '/about' })}>About</Button>
        <Button onClick={() => navigate({ to: '/post' })}>Lazy Post</Button>
      </Content>
    </>
  );
}

const Content = styled.div`
  display: flex;
`;
