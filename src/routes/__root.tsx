import { Outlet, createRootRoute, useNavigate } from '@tanstack/react-router';
import * as React from 'react';
import { VdDesignProvider } from 'vd-component';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const navigate = useNavigate();
  return (
    <VdDesignProvider>
      <React.Fragment>
        <button onClick={() => navigate({ to: '/' })}>Home</button>

        <Outlet />
      </React.Fragment>
    </VdDesignProvider>
  );
}
