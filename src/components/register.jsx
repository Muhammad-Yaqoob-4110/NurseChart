import React, { Component } from 'react';

class Register extends Component {
    render() {
        return (
            <div className='w-full h-full'>
                <div className='flex justify-center items-center mt-8'>
                    <div className='h-[400px] w-[632px] p-6 bg-white rounded-[7px]'>
                        <h4 className="p-4 text-center font-['Epilogue'] font-bold text-lg text-[#00817FFF]"> NurseChart</h4>
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
                            <button class="bg-[#00817FFF] cursor-pointer py-2 px-5 text-white rounded">
                                Register
                            </button>
                        </div>

                        <div className='flex flex-col mt-4 gap-3'>
                        
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
