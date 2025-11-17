import { AddStoreSalesModal } from '@/domain/sales/features/addStoreSales/ui/AddStoreSalesModal';
import { Button } from 'antd';
import { useState } from 'react';

export const AddStoreSalesButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        추가
      </Button>
      <AddStoreSalesModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};
