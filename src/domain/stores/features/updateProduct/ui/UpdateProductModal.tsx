import type {
  StoreProductDto,
  UpdateStoreProductRequestDto,
} from '@/domain/stores/entities/api/store.dto';
import { useUpdateProductMutation } from '@/domain/stores/features/updateProduct/hooks/useUpdateProductMutation';
import { Form, InputNumber, message, Modal } from 'antd';
import { AxiosError } from 'axios';
import { useMemo } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  storeId: number;
  storeProductId: number;
  storeProduct: StoreProductDto;
}

export const UpdateProductModal = ({
  open,
  onClose,
  storeId,
  storeProductId,
  storeProduct,
}: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { mutate } = useUpdateProductMutation();

  const initialValues = useMemo(
    () => ({
      currentStock: storeProduct.currentStock,
      minStock: storeProduct.minStock,
      storePrice: storeProduct.storePrice,
      supplementStock: storeProduct.supplementStock,
    }),
    [storeProduct]
  );
  const [form] = Form.useForm<UpdateStoreProductRequestDto>();

  const handleOk = () => {
    form.submit();
  };

  const handleFinish = (formValues: UpdateStoreProductRequestDto) => {
    // 변경된 값만 필터링
    const changedValues: UpdateStoreProductRequestDto = {};

    (
      Object.keys(formValues) as Array<keyof UpdateStoreProductRequestDto>
    ).forEach((key) => {
      if (formValues[key] !== initialValues[key]) {
        changedValues[key] = formValues[key];
      }
    });

    // 변경된 값이 없으면 경고 메시지 표시
    if (Object.keys(changedValues).length === 0) {
      messageApi.warning('변경된 값이 없습니다');
      return;
    }

    mutate(
      { storeProductId, storeId, body: changedValues },
      {
        onSuccess: () => {
          onClose();
          form.resetFields();
          messageApi.success('상품 업데이트 성공');
        },
        onError: (error) => {
          if (!(error instanceof AxiosError)) return;
          console.error('update product error', error);
          messageApi.error(
            error.response?.data.message || '상품 업데이트 실패'
          );
        },
      }
    );
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title="재고 업데이트"
      onOk={handleOk}
      afterClose={() => form.resetFields()}
    >
      {contextHolder}
      <Form
        form={form}
        onFinish={handleFinish}
        initialValues={initialValues}
        layout="vertical"
      >
        <Form.Item label="현재 재고" name="currentStock">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="최소 재고" name="minStock">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="매장 가격" name="storePrice">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="추가 재고" name="supplementStock">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
