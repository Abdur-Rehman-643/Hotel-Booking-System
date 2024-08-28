import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminHeader from "../AdminHeader";

export default function GeneratedRevenue() {
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://positive-shining-boat.glitch.me/api/totalamount")
      .then((response) => {
        // Ensure totalRevenue is a number
        const revenue = parseFloat(response.data.totalAmount);
        setTotalRevenue(isNaN(revenue) ? 0 : revenue);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the revenue:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <AdminHeader />
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "80vh",
          padding: "0 1rem",
        }}
      >
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={12}>
            <Card
              className="shadow-sm rounded"
              style={{
                border: "none",
                backgroundColor: "#f8f9fa",
              }}
            >
              <Card.Body>
                <Card.Title
                  className="mb-4"
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#343a40",
                  }}
                >
                  Generated Revenue
                </Card.Title>
                <Card.Text
                  style={{
                    fontSize: "2rem",
                    fontWeight: "500",
                    color: "#495057",
                  }}
                >
                  {loading ? (
                    <span>Loading...</span>
                  ) : (
                    `PKR ${totalRevenue ? totalRevenue.toFixed(2) : "0.00"}`
                  )}
                </Card.Text>
                <Link
                  to="/admin/dashboard"
                  style={{
                    display: "inline-block",
                    marginTop: "1rem",
                    padding: "0.75rem 1.5rem",
                    fontSize: "1rem",
                    color: "#fff",
                    backgroundColor: "#007bff",
                    borderRadius: "0.25rem",
                    textAlign: "center",
                    textDecoration: "none",
                  }}
                >
                  Back to Dashboard
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
