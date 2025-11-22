import { createFileRoute } from '@tanstack/react-router';
import z from 'zod';

export const Route = createFileRoute('/suppliers/$supplierId')({
  component: RouteComponent,
  params: {
    parse: (params) => ({
      supplierId: z.coerce.number().parse(params.supplierId),
    }),
    stringify: ({ supplierId }) => ({ supplierId: `${supplierId}` }),
  },
});

function RouteComponent() {
  return <div>Hello "/suppliers/$supplierId"!</div>;
}
