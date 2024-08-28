import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import AdminHeader from "../AdminHeader";

export default function ManageEmployees() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://positive-shining-boat.glitch.me/api/getemployee")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the employees!", error);
        setAlertMessage("Failed to fetch employee data.");
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(
        `https://positive-shining-boat.glitch.me/api/deleteemployeebyid/${id}`
      )
      .then(() => {
        setEmployees(
          employees.filter((employee) => employee.EmployeeID !== id)
        );
        setAlertMessage("Employee deleted successfully!");
      })
      .catch((error) => {
        console.error("There was an error deleting the employee!", error);
        setAlertMessage("Failed to delete employee.");
      });
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <AdminHeader />
      <Container style={{ marginTop: "3rem", padding: "1rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2>Manage Employees</h2>
          {alertMessage && <Alert variant="info">{alertMessage}</Alert>}
        </div>

        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Form.Control
            type="text"
            placeholder="Search by Name"
            style={{ width: "800px", margin: "0 auto" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Row>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <Col md={4} key={employee.EmployeeID} className="mb-4">
                <Card style={{ width: "18rem" }}>
                  {employee.ImageURL && (
                    <Card.Img
                      variant="top"
                      src={`https://positive-shining-boat.glitch.me/images/${employee.ImageURL}`}
                      alt={employee.Name}
                    />
                  )}
                  <Card.Body>
                    <Card.Title>{employee.Name}</Card.Title>
                    <Card.Text>
                      <strong>CNIC:</strong> {employee.CNIC} <br />
                      <strong>Contact:</strong> {employee.Contact} <br />
                      <strong>Email:</strong> {employee.Email} <br />
                      <strong>Salary:</strong> {employee.Salary}
                    </Card.Text>
                    <div className="d-flex justify-content-between">
                      <Button
                        variant="warning"
                        onClick={() =>
                          navigate(`/admin/editemployee/${employee.EmployeeID}`)
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(employee.EmployeeID)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col md={12} style={{ textAlign: "center", color: "#777" }}>
              <h4>No employees found</h4>
            </Col>
          )}
        </Row>

        <div className="text-center mt-4">
          <Button
            variant="primary"
            onClick={() => navigate("/admin/addemployee")}
          >
            Add Employee
          </Button>
        </div>
      </Container>
    </>
  );
}
