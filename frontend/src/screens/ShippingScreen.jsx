import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";

const ShippingScreen = () => {
  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.city || '');
  const [country, setCountry] = useState(shippingAddress?.city || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));

    navigate("/payment");
  };
  return (
    <FormContainer>
      <h1>Shipping</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="adress" className="my-2">
          <Form.Label>Address</Form.Label>
          <Form.Control
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            placeholder="address"
            type="text"
          />
        </Form.Group>
        <Form.Group controlId="city" className="my-2">
          <Form.Label>City</Form.Label>
          <Form.Control
            value={city}
            onChange={(event) => setCity(event.target.value)}
            placeholder="city"
            type="text"
          />
        </Form.Group>
        <Form.Group controlId="adress" className="my-2">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            value={postalCode}
            onChange={(event) => setPostalCode(event.target.value)}
            placeholder="postal code"
            type="text"
          />
        </Form.Group>
        <Form.Group controlId="adress" className="my-2">
          <Form.Label>Country</Form.Label>
          <Form.Control
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            placeholder="Country"
            type="text"
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
