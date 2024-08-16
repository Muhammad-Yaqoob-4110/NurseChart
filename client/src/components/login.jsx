import React, { Component } from 'react';
import Joi from 'joi-browser'
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
    state = {
        user: {
            username: "",
            password: ""
        },
        errors: {
            username: "",
            password: ""
        },
        redirectToHome: false,
        isLoading: false,
    };
    schema = {
        username: Joi.string().required().label("User Name"),
        password: Joi.string().min(7).max(15).required().label("Password"),
    };

    validate = () => {
        const result = Joi.validate(this.state.user, this.schema, {
            abortEarly: false,
        });
        if (result.error !== null) {
            const errors = {};
            for (let index = 0; index < result.error.details.length; index++) {
                const message = result.error.details[index].message;
                const key = result.error.details[index].path;
                errors[key] = message;
            }
            return errors;
        } else {
            return null;
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate();
        if (errors !== null) {
            this.setState({ errors });
        } else {
            this.setState({ errors: {} });
            // console.log(this.props);
            // Navigate to home
            // this.setState({ redirectToHome: true });
            
            this.setState({ isLoading: true });

            axios.post('http://localhost:3850/api/users/login', {
                username: this.state.user.username,
                password: this.state.user.password
            })
            .then(response => {
                this.setState({ isLoading: false });
                if (response.status === 200) {
                    // console.log('Login successful:', response.data); 
                    // Navigate to home
                    this.setState({ redirectToHome: true });
                    // You can show a success message here
                }
            })
            .catch(error => {
                this.setState({ isLoading: false });
            
                if (error.response) {
                    // Error response from server (e.g., 404, 401, 500)
                    if (error.response.status === 404) {
                        // console.error('Error: User not found');
                        // alert('User not found');
                        const errors = {
                            username: "This user is not Registered",
                            password: ""
                        }
                        this.setState({errors});
                    } else if (error.response.status === 401) {
                        // console.error('Error: Invalid credentials');
                        // alert('Invalid credentials');
                        const errors = {
                            username: "",
                            password: "Invalid password."
                        }
                        this.setState({errors});
                    } else if (error.response.status === 500) {
                        console.error('Server error:', error.response.data.message);
                        alert('Internal server error');
                    } else {
                        console.error('Unhandled error:', error.response.data.message);
                        alert('An unexpected error occurred');
                    }
                } else if (error.request) {
                    // No response received from server
                    console.error('No response from server');
                    alert('No response from server');
                } else {
                    // Request setup or other client-side error
                    console.error('Error setting up request:', error.message);
                    alert('Error in request setup');
                }
            });
            
            

            
            
            // // Simulate an API call with a delay
            // setTimeout(() => {
            //     // Here you would typically make your API call.
            //     // After the call is done, stop loading
            //     this.setState({ isLoading: false });
            //     alert('Signed in successfully!'); // Simulate successful sign-in response
            // }, 2000); // Simulated delay of 2 seconds
        }
    };

    handleChange = (e) => {
        this.state.user[e.currentTarget.name] = e.currentTarget.value;
        console.log(e.currentTarget.value)
        const obj = { [e.currentTarget.name]: e.currentTarget.value };
        const sch = { [e.currentTarget.name]: this.schema[e.currentTarget.name] };
        const result = Joi.validate(obj, sch, { abortEarly: true });
        if (result.error !== null) {
            const message = result.error.details[0].message;
            const key = result.error.details[0].path;
            this.state.errors[key] = message;
        } else {
            this.state.errors[e.currentTarget.name] = "";
        }

        this.setState({ user: this.state.user });
    };
    render() {
        if (this.state.redirectToHome) {
            return <Navigate to="/home" />;
        }
        const { isLoading } = this.state;
        return (
            <div className='relative'>
                {isLoading && (
                    <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
                        <div className="flex items-center">
                            <span className="text-3xl mr-4"></span>
                            <svg className="animate-spin h-8 w-8 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                        </div>
                    </div>
                )}
                <div className='w-full h-full'>

                    <div className='flex justify-center items-center mt-8'>
                        <div className='lg:w-[632px] w-11/12 p-6 bg-white rounded-[7px]'>
                            <h4 className="p-4 text-center font-bold text-xl text-[#00817FFF]"> NurseChart</h4>

                            <form onSubmit={this.handleSubmit}>
                                <div className='flex flex-col gap-2'>
                                    <label className="relative block">
                                        <span className="sr-only">Username</span>
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                            <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
                                        </span>
                                        <input className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-[#00817FFF] focus:ring-[#00817FFF] focus:ring-1 sm:text-sm" placeholder="Username" type="text" name="username" value={this.state.user.username} onChange={this.handleChange} />
                                    </label>
                                    {this.state.errors.username && (
                                        <div className="text-sm text-red-600">{this.state.errors.username}</div>
                                    )}
                                    <label className="relative block">
                                        <span className="sr-only">Username</span>
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                            <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
                                        </span>
                                        <input className=" placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-[#00817FFF] focus:ring-[#00817FFF] focus:ring-1 sm:text-sm" placeholder="Passowrd" type="text" name="password" value={this.state.user.password} onChange={this.handleChange} />
                                    </label>
                                    {this.state.errors.password && (
                                        <div className="text-sm text-red-600">{this.state.errors.password}</div>
                                    )}
                                </div>
                                <div className='flex mt-2 justify-center'>
                                    <button class="bg-[#00817FFF] cursor-pointer py-2 px-5 text-white rounded" to="/home">
                                        Log in
                                    </button>
                                </div>
                            </form>
                            <div className='flex text-sm flex-col mt-4 gap-3'>
                                <div className='flex gap-1 justify-center'>
                                    <a className='text-blue-600 hover:underline' href="">Forget Password</a>
                                    <p className='bg-[#00817FFF] w-[1px]'></p>
                                    <Link className='text-blue-600 hover:underline' to="/register">Register New Account</Link>
                                    <p className='bg-[#00817FFF] w-[1px]'></p>
                                    <a className='text-blue-600 hover:underline' href="">Support</a>
                                </div>
                                <p className='text-center'>Effortless Documentation for Compassionate Care</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-2 justify-center mt-3'>
                        <button class="bg-[#00817FFF] cursor-pointer py-2 px-4 text-white rounded">
                            Previous
                        </button>
                        <button class="bg-[#00817FFF] cursor-pointer py-2 px-4 text-white rounded">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
