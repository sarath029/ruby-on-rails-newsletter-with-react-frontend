import React from 'react'
import './Navigation.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap'
import { Search } from 'react-bootstrap-icons';
import { connect } from 'react-redux'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { useHistory } from "react-router-dom";

const Navigation = (props) => {

    const history = useHistory();

    const goToTopics = () =>{
        history.push('/topics')
    }

    const Logout = () => {
        const url = '/logout';
        axios.post(url)
            .then(response => {

                console.log(response.data)

                if (response.data['status'] == 200) {
                    props.setIsAuthenticated(false);
                    console.log(props.isAuthenticated);
                } else {
                    alert.show(response.data['message'])
                }
            });
    }


    return (
        <Navbar bg="light" variant="light" className=" border-bottom border-info">
            <Navbar.Brand  onClick={goToTopics}>Avaamo Forum</Navbar.Brand>
            <Form inline className="ml-auto pr-5">
                <FormControl type="text" placeholder="Search Topic" className="mr-sm-2" />
                <Search className="ml-3" />
            </Form>
            <Nav>
                <Nav.Link className="pl-4" onClick={goToTopics}>Home</Nav.Link>

                <Nav.Link onClick={Logout}>Logout</Nav.Link>
            </Nav>
        </Navbar>
    )
}


const mapStateToProps = state => {
    return {
        isAuthenticated: state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setIsAuthenticated: () => {
            dispatch({ type: 'UNSET' });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navigation));