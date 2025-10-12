import type { CreateStoreForm } from '@/domain/stores/entities/api/store.dto';
import { storeQueryKeys } from '@/domain/stores/entities/api/store.query';
import { createStoreApi } from '@/domain/stores/entities/api/store.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Input, Modal } from 'antd';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AddStoreModal = ({ open, onClose }: Props) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm<CreateStoreForm>();
  const { mutate } = useMutation({
    mutationFn: createStoreApi,
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({
        queryKey: storeQueryKeys.store.list().queryKey,
      });
    },
  });

  return (
    <Modal open={open} onCancel={onClose} title="매장 추가" onOk={form.submit}>
      <Form
        form={form}
        onFinish={(formValues) => {
          mutate(formValues);
        }}
      >
        <Form.Item
          label="이름"
          name="name"
          rules={[{ required: true, message: '이름을 입력해주세요.' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="주소"
          name="address"
          rules={[{ required: true, message: '주소를 입력해주세요.' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
