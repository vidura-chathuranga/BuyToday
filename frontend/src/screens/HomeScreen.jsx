import { Row, Col } from "react-bootstrap";
import Products from "../components/Products";
import { useGetProductsQuery } from "../slices/productApiSlice";

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <h2>Loading....</h2>
      ) : error ? (
        <div>{error?.dat?.message || error?.error}</div>
      ) : (
        <>
          <h1>Latest Products</h1>

          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={3} xl={3} key={product._id}>
                <Products product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
