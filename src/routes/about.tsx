import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router';

/**
 * example
 * TODO: 삭제
 * */ 
export const Route = createFileRoute('/about')({
  component: AboutComponent,
});

function AboutComponent() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>About Page</h1>
      <p>This is the about page</p>
      <button onClick={() => navigate({ to: '/about' })}>About</button>
      <button onClick={() => navigate({ to: '/about/me' })}>About Me</button>
      <button
        onClick={() =>
          navigate({ to: '/about/$aboutId', params: { aboutId: 1 } })
        }
      >
        About 1
      </button>

      <Outlet />
    </div>
  );
}
