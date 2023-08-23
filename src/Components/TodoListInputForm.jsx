// Bootstrap Imports
import { Col, Container, Row } from "react-bootstrap";

// React Router Dom
import { redirect, useFetcher } from "react-router-dom";

// Sass
import "../Sass/TodoListInputForm.scss";

// Toastify message
import { toast } from "react-toastify";

// React imports
import { useContext, useEffect, useRef } from "react";

// ThemeContext
import { ThemeContext } from "./Layout";

const TodoListInputForm = () => {
    const fetcher = useFetcher();
    const onSubmit = fetcher.state === "submitting";

    const ref = useRef();

    useEffect(() => {
        if(!onSubmit) {
            ref.current.reset();
        }
    }, [onSubmit])

    // theme
    const { theme  } = useContext(ThemeContext)
    const className = "todoListInputListContainer-" + theme

    return ( 
        <Container fluid className={`${className} mt-3 align-items-center`}>
            <Row>
                <Col xs={12} sm={12}>
                    <fetcher.Form method="post" action="/" className="d-flex align-items-center" ref={ref}
                    >
                        <p></p>
                        <input type="text" name="todo" id="" autoComplete="off" placeholder="Create a new todo..."/>
                    </fetcher.Form>
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

    const dataSubmission = {
        todo: data.get("todo"),
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