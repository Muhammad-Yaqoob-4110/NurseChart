import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Register extends Component {
    render() {
        return (
            <div className='w-full h-full'>
                <div className='flex justify-center items-center mt-8'>
                <div className='lg:w-[632px] w-11/12 p-6 bg-white rounded-[7px]'>
                        <h4 className="p-4 text-center font-bold text-xl text-[#00817FFF]"> NurseChart</h4>
                        <div className='flex flex-col gap-2'>
                            <label className="relative block">
                                <span className="sr-only">Full Name</span>
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                    <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
                                </span>
                                <input className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Full Name" type="text" name="search" />
                            </label>
                            <label className="relative block">
                                <span className="sr-only">Email</span>
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                    <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
                                </span>
                                <input className=" placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Email" type="text" name="search" />
                            </label>
                            <label className="relative block">
                                <span className="sr-only">Username</span>
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                    <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
                                </span>
                                <input className=" placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Username" type="text" name="search" />
                            </label>
                            <label className="relative block">
                                <span className="sr-only">Username</span>
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                    <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
                                </span>
                                <input className=" placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Passowrd" type="text" name="search" />
                            </label>
                        </div>

                        <div className='flex mt-2 justify-center'>
                            <Link class="bg-[#00817FFF] cursor-pointer py-2 px-5 text-white rounded" to="/home">
                                Register
                            </Link>
                        </div>
                        <div className='flex gap-1 justify-center mt-2'>
                            <Link className='text-blue-600 hover:underline lg:text-base text-sm' to="/login">Already have an Account?</Link>
                            
                        </div>
                        <div className='flex flex-col mt-1 gap-3 lg:text-base text-sm'>
                        
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

export default Register;
