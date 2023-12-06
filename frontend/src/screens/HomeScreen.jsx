import {Row,Col} from 'react-bootstrap';
import Products from '../components/Products';
import { useEffect,useState } from 'react';
import axios from 'axios';

const HomeScreen = () => {

//   store product details
  const [products, setProducts] = useState([]);
  
  useEffect(()=>{

    const fetchProducts = async() =>{
        const {data} = await axios.get('/api/products');

        // update use state
        setProducts(data);
    }

    fetchProducts();
  },[]);

  return (
    <>
        <h1>Latest Products</h1>

        <Row>
            {
                products.map((product)=>( 
                    <Col sm={12} md={6} lg={3} xl={3} key={product._id}>
                        <Products product={product}/>
                    </Col>
                ))
            }
        </Row>
    </>
  )
}

export default HomeScreen