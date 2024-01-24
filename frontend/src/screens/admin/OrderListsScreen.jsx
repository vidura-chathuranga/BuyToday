import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetAllOrdersQuery } from "../../slices/orderApiSlice";

const OrderListsScreen = () => {
  const { data: orders, error, isLoading } = useGetAllOrdersQuery();

  return (
    <>
      <h1>Orders</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>
                  {new Date(order.createdAt.split("T")[0]).toLocaleDateString()}
                </td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    new Date(order.paidAt.split("T")[0]).toLocaleDateString()
                  ) : (
                    <FaTimes color="red" />
                  )}
                </td>
                <td>
                  {" "}
                  {order.isDelivered ? (
                    new Date(
                      order.deliveredAt.split("T")[0]
                    ).toLocaleDateString()
                  ) : (
                    <FaTimes color="red" />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">Details</Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListsScreen;
