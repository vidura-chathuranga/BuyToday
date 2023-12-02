import {Row,Col} from 'react-bootstrap';
import products from '../products';
import Products from '../components/Products';

const HomeScreen = () => {
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