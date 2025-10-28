import { useEffect, useState } from "react";
import axios from "axios";
import { Button, message } from "antd";
import StudentTable from "@/components/students/StudentTable";
import StudentForm from "@/components/students/StudentForm";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const API_URL = "/api/students";

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      const studentsData = res.data?.body?.data || [];
      setStudents(studentsData);
    } catch (err) {
      console.error("Fetch error:", err);
      messageApi.error("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddStudent = async (values) => {
    const dataToSend = { ...values, class_name: values.class };
    delete dataToSend.class;

    try {
      const res = await axios.post(API_URL, dataToSend);
      const newStudent = res.data?.body?.data || dataToSend;

      messageApi.success("Successfully added student!");
      setStudents((prev) => [...prev, newStudent]);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Add error:", err);
      messageApi.error("Failed to add student");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      {contextHolder}
      <h1 style={{ fontSize: 34, fontWeight: "bold", marginBottom: 16, textAlign: "center" }}>
        Student List
      </h1>

      <Button type="primary" onClick={() => setIsModalOpen(true)} style={{ marginBottom: 16 }}>
        Add Student
      </Button>

      <StudentTable data={students} loading={loading} />
      <StudentForm
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={handleAddStudent}
      />
    </div>
  );
}
