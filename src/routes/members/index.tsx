import type { CreateMemberForm } from '@/domain/members/entities/api/member.dto';
import {
  createMemberApi,
  getMembersApi,
} from '@/domain/members/entities/api/member.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Button, Card, Form, Input, Modal, Table } from 'antd';
import { useState } from 'react';

export const Route = createFileRoute('/members/')({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const [form] = Form.useForm<CreateMemberForm>();
  const [open, setOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ['members'],
    queryFn: getMembersApi,
  });

  const { mutate } = useMutation({
    mutationFn: createMemberApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      setOpen(false);
      form.resetFields();
    },
  });

  const columns = [
    {
      title: '이름',
      dataIndex: 'name',
    },
    {
      title: '아이디',
      dataIndex: 'loginId',
    },
    {
      title: '전화번호',
      dataIndex: 'phoneNumber',
    },
  ];

  return (
    <>
      <Card
        title="유저 목록"
        extra={
          <Button type="primary" onClick={() => setOpen(true)}>
            추가
          </Button>
        }
      >
        <Table dataSource={data} columns={columns} />
      </Card>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        title="유저 추가"
        onOk={form.submit}
      >
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
            label="아이디"
            name="loginId"
            rules={[{ required: true, message: '아이디를 입력해주세요.' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="전화번호"
            name="phoneNumber"
            rules={[{ required: true, message: '전화번호를 입력해주세요.' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
