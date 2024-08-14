import React, { Component } from 'react';

class Loggedout extends Component {
    render() {
        return (
            <div className='w-full h-full mt-8'>
                <div className='flex justify-center items-center'>
                    <div className='h-[300px] w-[700px] bg-white rounded-[7px] flex flex-col justify-center items-center gap-2'>
                        <h2 className='font-bold text-[#0F7573FF] text-2xl p-4'>Logged Out</h2>
                        <h5 className='text-[#615F63FF] p-1'>You have successfully logged out of NurseChart</h5>
                        <div className='flex flex-col text-[#A3309BFF]'>
                        <a className='hover:underline' href="">Click here to log back in</a>
                        <a className='hover:underline' href="">Return to Home Page</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Loggedout;
