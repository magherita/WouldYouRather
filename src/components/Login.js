import React from "react";
import { connect } from "react-redux";
import {
    Card,
    Form,
    Button
} from "react-bootstrap";

import { handleSetAuthUser } from "../actions/authedUser";

class Login extends React.Component {
    state = {
        selectedUser: "none"
    };

    handleChange = (evt) => this.setState({ selectedUser: evt.target.value });

    handleSubmit = (evt) => {
        evt.preventDefault();

        const { selectedUser } = this.state;

        const { dispatch } = this.props;

        dispatch(handleSetAuthUser(selectedUser));
    };

    render() {
        const { users } = this.props;
        const { selectedUser } = this.state;

        return (
            <Card
                border="success"
                style={{ width: '18rem' }}
                className="m-5"
            >
                <Card.Header>
                    Welcome to <strong>Would You Rather...</strong>
                </Card.Header>
                <Card.Body>
                    <Form
                        onSubmit={this.handleSubmit}
                    >
                        <Form.Group className="mb-3">
                            <Form.Select
                                value={selectedUser}
                                onChange={this.handleChange}
                            >
                                <option
                                    key="none"
                                    value="none"
                                >
                                    Select a user to log in
                                </option>
                                {
                                    users
                                    &&
                                    Object.values(users).map((user) => (
                                        <option
                                            key={user.id}
                                            value={user.id}
                                        >
                                            {user.name}
                                        </option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Button
                                variant="success"
                                type="submit"
                                disabled={selectedUser === "none"}
                            >
                                Log in
                            </Button>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
};

const mapStateToProps = ({ users }) => {
    return {
        users
    };
}

export default connect(mapStateToProps)(Login);

