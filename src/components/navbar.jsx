import React, { Component } from 'react';

class Navbar extends Component {
    render() {
        return (
            <div className="w-full lg:p-4 text-center text-xl font-bold navbar-text-color text-[#504F50FF] bg-white">
                {this.props.text}
            </div>
        );
    }
}

export default Navbar;
