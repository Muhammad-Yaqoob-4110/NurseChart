import React, { Component } from 'react';
import Joi, { resolve } from "joi-browser";
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

class Register extends Component {
    state = {
        newUser: {
            fullname: "",
            email: "",
            username: "",
            password: ""
        },
        errors: {
            fullname: "",
            email: "",
            username: "",
            password: ""
        },
        redirectToHome: false,
        isLoading: false,
        usernames:[],
        useremails:[],
        userinfo: ""
    };

    async componentDidMount() {
        try {
            const response = await axios.get('http://localhost:3850/api/usernamesandemails'); // Replace with your API endpoint
            const usernames = response.data['usernames']
            const useremails = response.data['useremails']
            this.setState({ usernames, useremails });

          } catch (error) {
            console.error('Error fetching usernames:', error);
          }
    }
    schema = {
        fullname: Joi.string().required().label("Name"),
        email: Joi.string().email({ tlds: { allow: false } }).required().label("Email"),
        username: Joi.string().required().label("User Name"),
        password: Joi.string().min(7).max(15).required().label("Password"),
    };

    validate = () => {
        const result = Joi.validate(this.state.newUser, this.schema, {
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
            // console.log(this.state.usernames);
            // console.log(this.state.useremails);
           

            if(this.state.useremails.includes(this.state.newUser.email)){
                const errors = {
                    fullname: "",
                    email: "The email is already registered",
                    username: "",
                    password: ""
                }
                this.setState({errors});
            }
            else if(this.state.usernames.includes(this.state.newUser.username)){
                const errors = {
                    fullname: "",
                    email: "",
                    username: "The username is already taken",
                    password: ""
                }
                this.setState({errors});
            }
            else{
                this.setState({ isLoading: true });
                
                axios.post('http://localhost:3850/api/users', {
                    username: this.state.newUser.username,
                    password: this.state.newUser.password,
                    fullname: this.state.newUser.fullname,
                    email: this.state.newUser.email,
                    role: "nurse"
                }).then(response => {
                    this.setState({ isLoading: false });
                    // console.log(response.data);
                    // Set userid in context
                    
                    // if (this.context && typeof this.context.setUserId === 'function') {
                    //     this.context.setUserId(response.data.userid);
                    // } else {
                    //     console.error('setUserId method is not available in context');
                    // }
                    const userid = response.data['userid']
                    this.setState({ 
                        redirectToHome: true, 
                        userinfo: userid 
                    });
                }).catch(error => {
                    this.setState({ isLoading: false });
                    if (error.response) {
                        if (error.response.status === 500) {
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

            }

            
            // Navigate to home
            // this.setState({ redirectToHome: true });
        }
    };

    handleChange = (e) => {
        this.state.newUser[e.currentTarget.name] = e.currentTarget.value;
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

        this.setState({ newUser: this.state.newUser });
    };
    render() {
        if (this.state.redirectToHome) {
            return <Navigate to="/home" state={{ userid: this.state.userinfo }}/>;
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
                            <form onSubmit={this.handleSubmit}>
                            <h4 className="p-4 text-center font-bold text-xl text-[#00817FFF]"> NurseChart</h4>
                            <div className='flex flex-col gap-2'>
                                <label className="relative block">
                                    <span className="sr-only">Full Name</span>
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                        <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
                                    </span>
                                    <input className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-[#00817FFF] focus:ring-[#00817FFF] focus:ring-1 sm:text-sm" placeholder="Full Name" type="text" name="fullname" value={this.state.newUser.fullname} onChange={this.handleChange} />
                                </label>
                                    {this.state.errors.fullname && (
                                        <div className="text-sm text-red-600 mt-1 ml-1">{this.state.errors.fullname}</div>
                                    )}
                                <label className="relative block">
                                    <span className="sr-only">Email</span>
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                        <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
                                    </span>
                                    <input className=" placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-[#00817FFF] focus:ring-[#00817FFF] focus:ring-1 sm:text-sm" placeholder="Email" type="text" name="email" value={this.state.newUser.email} onChange={this.handleChange} />
                                </label>
                                    {this.state.errors.email && (
                                        <div className="text-sm text-red-600">{this.state.errors.email}</div>
                                    )}
                                <label className="relative block">
                                    <span className="sr-only">Username</span>
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                        <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
                                    </span>
                                    <input className=" placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-[#00817FFF] focus:ring-[#00817FFF] focus:ring-1 sm:text-sm" placeholder="Username" type="text" name="username" value={this.state.newUser.username} onChange={this.handleChange} />
                                </label>
                                {this.state.errors.username && (
                                        <div className="text-sm text-red-600">{this.state.errors.username}</div>
                                    )}
                                <label className="relative block">
                                    <span className="sr-only">Passowrd</span>
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                        <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
                                    </span>
                                    <input className=" placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-[#00817FFF] focus:ring-[#00817FFF] focus:ring-1 sm:text-sm" placeholder="Passowrd" type="password" name="password" value={this.state.newUser.password} onChange={this.handleChange}/>
                                </label>
                                {this.state.errors.password && (
                                        <div className="text-sm text-red-600">{this.state.errors.password}</div>
                                    )}
                            </div>
                            <div className='flex mt-2 justify-center'>
                                <button  class="bg-[#00817FFF] cursor-pointer py-2 px-5 text-white rounded" to="/home">
                                    Register
                                </button>
                            </div>
                            </form>
                            <div className='flex gap-1 justify-center mt-2'>
                                <Link className='text-blue-600 hover:underline lg:text-base text-sm' to="/login">Already have an Account?</Link>
                            </div>
                            <div className='flex flex-col mt-1 gap-3 lg:text-base text-sm'>
                                <p className='text-center'>Effortless Documentation for Compassionate Care</p>
                            </div>
                        </div>
                    </div>
                    {/* <div className='flex gap-2 justify-center mt-3'>
                        <button class="bg-[#00817FFF] cursor-pointer py-2 px-4 text-white rounded">
                            Previous
                        </button>
                        <button class="bg-[#00817FFF] cursor-pointer py-2 px-4 text-white rounded">
                            Next
                        </button>
                    </div> */}
                </div>
            </div>
        );
    }
}

export default Register;
