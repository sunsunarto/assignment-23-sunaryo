import { Modal, Form, Input, Button } from "antd";

export default function StudentForm({ open, onCancel, onSubmit }) {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Modal title="Add New Student" open={open} onCancel={onCancel} footer={null}>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="NIS" name="nis" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Class" name="class" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Major" name="major" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
