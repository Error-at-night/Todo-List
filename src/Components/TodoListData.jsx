// Bootstrap Imports
import { Container, Row, Col } from "react-bootstrap";

// React Router Imports
import { useLoaderData } from "react-router-dom";

const TodoListData = () => {

    const data = useLoaderData();

    return ( 
        <Container>
            <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                    {data && data.map(todoList => (
                        <p key={todoList.id} style={{color: "white"}}>{todoList.todo}</p>
                    ))}
                </Col>
            </Row>
        </Container>
    );
}
 
export default TodoListData;

// TodoListDataLoader
export const TodoListDataLoader = async () => {
    const response = await fetch("http://localhost:4000/todoList")

    return response.json()
}