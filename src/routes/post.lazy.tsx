import { createLazyFileRoute } from '@tanstack/react-router';

/**
 * example
 * TODO: 삭제
 * */ 
export const Route = createLazyFileRoute('/post')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <h1>Lazy Post</h1>
      <p>이 페이지는 지연 로딩됩니다!</p>
    </>
  );
}
