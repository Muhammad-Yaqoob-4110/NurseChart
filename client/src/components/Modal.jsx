import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

const Modal = ({ title, transcription, onClose }) => {
    const [editedTranscription, setEditedTranscription] = useState(transcription);
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission
        onClose(editedTranscription); // Close the modal when the button is clicked
    };
    return (
        <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
            <div className='mt-10 flex flex-col  gap-5 text-white'>
                {/* <button className='place-self-end'><X size={30} /></button> */}
                <div className='bg-[#00817FFF] rounded-xl px-10 py-5 flex flex-col gap-5 items-center mx-4'>
                    <h1 className='text-3xl font-extrabold'>{title}</h1>
                    <form className='flex flex-col' onSubmit={handleSubmit}>
                        <textarea className='border resize-none p-1 border-[#DEDEDEFF] focus:outline-white focus:border-transparent w-full px-4 py-3 text-black rounded-md' placeholder='Transcription will appear here.' id="transcription" name="transcription" value={editedTranscription} rows="10" cols="50" onChange={(e) => setEditedTranscription(e.target.value)} >
                        </textarea>
                        <button className='mt-4 flex items-center justify-center gap-2 px-5 py-3 font-medium rounded-md bg-red-600' type="submit"><Check /> Confirm Details</button>

                    </form>
                </div>

            </div>

        </div>
    );
}

export default Modal;
