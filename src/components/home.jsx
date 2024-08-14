import React, { Component } from 'react';

class Home extends Component {
    render() {
        return (
            <div className='w-full h-full'>
                <div className='flex justify-center items-center mt-8'>
                    <div className='h-[400px] w-[632px] p-4 bg-white rounded-[7px]'>
                        <h4 className=" border-2 p-4 text-center font-['Epilogue'] font-bold text-lg text-white bg-[#00817FFF]"> NurseChart</h4>

                        <div className='flex gap-1 grid-cols-2 mt-3'>
                            {/* Left Section */}
                            <div className='w-1/4 border-2'>
                                <ul className='flex flex-col gap-0'>
                                    <p>Patient List</p>

                                    <a className='text-blue-600 hover:cursor-pointer hover:underline'>Ali Ahmed</a>
                                    <a className='text-blue-600 hover:cursor-pointer hover:underline'>Ali Ahmed</a>
                                    <a className='text-blue-600 hover:cursor-pointer hover:underline'>Ali Ahmed</a>
                                    <a className='text-blue-600 hover:cursor-pointer hover:underline'>See More...</a>
                                </ul>
                                <button class="bg-[#910086FF] rounded-sm cursor-pointer p-1 text-white w-full mt-2">
                                    Add New Patient
                                </button>
                            </div>
                            {/* Right Section */}
                            <div className='flex flex-col gap-2 w-3/4 border-2'>
                                <p>Quick Templates</p>
                                <div className='flex gap-2 '>
                                    <select className='border'>
                                        <option value="saab">Select a Template</option>
                                        <option value="mercedes">Mercedes</option>
                                        <option value="audi">Audi</option>
                                    </select>
                                    <button class="bg-[#910086FF] rounded-sm cursor-pointer p-1 text-white">
                                        Generate Report
                                    </button>
                                </div>
                                <p>Voice Recording</p>

                                <div className='flex gap-2 '>
                                    <button class="bg-[#910086FF] rounded-sm cursor-pointer p-1 text-white">
                                        Start Recording
                                    </button>
                                    <button class="bg-[#910086FF] rounded-sm cursor-pointer p-1 text-white">
                                        Stop Recording
                                    </button>
                                </div>
                                <textarea className='border resize-none' id="w3review" name="w3review" rows="6" cols="50">
                                    At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.
                                </textarea>
                            </div>
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

export default Home;
