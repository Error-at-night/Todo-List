// Bootstrap Imports
import { Col, Container, Row } from "react-bootstrap";

// React Router Dom
import { Form } from "react-router-dom";

const TodoListLayout = () => {
    return ( 
        <Container className="">
            <Row>
                <Col>
                    <Form method="post" action="/">
                        <input type="text" name="" id="" />
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
 
export default TodoListLayout;