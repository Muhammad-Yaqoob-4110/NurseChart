// UserContext.js
import React, { createContext, Component } from 'react';

const UserContext = createContext();

class UserProvider extends Component {
    state = {
        userid: null,
    };

    setUserId = (userid) => {
        this.setState({ userid });
    };

    render() {
        return (
            <UserContext.Provider value={{ ...this.state, setUserId: this.setUserId }}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

export { UserContext, UserProvider };
