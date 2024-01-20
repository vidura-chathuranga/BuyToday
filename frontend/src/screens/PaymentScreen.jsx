import { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { shippingAddress } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!shippingAddress?.city) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));

    navigate("/placeorder");
  };
  
  
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <h1>Payment Method</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label as={"legend"}>Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              className="my-2"
              id="paypal"
              name="paymentMethod"
              label="Paypal"
              value={"Paypal"}
              checked={paymentMethod === "Paypal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <Form.Check
              type="radio"
              className="my-2"
              id="Sripe"
              name="paymentMethod"
              label="Sripe"
              value={"Sripe"}
              checked={paymentMethod === "Sripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <Form.Check
              type="radio"
              className="my-2"
              id="Payhere"
              name="paymentMethod"
              label="Payhere"
              value={"Payhere"}
              checked={paymentMethod === "Payhere"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Button variant="primary" type="submit">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
