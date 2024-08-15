import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Loggedout extends Component {
    render() {
        return (
            <div className='w-full h-full mt-8'>
                <div className='flex justify-center items-center'>
                    <div className='lg:w-[632px] w-11/12 p-6 bg-white rounded-[7px] flex flex-col justify-center items-center gap-2'>
                        <h2 className='font-bold text-[#0F7573FF] text-2xl p-4'>Logged Out</h2>
                        <h5 className='text-[#615F63FF] p-1 text-center'>You have successfully logged out of NurseChart</h5>
                        <div className='flex flex-col text-[#A3309BFF]'>
                        <Link className='hover:underline' to="/login">Click here to log back in</Link>
                        <a className='hover:underline' href="">Return to Home Page</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Loggedout;
