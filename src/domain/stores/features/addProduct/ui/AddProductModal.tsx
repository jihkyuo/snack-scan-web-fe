import { useAddStoreProductMutation } from '@/domain/stores/features/addProduct/hooks/useAddStoreProductMutation';
import type { AddStoreProductForm } from '@/domain/stores/features/addProduct/types/addStoreProductForm.types';
import { useParams } from '@tanstack/react-router';
import { Form, Input, InputNumber, message, Modal, Radio, Select } from 'antd';
import { AxiosError } from 'axios';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AddProductModal = ({ open, onClose }: Props) => {
  const { storeId } = useParams({ from: '/stores/$storeId' });
  const [form] = Form.useForm<AddStoreProductForm>();
  const typeValues = Form.useWatch('type', form);
  const [messageApi, contextHolder] = message.useMessage();
  const { mutate } = useAddStoreProductMutation();

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title="매장 상품 추가"
      onOk={form.submit}
    >
      {contextHolder}
      <Form
        form={form}
        onFinish={(formValues) => {
          mutate(
            { storeId, body: formValues },
            {
              onSuccess: () => {
                onClose();
                messageApi.success('상품 추가 성공');
              },
              onError: (error) => {
                if (!(error instanceof AxiosError)) return;
                console.error('add store product error', error);
                messageApi.error(error.response?.data.message);
              },
            }
          );
        }}
      >
        <Form.Item
          label="최소 재고"
          name="minStock"
          rules={[{ required: true, message: '최소 재고를 입력해주세요.' }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="현재 재고"
          name="currentStock"
          rules={[{ required: true, message: '현재 재고를 입력해주세요.' }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="매장 가격"
          name="storePrice"
          rules={[{ required: true, message: '매장 가격을 입력해주세요.' }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item name="type" initialValue="NEW_PRODUCT">
          <Radio.Group>
            <Radio value="NEW_PRODUCT">새 상품</Radio>
            <Radio value="EXISTING_PRODUCT">기존 상품</Radio>
          </Radio.Group>
        </Form.Item>

        {typeValues === 'EXISTING_PRODUCT' && (
          <Form.Item
            label="상품"
            name="productId"
            rules={[{ required: true, message: '상품을 선택해주세요.' }]}
          >
            <Select />
          </Form.Item>
        )}

        {typeValues === 'NEW_PRODUCT' && (
          <>
            <Form.Item
              label="상품 이름"
              name="productName"
              rules={[{ required: true, message: '상품 이름을 입력해주세요.' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="상품 브랜드"
              name="productBrand"
              rules={[
                { required: true, message: '상품 브랜드를 입력해주세요.' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="상품 가격"
              name="productPrice"
              rules={[{ required: true, message: '상품 가격을 입력해주세요.' }]}
            >
              <InputNumber />
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  );
};
