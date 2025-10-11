import { RootLayout } from '@/shared/layout/RootLayout';
import { createRootRoute } from '@tanstack/react-router';
import * as React from 'react';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <RootLayout />
    </React.Fragment>
  );
}
