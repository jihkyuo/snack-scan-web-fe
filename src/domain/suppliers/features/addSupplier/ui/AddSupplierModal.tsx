import type { CreateSupplierRequestDto } from '@/domain/suppliers/entities/api/supplier.dto';
import { useAddSupplierMutation } from '@/domain/suppliers/features/addSupplier/hooks/useAddSupplierMutation';
import { Form, Input, message, Modal } from 'antd';
import { AxiosError } from 'axios';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AddSupplierModal = ({ open, onClose }: Props) => {
  const [form] = Form.useForm<CreateSupplierRequestDto>();
  const [messageApi, contextHolder] = message.useMessage();
  const { mutate } = useAddSupplierMutation();

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title="공급업체 추가"
      onOk={form.submit}
    >
      {contextHolder}
      <Form
        form={form}
        onFinish={(formValues) => {
          mutate(formValues, {
            onSuccess: () => {
              onClose();
              messageApi.success('공급업체 추가 성공');
            },
            onError: (error) => {
              if (!(error instanceof AxiosError)) return;
              console.error('add supplier error', error);
              messageApi.error(error.response?.data.message);
            },
          });
        }}
      >
        <Form.Item
          label="이름"
          name="name"
          rules={[{ required: true, message: '이름을 입력해주세요.' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="주소" name="address">
          <Input />
        </Form.Item>
        <Form.Item
          label="전화번호"
          name="phoneNumber"
          rules={[{ required: true, message: '전화번호를 입력해주세요.' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="이메일"
          name="email"
          rules={[{ required: true, message: '이메일을 입력해주세요.' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="웹사이트" name="website">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
