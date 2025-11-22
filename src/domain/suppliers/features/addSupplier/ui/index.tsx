import { AddSupplierModal } from '@/domain/suppliers/features/addSupplier/ui/AddSupplierModal';
import { Button } from 'antd';
import { useState } from 'react';

export const AddSupplierButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        추가
      </Button>
      <AddSupplierModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};
