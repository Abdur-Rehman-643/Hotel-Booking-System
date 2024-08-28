import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

export default function AddEmployee() {
  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [image, setImage] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("CNIC", cnic);
    formData.append("Contact", contact);
    formData.append("Email", email);
    formData.append("Salary", salary);
    formData.append("ImageURL", image);

    try {
      await axios.post(
        "https://positive-shining-boat.glitch.me/api/addemployee",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setAlertMessage("Employee added successfully!");
      navigate("/admin/manage-employees");
    } catch (error) {
      console.error(
        "There was an error adding the employee!",
        error.response ? error.response.data : error.message
      );
      setAlertMessage("Failed to add employee. Please try again.");
    }
  };

  const containerStyle = {
    marginTop: "3rem",
    padding: "2rem",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    maxWidth: "600px",
    backgroundColor: "#f9f9f9",
  };

  return (
    <Container style={{ display: "flex", justifyContent: "center" }}>
      <div style={containerStyle}>
        <h3 className="text-center mb-4">Add Employee</h3>
        {alertMessage && <Alert variant="info">{alertMessage}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="formName">
            <Form.Label column sm="3">
              Name
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formCnic">
            <Form.Label column sm="3">
              CNIC
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formContact">
            <Form.Label column sm="3">
              Contact
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formEmail">
            <Form.Label column sm="3">
              Email
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formSalary">
            <Form.Label column sm="3">
              Salary
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="number"
                step="0.01"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formImage">
            <Form.Label column sm="3">
              Image
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
              />
            </Col>
          </Form.Group>

          <div className="text-center">
            <Button variant="primary" type="submit">
              Add Employee
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}
