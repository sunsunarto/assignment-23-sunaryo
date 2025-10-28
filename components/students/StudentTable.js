import { Table } from "antd";

export default function StudentTable({ data, loading }) {
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "NIS", dataIndex: "nis", key: "nis" },
    { title: "Class", dataIndex: "class_name", key: "class_name" },
    { title: "Major", dataIndex: "major", key: "major" },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey={(record) => record.id || record.nis}
      bordered
    />
  );
}
