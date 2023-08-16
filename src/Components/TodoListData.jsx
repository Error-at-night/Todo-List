// Bootstrap Imports
import { Container, Row, Col } from "react-bootstrap";

// React Router Imports
import { Form, NavLink, useLoaderData } from "react-router-dom";

// Sass
import "../Sass/TodoListData.scss";

const TodoListData = () => {

    const data = useLoaderData();

    return ( 
        <Container className="mt-3 mb-4 p-0">
            <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                    {data && data.map(todoList => (
                        <Form key={todoList.id} className="py-3 px-4 d-flex align-items-center todoListContainer 
                            justify-content-between"
                        >
                            <div className="d-flex align-items-center">
                                <input className="" type="checkbox" name="" id={todoList.id} />
                                <label className="" htmlFor={todoList.id}>{todoList.todo}</label>
                            </div>
                            <div>
                                <span>X</span>
                            </div>
                        </Form>
                    ))}
                    {data && data.length > 0 &&
                        <div className="pt-3 pb-1 px-4 d-flex bottomButtons justify-content-between">
                            <div>
                                <p>{`${data.length} items left`}</p>
                            </div>
                            <div>
                                <NavLink className="pe-3">All</NavLink>
                                <NavLink className="px-3">Active</NavLink>
                                <NavLink className="ps-3">Completed</NavLink>
                            </div>
                            <div>
                                <NavLink>Clear Completed</NavLink>
                            </div>
                        </div>
                    }
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