import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';

import type { SupplierDto } from '@/domain/suppliers/entities/api/supplier.dto';
import { EditSupplierModal } from '@/domain/suppliers/features/editSupplier/ui/EidtSupplierModal';

interface Props {
  supplierId: number;
  supplier: SupplierDto;
}

export const EditSupplierButton = ({ supplierId, supplier }: Props) => {
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
      <EditSupplierModal
        open={open}
        onClose={() => setOpen(false)}
        supplierId={supplierId}
        supplier={supplier}
      />
    </>
  );
};
