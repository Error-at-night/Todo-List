// Bootstrap Imports
import { Container, Row, Col } from "react-bootstrap";

// Sass
import "../Sass/Layout.scss";

// images
import lightBackgroundImage from "../images/bg-desktop-light.jpg"
import darkBackgroundImage  from "../images/bg-desktop-dark.jpg";

// Components
import TodoListInputForm from "./TodoListInputForm";
import TodoListData from "./TodoListData";
import ThemeToggle from "./ThemeToggle";

// React Imports
import { createContext, useEffect, useState } from "react";

// ThemeContext
export const ThemeContext = createContext("dark");

const Layout = () => {
     // theme
     const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem('theme');
        return storedTheme ? JSON.parse(storedTheme) : 'dark';
    });
    
    useEffect(() => {
        localStorage.setItem("theme", JSON.stringify(theme))
    }, [theme])

    const className = "layoutContainer-" + theme;
    
    return ( 
        <ThemeContext.Provider value={{theme, setTheme}}>
            <Container fluid className={`${className} m-0 p-0`}>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        {theme === "dark" ? 
                            <img src={darkBackgroundImage} alt="background-img" className="img-fluid backgroundImage"/> :
                            <img src={lightBackgroundImage} alt="background-img" className="img-fluid backgroundImage"/>
                        }
                    </Col>
                </Row>
                <div className="div-container px-3">
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={12} className="mb-2 d-flex align-items-center justify-content-between">
                            <h1>TODO</h1>
                            <ThemeToggle/>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} className="mb-3">
                            <TodoListInputForm/>
                        </Col>
                        <Col>
                            <TodoListData/>
                        </Col>
                    </Row>
                </div>
            </Container>
        </ThemeContext.Provider>
    );
}
 
export default Layout;