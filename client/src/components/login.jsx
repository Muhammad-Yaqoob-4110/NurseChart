import React, { Component } from 'react';
import Joi from 'joi-browser'
import { Link, Navigate } from 'react-router-dom';

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
            console.log(this.props);
            // Navigate to home
            this.setState({ redirectToHome: true });
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
        return (
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
        );
    }
}

export default Login;
