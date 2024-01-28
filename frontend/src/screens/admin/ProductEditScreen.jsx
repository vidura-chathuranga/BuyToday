import {
  useUpdateProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../slices/productApiSlice";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);

  const { data: product, isLoading, error } = useGetProductByIdQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage] = useUploadProductImageMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
    }
  }, [product]);

  const productUpdateHandler = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      productId,
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
    };

    try {
      await updateProduct(updatedProduct).unwrap();

      toast.success("Product Updated");
      navigate("/admin/productslist");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();

    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };
  return (
    <>
      <Link to={`/admin/productslist`} className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Products</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant={"danger"}>{error?.data?.message}</Message>
        ) : (
          <Form onSubmit={productUpdateHandler}>
            <Form.Group controlId="name" className="my-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                placeholder="Enter name"
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="price" className="my-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                placeholder="Enter price"
                value={price}
                type="number"
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="image" className="my-2">
              <Form.Label>Product image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image Url"
                value={image}
                onChange={(e) => setImage}
              />
              <Form.Control
                type="file"
                label="choose file"
                onChange={uploadFileHandler}
                accept="image/*"
              />
            </Form.Group>

            <Form.Group controlId="brand" className="my-2">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                placeholder="Enter brand"
                value={brand}
                type="text"
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="countInStock" className="my-2">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                placeholder="Enter count in stock"
                value={countInStock}
                type="number"
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="category" className="my-2">
              <Form.Label>Category</Form.Label>
              <Form.Control
                placeholder="Enter category"
                value={category}
                type="text"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="description" className="my-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                placeholder="Enter description"
                value={description}
                as="textarea"
                rows={3}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" className="my-2" type="submit">
              Update product
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
