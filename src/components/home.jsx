import React, { Component } from 'react';

class Home extends Component {
    render() {
        return (
            <div className='w-full h-full'>
                <div className='flex justify-center items-center mt-8'>
                    <div className='h-[400px] w-[632px] p-4 bg-white rounded-[7px]'>
                    

                        <div className=" flex bg-[#00817FFF] p-4">
                            <div className='w-4/5 '>
                                <h4 className="text-center font-bold text-lg text-white">NurseChart</h4>
                            </div>
                            <div className='w-1/5  flex justify-end'>
                            <button class="bg-[#910086FF] rounded-sm cursor-pointer p-1 text-white">
                                        Logout
                            </button>
                            </div>
                        </div>


                        <div className='flex gap-1 grid-cols-2 mt-1'>
                            {/* Left Section */}
                            <div className='w-1/4 '>
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
                            <div className='flex flex-col gap-2 w-3/4 '>
                                <p>Quick Templates</p>
                                <div className='flex gap-2'>
                                    <select className='border focus:outline-none'>
                                        <option value="saab">Select a Template</option>
                                        <option value="mercedes">Vital Signs</option>
                                        <option value="audi">Head-to-Toe Assessment</option>
                                        <option value="audi">Medication Administration</option>
                                        <option value="audi">Specialized Care</option>
                                        <option value="audi">Patient Education</option>
                                        <option value="audi">Plain for Next Visit</option>
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
                                <textarea className='border resize-none p-1 border-[#DEDEDEFF] focus:outline-[#DEDEDEFF] focus:border-transparent' placeholder ='Transcription will appear here.' id="w3review" name="w3review" rows="6" cols="50">
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
