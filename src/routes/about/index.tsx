import { createFileRoute } from '@tanstack/react-router';

/**
 * example
 * TODO: 삭제
 * */ 
export const Route = createFileRoute('/about/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <h1>About Index</h1>
      <p>일반 about 페이지</p>
    </>
  );
}
