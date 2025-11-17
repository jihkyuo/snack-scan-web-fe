import { UploadStoreSalesModal } from '@/domain/sales/features/uploadStoreSalesBulk/ui/UploadStoreSalesModal';
import { UploadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';

export const UploadStoreSalesBulkButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        icon={<UploadOutlined />}
        type="primary"
        onClick={() => setOpen(true)}
      >
        업로드
      </Button>
      <UploadStoreSalesModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};
