import { AddStoreModal } from '@/domain/stores/features/addStore/ui/AddStoreModal';
import { Button } from 'antd';
import { useState } from 'react';

export const AddStoreButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        추가
      </Button>

      <AddStoreModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};
