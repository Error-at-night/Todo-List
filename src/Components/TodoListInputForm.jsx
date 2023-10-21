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
    // Get user input
    const data = await request.formData();
    const todo = data.get("todo");

    // Frontend validation
    if (todo.length < 10) {
        return toast.error("Text must exceed 10 characters.");
    }

    const dataSubmission = {
        todo
    };

    try {
        // Post request to add the new todo
        const response = await fetch("http://localhost:4000/todoList", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataSubmission),
        });

        if (!response.ok) {
            throw new Error("Failed to add the todo");
        }

        // After successfully adding the todo, fetch the updated data
        const updatedDataResponse = await fetch("http://localhost:4000/todoList");

        if (!updatedDataResponse.ok) {
            throw new Error("Failed to fetch updated data");
        }

        const updatedData = await updatedDataResponse.json();

        console.log(updatedData)

        // Display a success message
        toast.success(`${todo} added successfully`);

        // Redirect user
        return redirect("/");

    } catch (error) {
        toast.error(error.message);
    }
}
