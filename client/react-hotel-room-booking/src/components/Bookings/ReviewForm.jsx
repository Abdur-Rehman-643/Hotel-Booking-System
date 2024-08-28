import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export default function ReviewForm() {
  const { bookingid } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `https://positive-shining-boat.glitch.me/api/review/${bookingid}`,
        {
          rating,
          reviewText,
        }
      );
      navigate("/guest/my-bookings");
    } catch (error) {
      console.error("There was an error submitting your review:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="p-4 border rounded shadow"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Submit Review</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="rating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              as="select"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="0">Choose...</option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="reviewText" className="mt-3">
            <Form.Label>Review</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Submit Review
          </Button>
        </Form>
      </div>
    </div>
  );
}
