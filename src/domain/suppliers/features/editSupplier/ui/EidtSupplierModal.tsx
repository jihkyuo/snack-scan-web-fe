import type {
  SupplierDto,
  UpdateSupplierRequestDto,
} from '@/domain/suppliers/entities/api/supplier.dto';
import { useEditSupplierMutation } from '@/domain/suppliers/features/editSupplier/hooks/useEditSupplierMutation';
import { Form, Input, message, Modal } from 'antd';
import { AxiosError } from 'axios';
import { useEffect, useMemo } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  supplierId: number;
  supplier: SupplierDto;
}

export const EditSupplierModal = ({
  open,
  onClose,
  supplierId,
  supplier,
}: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { mutate } = useEditSupplierMutation();

  const initialValues = useMemo(
    () => ({
      name: supplier.name,
      address: supplier.address,
      phoneNumber: supplier.phoneNumber,
      email: supplier.email,
      website: supplier.website,
    }),
    [supplier]
  );
  const [form] = Form.useForm<UpdateSupplierRequestDto>();

  // 모달이 열릴 때마다 최신 값으로 폼 필드 업데이트
  useEffect(() => {
    if (open) {
      form.setFieldsValue(initialValues);
    }
  }, [open, initialValues, form]);

  const handleOk = () => {
    form.submit();
  };

  const handleFinish = (formValues: UpdateSupplierRequestDto) => {
    // 변경된 값만 필터링
    const changedValues: UpdateSupplierRequestDto = {};

    (Object.keys(formValues) as Array<keyof UpdateSupplierRequestDto>).forEach(
      (key) => {
        if (formValues[key] !== initialValues[key]) {
          changedValues[key] = formValues[key];
        }
      }
    );

    // 변경된 값이 없으면 경고 메시지 표시
    if (Object.keys(changedValues).length === 0) {
      messageApi.warning('변경된 값이 없습니다');
      return;
    }

    mutate(
      { supplierId, body: changedValues },
      {
        onSuccess: () => {
          onClose();
          form.resetFields();
          messageApi.success('공급업체 업데이트 성공');
        },
        onError: (error) => {
          if (!(error instanceof AxiosError)) return;
          console.error('update supplier error', error);
          messageApi.error(
            error.response?.data.message || '공급업체 업데이트 실패'
          );
        },
      }
    );
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title="공급업체 수정"
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
        <Form.Item label="이름" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="주소" name="address">
          <Input />
        </Form.Item>

        <Form.Item label="전화번호" name="phoneNumber">
          <Input />
        </Form.Item>

        <Form.Item label="이메일" name="email">
          <Input />
        </Form.Item>

        <Form.Item label="웹사이트" name="website">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
