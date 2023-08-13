// Bootstrap Imports
import { Col, Container, Row } from "react-bootstrap";

// React Router Dom
import { Form, redirect } from "react-router-dom";

// Sass
import "../Sass/TodoListInputForm.scss";

// Toastify message
import { toast } from "react-toastify";

const TodoListInputForm = () => {
    return ( 
        <Container fluid className="todoListInputListContainer mt-3 align-items-center">
            <Row>
                <Col xs={12} sm={12} >
                    <Form method="post" action="/" className="d-flex align-items-center">
                        <p></p>
                        <input type="text" name="todo" id="" autoComplete="off" placeholder="Create a new todo..."/>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default TodoListInputForm;

// TodoListInputFormAction function
export const TodoListInputFormAction = async ({ request }) => {
    // get user input
    const data = await request.formData();

    // Get current time
    // const currentTime = new Date().toString();

    const dataSubmission = {
        todo: data.get("todo"),
        // time: currentTime
    }

    // frontend check (validation) 
    if(dataSubmission.todo.length < 5) {
        return toast.error("Text must exceed five characters.")
    } else {
        toast.success(`${dataSubmission.todo} added successfully`)
    }

    // post request to the API
    fetch("http://localhost:4000/todoList", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body : JSON.stringify(dataSubmission)
    }).then(() => {
        console.log("todo-list added")
    })

    // redirect user
    return redirect("/");
}