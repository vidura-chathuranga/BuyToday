import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const SearchBox = () => {
  const { keyword: UrlKeyword } = useParams();

  const [keyword, setKeyword] = useState(UrlKeyword || "");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setKeyword('');
    } else {
      navigate("/");
      setKeyword('');
    }
  };
  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Control
        type="text"
        name="searchKeyword"
        placeholder="Search products"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        className="mr-sm-2 ml-sm-5 "
        size="sm"
      />
      <Button type="submit" variant="outline-success" className="p-2 mx-2 btn btn-sm">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
