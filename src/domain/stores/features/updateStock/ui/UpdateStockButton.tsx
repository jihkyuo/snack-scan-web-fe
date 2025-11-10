import { UpdateStockModal } from './UpdateStockModal';
import { useState } from 'react';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

interface Props {
  storeId: number;
  productId: number;
  currentStock: number;
}

export const UpdateStockButton = ({
  storeId,
  productId,
  currentStock,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="link"
        icon={<EditOutlined />}
        onClick={() => setOpen(true)}
        size="small"
      >
        재고 수정
      </Button>
      <UpdateStockModal
        open={open}
        onClose={() => setOpen(false)}
        storeId={storeId}
        productId={productId}
        currentStock={currentStock}
      />
    </>
  );
};

