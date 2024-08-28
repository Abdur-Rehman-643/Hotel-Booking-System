import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

export default function EditEmployee() {
  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Get employee ID from URL

  useEffect(() => {
    axios
      .get(`https://positive-shining-boat.glitch.me/api/getemployeebyid/${id}`)
      .then((response) => {
        const employee = response.data;
        setName(employee.Name);
        setCnic(employee.CNIC);
        setContact(employee.Contact);
        setEmail(employee.Email);
        setSalary(employee.Salary);
        setCurrentImage(employee.ImageURL);
      })
      .catch((error) => {
        console.error("There was an error fetching the employee data!", error);
        setAlertMessage("Failed to fetch employee data.");
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("CNIC", cnic);
    formData.append("Contact", contact);
    formData.append("Email", email);
    formData.append("Salary", salary);
    if (image) {
      formData.append("ImageURL", image);
    }

    try {
      await axios.put(
        `https://positive-shining-boat.glitch.me/api/updateemployeebyid/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setAlertMessage("Employee updated successfully!");
      navigate("/admin/manage-employees");
    } catch (error) {
      console.error(
        "There was an error updating the employee!",
        error.response ? error.response.data : error.message
      );
      setAlertMessage("Failed to update employee. Please try again.");
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
        <h3 className="text-center mb-4">Edit Employee</h3>
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
              {currentImage && (
                <img
                  src={`https://positive-shining-boat.glitch.me/images/${currentImage}`}
                  alt="Current"
                  style={{
                    width: "100px",
                    height: "100px",
                    marginBottom: "10px",
                  }}
                />
              )}
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
              />
            </Col>
          </Form.Group>

          <div className="text-center">
            <Button variant="primary" type="submit">
              Update Employee
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}
