import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';

import type { StoreProductDto } from '@/domain/stores/entities/api/store.dto';
import { UpdateProductModal } from '@/domain/stores/features/updateProduct/ui/UpdateProductModal';

interface Props {
  storeProductId: number;
  storeId: number;
  storeProduct: StoreProductDto;
}

export const UpdateProductButton = ({
  storeId,
  storeProductId,
  storeProduct,
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
        수정
      </Button>
      <UpdateProductModal
        open={open}
        onClose={() => setOpen(false)}
        storeId={storeId}
        storeProductId={storeProductId}
        storeProduct={storeProduct}
      />
    </>
  );
};
