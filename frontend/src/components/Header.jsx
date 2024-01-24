import {
  Navbar,
  Nav,
  Container,
  Badge,
  NavDropdown,
  Dropdown,
} from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { removeCredentials } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  // calculate the total number of cart items
  const cartQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(removeCredentials());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to={"/"}>
            <Navbar.Brand>
              <img src={logo} alt="logo" width={"35px"} height={"35px"} />{" "}
              BuyToday
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse aria-controls="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to={"/cart"}>
                <Nav.Link>
                  <FaShoppingCart /> Cart{" "}
                  {cartItems.length > 0 && (
                    <Badge bg="success" style={{ marginLeft: "5px" }} pill>
                      {cartQty}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to={"/profile"}>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to={"/login"}>
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title={"Admin"} id="adminMenu">
                  <LinkContainer to={'/admin/productlist'}>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={'/admin/userlist'}>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={'/admin/orderlist'}>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
