import { useUpdateStockMutation } from '../hooks/useUpdateStockMutation';
import type { UpdateStockForm } from '@/domain/stores/entities/api/store.dto';
import { Form, InputNumber, message, Modal } from 'antd';
import { AxiosError } from 'axios';

interface Props {
  open: boolean;
  onClose: () => void;
  storeId: number;
  productId: number;
  currentStock: number;
}

export const UpdateStockModal = ({
  open,
  onClose,
  storeId,
  productId,
  currentStock,
}: Props) => {
  const [form] = Form.useForm<UpdateStockForm>();
  const [messageApi, contextHolder] = message.useMessage();
  const { mutate } = useUpdateStockMutation();

  const handleOk = () => {
    form.submit();
  };

  const handleFinish = (formValues: UpdateStockForm) => {
    mutate(
      { storeId, productId, body: formValues },
      {
        onSuccess: () => {
          onClose();
          form.resetFields();
          messageApi.success('재고 업데이트 성공');
        },
        onError: (error) => {
          if (!(error instanceof AxiosError)) return;
          console.error('update stock error', error);
          messageApi.error(
            error.response?.data.message || '재고 업데이트 실패'
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
        initialValues={{ currentStock }}
        layout="vertical"
      >
        <Form.Item
          label="현재 재고"
          name="currentStock"
          rules={[{ required: true, message: '현재 재고를 입력해주세요.' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

