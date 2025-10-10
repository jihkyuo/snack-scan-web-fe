import { createLazyFileRoute } from '@tanstack/react-router';

/**
 * example
 * TODO: 삭제
 * */ 
export const Route = createLazyFileRoute('/about/me')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <h1>About Me Lazy</h1>
      <p>지연 로딩 about 페이지</p>
    </>
  );
}
