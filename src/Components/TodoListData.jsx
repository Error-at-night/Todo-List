// Bootstrap Imports
import { Container, Row, Col } from "react-bootstrap";

// React Router Imports
import { useFetcher, NavLink, useLoaderData } from "react-router-dom";

// Sass
import "../Sass/TodoListData.scss";

// React Imports
import { useContext, useEffect, useState } from "react";

// Toastify Messages
import { toast } from "react-toastify";

// ThemeContext
import { ThemeContext } from "./Layout";

// React Beautiful-dnd Imports
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TodoListData = () => {
    // get the loader data
    const data = useLoaderData();

    // state to manage the loader data
    const [todoData, setTodoData] = useState(data);

    useEffect(() => {
        setTodoData(data);
    }, [data]);

    // State to manage filter
    const [filterTodo, setFilterTodo] = useState("all");

    // State to manage checked todos
    const [checkedTodos, setCheckedTodos] = useState([]);

    // Function to handle checkbox toggle
    const handleCheckboxToggle = (todoId) => {
        if (checkedTodos.includes(todoId)) {
            setCheckedTodos(checkedTodos.filter(id => id !== todoId));
        } else {
            setCheckedTodos([...checkedTodos, todoId]);
        }
    };

    // Functin to handle delete 
    const handleDelete = async (todoId) => {
        try {

            await fetch(`http://localhost:4000/todoList/${todoId}`, {
                method: "DELETE",
            });

            // Update the todoData state by filtering out the deleted todo
            setTodoData(todoData.filter(todoList => todoList.id !== todoId));
            setCheckedTodos(checkedTodos.filter(id => id !== todoId));
            
            // Show a success toast notification
            const todoToDelete = todoData.find(todoList => todoList.id === todoId);
            toast.success(`Deleted ${todoToDelete.todo} successfully`);
        } catch (error) {
            toast.error(error.message)
        }
    };

    // Function to handle clearing completed todos
    const handleClearCompleted = async () => {
        // Filter out completed todo IDs
        const completedTodoIds = checkedTodos.filter(id => checkedTodos.includes(id));

        if (completedTodoIds.length === 0) {
            toast.info("No completed todo to clear");
            return;
        }

        try {
            // Delete completed todos from the server
            await Promise.all(completedTodoIds.map(async todoId => {
                await fetch(`http://localhost:4000/todoList/${todoId}`, {
                    method: "DELETE",
                });
            }));

            // Update the todoData state
            setTodoData(prevTodoData => prevTodoData.filter(todo => !completedTodoIds.includes(todo.id)));
            
            // Clear the checkedTodos state
            setCheckedTodos([]);

            // Show a success toast notification
            toast.success(`Cleared ${completedTodoIds.length} completed todo`);
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Calculate the number of unchecked items
    const uncheckedItemCount = todoData.filter(todoList => !checkedTodos.includes(todoList.id)).length;

    // Fetcher
    const fetcher = useFetcher();

    // theme
    const { theme } = useContext(ThemeContext)
    const className = "todoListContainer-" + theme
    const checked = "checked-" + theme
    const buttomButtons = "bottomButtons-" + theme
    const container = "container-" + theme
    const dragAndDrop = "dragAndDrop-" + theme
    const mobileButtons = "mobileButtons-" + theme

    // function to handle drag and drop
    const handleDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
    
        const updatedTodoData = [...todoData];
        const [reorderedItem] = updatedTodoData.splice(result.source.index, 1);
        updatedTodoData.splice(result.destination.index, 0, reorderedItem);
    
        setTodoData(updatedTodoData);
    }    

    return ( 
        <DragDropContext onDragEnd={handleDragEnd}>
            <Container fluid className={`${container} mt-3 mb-4 p-0`}>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <Droppable droppableId="todoList" type="todo">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {todoData && todoData.map((todoList, index) => (
                                        (filterTodo === "all" || 
                                        (filterTodo === "active" && !checkedTodos.includes(todoList.id)) ||
                                        (filterTodo === "completed" && checkedTodos.includes(todoList.id))) &&
                                        <Draggable key={todoList.id} draggableId={todoList.id.toString()} index={index}>
                                            {(provided) => (
                                                <fetcher.Form key={todoList.id} 
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={`py-3 px-4 d-flex align-items-center ${className} 
                                                    justify-content-between ${checkedTodos.includes(todoList.id) ? 
                                                    `${checked}` : ""}`}
                                                >
                                                    <div className="d-flex align-items-center">
                                                        <input type="checkbox" name="" id={todoList.id} 
                                                            onChange={() => handleCheckboxToggle(todoList.id)}
                                                            checked={checkedTodos.includes(todoList.id)}
                                                        />
                                                        <label htmlFor={todoList.id}>{todoList.todo}</label>
                                                    </div>
                                                    <div>
                                                        <span onClick={() => handleDelete(todoList.id)}>X</span>
                                                    </div>
                                                </fetcher.Form>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        {todoData && todoData.length > 0 &&
                            <div className={`${buttomButtons} pt-3 pb-1 px-4 d-none d-sm-flex bottomButtons 
                                justify-content-between`}
                            >
                                <div>
                                    <p>{`${uncheckedItemCount} item left`}</p>
                                </div>
                                <div>
                                    <NavLink className="pe-3" onClick={() => setFilterTodo("all")}>All</NavLink>
                                    <NavLink className="px-3" onClick={() => setFilterTodo("active")}>Active</NavLink>
                                    <NavLink className="ps-3" onClick={() => setFilterTodo("completed")}>Completed</NavLink>
                                </div>
                                <div>
                                    <NavLink onClick={handleClearCompleted}>Clear Completed</NavLink>
                                </div>
                            </div>
                        }
                        {todoData && todoData.length > 0 && 
                            <div className={`${buttomButtons} pt-3 pb-1 px-4 d-flex d-sm-none bottomButtons 
                                justify-content-between`}
                            >
                                <div>
                                    <p>{`${uncheckedItemCount} item left`}</p>
                                </div>
                                <div>
                                    <NavLink onClick={handleClearCompleted}>Clear Completed</NavLink>
                                </div>
                            </div>
                        }
                    </Col>
                </Row>
            </Container>
            {todoData && todoData.length > 0 &&
                <div className={`${mobileButtons} my-3 py-3 d-flex d-sm-none justify-content-center`}>
                    <NavLink className="pe-3" onClick={() => setFilterTodo("all")}>All</NavLink>
                    <NavLink className="px-3" onClick={() => setFilterTodo("active")}>Active</NavLink>
                    <NavLink className="ps-3" onClick={() => setFilterTodo("completed")}>Completed</NavLink>
                </div>
            }
            {todoData && todoData.length > 1 && 
                <p className={`${dragAndDrop} text-center`}>Drag and drop to reorder list</p>
            }
        </DragDropContext>
    );
}
 
export default TodoListData;

// TodoListDataLoader
export const TodoListDataLoader = async () => {
    const response = await fetch("http://localhost:4000/todoList")
    return response.json()
}