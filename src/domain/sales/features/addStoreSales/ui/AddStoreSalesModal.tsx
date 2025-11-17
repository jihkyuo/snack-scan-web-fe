import type { AddStoreSalesRequestDto } from '@/domain/sales/entities/sales.dto';
import { useAddStoreSalesMutation } from '@/domain/sales/features/addStoreSales/hooks/useAddStoreSalesMutation';
import { useParams } from '@tanstack/react-router';
import { Form, Input, InputNumber, message, Modal } from 'antd';
import { AxiosError } from 'axios';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AddStoreSalesModal = ({ open, onClose }: Props) => {
  const { storeId } = useParams({ from: '/stores/$storeId' });
  const [form] = Form.useForm<AddStoreSalesRequestDto>();
  const [messageApi, contextHolder] = message.useMessage();
  const { mutate } = useAddStoreSalesMutation();
  const handleFinish = (formValues: AddStoreSalesRequestDto) => {
    mutate(
      { storeId, body: formValues },
      {
        onSuccess: () => {
          onClose();
          messageApi.success('매출 추가 성공');
        },
        onError: (error) => {
          if (!(error instanceof AxiosError)) return;
          console.error('add store sales error', error);
          messageApi.error(error.response?.data.message);
        },
      }
    );
  };

  return (
    <Modal open={open} onCancel={onClose} title="매출 추가" onOk={form.submit}>
      {contextHolder}
      <Form form={form} onFinish={handleFinish}>
        <Form.Item label="상품명" name="productName">
          <Input placeholder="상품명을 입력해주세요." />
        </Form.Item>
        <Form.Item label="수량" name="quantity">
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="단가" name="unitPrice">
          <InputNumber min={0} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
