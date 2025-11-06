import { AddProductModal } from '@/domain/stores/features/addProduct/ui/AddProductModal';
import { Button } from 'antd';
import { useState } from 'react';

export const AddProductButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        추가
      </Button>

      <AddProductModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};
