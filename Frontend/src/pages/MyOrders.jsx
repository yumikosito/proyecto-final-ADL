import React from "react";
import MenuProfile from "../components/profile/MenuProfile";
import { Container, Row, Col } from "react-bootstrap";
import OrdersList from "../components/profile/OrdersList";
import { useEffect, useState, useContext } from "react";
import { getOrders } from "../mockOrders";
import { UserContext } from "../context/UserContext";
const MyOrders = () => {

  const [orders, setOrders] = useState([]);
  
  const {user}=useContext(UserContext)

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await getOrders();
      setOrders(orders);  
    }

    fetchOrders();
  }, []);
  
  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3001/api/mis-pedidos", {
  //         headers: { Authorization: `Bearer ${user.token}` }
  //       });
  //       setOrders(response.data);
  //       console.log(response.data)
  //     } catch (error) {
  //       console.log(error)
  //     }
      
  //   };
  //   fetchOrders();
  // }, [user.token]);

  return (
    <div>
      <MenuProfile />
      <Container className=" mx-auto">
        <Row className="m-3 d-flex justify-content-center">
          <Col>
            <h2 id='titleProfile' className="my-2">Pedidos anteriores</h2>
          </Col>
        </Row>
        <Row className="m-3 d-flex justify-content-center">
          <Col>
            {orders.map((order) => (
              <OrdersList key={order.id_compra} order={order} />
            ))} 
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MyOrders;
