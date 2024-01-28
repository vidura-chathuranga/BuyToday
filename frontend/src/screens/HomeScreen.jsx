import { Row, Col, Button } from "react-bootstrap";
import Products from "../components/Products";
import { useGetProductsQuery } from "../slices/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useParams, Link } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link className="btn btn-light mb-4" to={"/"}>
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <>
          <Meta />
          <h1>Latest Products</h1>

          <Row>
            {data.products.map((product) => (
              <Col sm={12} md={6} lg={3} xl={3} key={product._id}>
                <Products product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
