import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';
import { z } from 'zod';

/**
 * example
 * TODO: 삭제
 * */ 
export const Route = createFileRoute('/about/$aboutId')({
  component: RouteComponent,
  params: {
    parse: (params) => ({
      aboutId: z.number().int().parse(Number(params.aboutId)),
    }),
    stringify: ({ aboutId }) => ({ aboutId: `${aboutId}` }),
  },
  errorComponent: () => <div>About ID Error</div>,
});

const AboutDetailLazy = lazy(() =>
  import('@/domain/about/widgets/AboutDetailLazy').then((module) => ({
    default: module.AboutDetailLazy,
  }))
);

function RouteComponent() {
  const { aboutId } = Route.useParams();

  return (
    <>
      <h1>About ID {aboutId}</h1>
      <p>type: {typeof aboutId}</p>
      <p>일반 about 페이지</p>

      <Suspense fallback={<div>AboutDetailLazy Loading...</div>}>
        <AboutDetailLazy />
      </Suspense>
    </>
  );
}
