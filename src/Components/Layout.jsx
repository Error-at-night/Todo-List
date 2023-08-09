// Bootstrap Imports
import { Container, Row, Col } from "react-bootstrap";

// Sass
import "../Sass/Layout.scss";

// Heroicons
import SunIcon from "@heroicons/react/24/solid/SunIcon"

// images
import darkBackgroundImage  from "../images/bg-desktop-dark.jpg";

// Components
import TodoListLayout from "./TodoListLayout";

const Layout = () => {
    return ( 
        <Container fluid className="layoutContainer m-0 p-0">
            <Row>
                <Col xs={12} sm={12} md={12} lg={12} >
                    <img src={darkBackgroundImage} alt="background-img" className="img-fluid backgroundImage"/>
                </Col>
            </Row>
            <Row className="rowTwo">
                <Col xs={12} sm={12} md={12} lg={12} className="d-flex align-items-center justify-content-between">
                    <h1>TODO</h1>
                    <SunIcon width={35} height={35} className="sunIcon"/>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12}>
                    <TodoListLayout/>
                </Col>
            </Row>
        </Container>
    );
}
 
export default Layout;