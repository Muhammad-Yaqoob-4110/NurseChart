import axios from 'axios';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';
import config from './config';
import { jsPDF } from 'jspdf';
import Modal from './Modal';

const Home = () => {
  const location = useLocation();
  const { userid } = location.state || {};
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recentTemplates, setRecentTemplates] = useState([]);
  const [templatesWithIds, setTemplatesWithIds] = useState([]);
  const [transcription, setTranscription] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [showModal, setShowModal] = useState(false)
  const [extractedInformation, setextractedInformation] = useState("")
  const templatesToDisplay = recentTemplates.slice(-10);

  const textAreaRef = useRef(null);
  const recognitionRef = useRef(null);
  const modalResolveRef = useRef(null);

  useEffect(() => {
    // Resolves the promise with the updated transcription when the modal closes
    if (!showModal && modalResolveRef.current) {
      modalResolveRef.current(extractedInformation); // Pass the latest transcription
      modalResolveRef.current = null;
    }
  }, [showModal, extractedInformation]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognitionRef.current = recognition;

      recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        // Update the state only with the final transcript when the speech is finalized
        setTranscription(prevTranscription => prevTranscription + finalTranscript);

        // Update interim transcript separately without appending to state
        if (textAreaRef.current) {
          textAreaRef.current.value = transcription + interimTranscript;
          // Scroll the text area to the bottom after transcription update
          textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      // Cleanup on component unmount
      return () => {
        if (recognitionRef.current) {
          recognitionRef.current.stop();
          recognitionRef.current = null;
        }
      };
    }
  }, []); // Empty dependency array ensures this runs only once on mount and unmount

  useEffect(() => {
    // Load templates
    if (userid) {
      axios.post('http://localhost:3850/api/getAllTemplates', { userid })
        .then(response => {
          const templates = response.data;

          // Function to get all template IDs
          const getTemplateIds = (templates) => {
            return templates
              .filter(template => template.templateid) // Ensure templateid exists
              .map(template => template.templateid); // Extract templateid values
          };

          // Get the list of template IDs
          const templateIds = getTemplateIds(templates);
          setRecentTemplates(templateIds);
          setTemplatesWithIds(templates);
        })
        .catch(error => {
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
  }, [userid]); // Re-run when userid changes

  // Function to start recording
  const handleRecording = useCallback(() => {
    if (recognitionRef.current && !isRecording) {
      recognitionRef.current.start();
      setIsRecording(true);
    } else {
      console.error("SpeechRecognition is not initialized or is already recording.");
    }
  }, [isRecording]);

  // Function to stop recording
  const handleStopRecording = useCallback(() => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      console.error("SpeechRecognition is not initialized or is not recording.");
    }
  }, [isRecording]);


  // Handle dropdown selection change
  const handleSelectChange = (event) => {
    setSelectedTemplate(event.target.value)
  }

  // Handle button click event
  const handleGenerateReport = () => {

    // const { selectedTemplate, transcription } = this.state;

    const genAI = new GoogleGenerativeAI(config.apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // User id
    // const { userid } = this.context;
    // console.log('userid', userid)

    // Generate the response
    // Check if the selected option is "Vital Signs"
    if (selectedTemplate === "Vital Signs") {
      setIsLoading(true)

      // Nurse: "Good morning, Mr. Smith. I need to take some of your vital signs today. How are you feeling?"
      // Patient: "Good morning. I’m feeling alright, just a little tired."

      // Nurse: "Thank you for letting me know. Let's start with your temperature. Have you been feeling feverish lately?"
      // Patient: "No, I haven't had a fever."

      // Nurse: "Alright, your temperature is 98.6°F, which is normal. Now, I’ll check your pulse. Have you noticed any irregular heartbeat or palpitations recently?"
      // Patient: "No, my heart feels fine."

      // Nurse: "Your pulse is 72 beats per minute, which is also normal. I’ll now listen to your breathing. Have you had any difficulty breathing or shortness of breath?"
      // Patient: "No, I’m breathing okay."

      // Nurse: "Great, your respiration rate is 16 breaths per minute, which is normal. Let me check your blood pressure. Have you had any issues with high or low blood pressure?"
      // Patient: "No, my blood pressure is usually pretty stable."

      // Nurse: "Your blood pressure is 120/80 mmHg, which is within the normal range. Now, let’s check your oxygen saturation. Have you had any issues with oxygen levels or felt light-headed?"
      // Patient: "No, I haven't felt light-headed."

      // Nurse: "Your oxygen saturation is 98%, which is perfect. Lastly, on a scale of 1 to 10, how would you rate your pain right now?"
      // Patient: "I’d say it’s about a 3. Just some mild discomfort in my back."

      // Nurse: "Thank you for sharing that. And lastly, how's your blood sugar level been lately? Have you had any readings that were too high or too low?"
      // Patient: "I checked this morning, and it was 90 mg/dL, which is normal for me."
      // Nurse: "That’s good to hear. Your vital signs are all within normal limits, which is great. I'll document everything and let the doctor know."

      // Define the text from which you want to extract details
      const text = `
      Patient's vital signs are as follows: Temperature is 98.6°F, Pulse is 72 bpm, Respiration rate is 16 breaths per minute, Blood pressure is 120/80 mmHg, Oxygen saturation is 98%, Pain level is 3 out of 10, and Blood sugar level is 90 mg/dL.
      `;

      // Define the prompt for extraction
      const prompt = `
      Extract the following details from the text with their units in standard medical abbreviations:
      - Temperature (e.g., °F, °C)
      - Pulse (e.g., bpm)
      - Respiration (e.g., breaths per minute)
      - Blood pressure (e.g., mmHg)
      - Oxygen saturation (e.g., %)
      - Pain level (e.g., out of 10)
      - Blood sugar level (e.g., mg/dL)

      Text: ${transcription}
    `;

      const run = async () => {
        try {
          // const prompt = "Write a story about an AI and magic"
          const result = await model.generateContent(prompt);
          const response = await result.response;
          const text = await response.text();
          // console.log(text);
          setextractedInformation(text)
          setShowModal(true);
          setIsLoading(false)

          // Create a promise that resolves when the modal is closed
          const updatedTranscription = await new Promise((resolve) => {
            modalResolveRef.current = resolve;
          });

          setIsLoading(true)
          // Create a PDF and save the generated text in it
          generatePdf("Vital Signs", updatedTranscription, "VitalSignsReport")
          // console.log("extracted and edited", updatedTranscription)
          const { time, date } = getCurrentDateTime();
          // Create a new template entry
          const newTemplateName = `V.S ${time} ${date}`;

          // Save template to database
          axios.post('http://localhost:3850/api/templates', {
            userid: userid,
            templateid: newTemplateName,
            template: updatedTranscription,
          }).catch(error => {
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

          // Update the recentTemplates list by appending the new template name
          setRecentTemplates(prevTemplates => [
            ...prevTemplates,
            newTemplateName
          ]);
        }
        finally {
          setIsLoading(false)
        }
      }
      run();

    }
    if (selectedTemplate === "Head-to-Toe Assessment") {
      setIsLoading(true);
      // Nurse: "How are you feeling today? Have you noticed any changes in your overall health?"
      // Patient: "I feel fine. No major changes, just the usual aches and pains."

      // Nurse: "Have you noticed any rashes, dry skin, or changes in your skin color?"
      // Patient: "No, my skin feels normal. I haven't noticed any new rashes or anything unusual."

      // Nurse: "Have you had any headaches, vision changes, or issues with your hearing?"
      // Patient: "No headaches, and my vision and hearing are the same as usual."

      // Nurse: "Are you experiencing any shortness of breath, coughing, or chest discomfort?"
      // Patient: "No, I can breathe just fine. I haven’t had any chest pain or coughing."

      // Nurse: "Have you felt any palpitations or noticed an irregular heartbeat?"
      // Patient: "No, my heartbeat feels normal, and I haven’t noticed any irregularities."

      // Nurse: "Have you had any abdominal pain, bloating, or changes in your bowel movements?"
      // Patient: "No, my stomach feels fine, and my bowel movements have been regular."

      // Nurse: "Have you experienced any swelling in your legs or noticed any changes in your ability to move around?"
      // Patient: "No swelling, and I’m able to move around without any issues."

      // Nurse: "Have you had any difficulty with urination, or have you noticed any changes in your urinary habits?"
      // Patient: "No, everything seems normal. I haven’t had any trouble urinating."

      // Nurse: "Any nausea, vomiting, or issues with your digestion?"
      // Patient: "No nausea or vomiting, and my digestion seems fine."

      // Nurse: "Do you have any wounds or dressings that need attention?"
      // Patient: "No, I don’t have any wounds or bandages at the moment."

      const headToToeText = `
      General Appearance: The patient appears well-groomed, with normal posture. No signs of distress observed.
      Skin: The skin is warm, dry, and intact with no visible lesions.
      Head and Neck: No abnormalities detected in the head, eyes, ears, nose, throat, or neck.
      Chest and Lungs: Breath sounds are clear bilaterally with no signs of respiratory distress.
      Heart: Normal heart sounds with a regular rhythm; no murmurs detected.
      Abdomen: The abdomen is soft, non-tender, with normal bowel sounds.
      Extremities: No edema noted; pulses are strong and equal bilaterally.
      Genitourinary (GU) System: No signs of urinary retention or incontinence. Foley catheter is in place without signs of infection.
      Gastrointestinal (GI) System: The patient denies nausea or vomiting, with normal bowel movements. No abdominal discomfort noted.
      Wounds and Dressings: No wounds present, and dressings are clean and dry without signs of infection.
      `;

      const headToToePrompt = `
  Extract key details related to the following sections from the text. Focus on the main observations or findings:
  - General Appearance
  - Skin
  - Head and Neck
  - Chest and Lungs
  - Heart
  - Abdomen
  - Extremities
  - Genitourinary (GU) System
  - Gastrointestinal (GI) System
  - Wounds and Dressings

  Text: ${transcription}

  Provide concise keywords or short phrases summarizing the key findings for each section.
`;
      const run = async () => {
        try {
          const result = await model.generateContent(headToToePrompt);
          const response = await result.response;
          const text = response.text();
          // console.log(text);

          
          setextractedInformation(text)
          setShowModal(true);
          setIsLoading(false)

          // Create a promise that resolves when the modal is closed
          const updatedTranscription = await new Promise((resolve) => {
            modalResolveRef.current = resolve;
          });

          setIsLoading(true)
          // Create a PDF and save the generated text in it
          // generatePdf("Vital Signs", updatedTranscription, "VitalSignsReport")

          generatePdf("Head to Toe Assessment", updatedTranscription, "HeadToToeAssessmentReport")

          const { time, date } = getCurrentDateTime();
          // Create a new template entry
          const newTemplateName = `H.T ${time} ${date}`;

          // Save template to database
          axios.post('http://localhost:3850/api/templates', {
            userid: userid,
            templateid: newTemplateName,
            template: updatedTranscription,
          }).catch(error => {
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

          // Update the recentTemplates list by appending the new template name
          setRecentTemplates(prevTemplates => [
            ...prevTemplates,
            newTemplateName
          ]);
        }

        finally {
          setIsLoading(false)
        }
      }
      run();
    }
    if (selectedTemplate === "Patient Education") {
      // Trigger the download of the PDF
      const link = document.createElement('a');
      link.href = `${process.env.PUBLIC_URL}/SAMPLE PATIENT EDUCATION FOR HOME VISIT 1.pdf`;
      link.download = 'SAMPLE PATIENT EDUCATION FOR HOME VISIT 1.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  // generate pdf
  const generatePdf = (heading, body, fileName) => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const margin = 15;
    // Set the font size to 11 and add the heading
    doc.setFontSize(22);
    doc.text(heading, margin, 25);

    doc.setFontSize(11);
    doc.setTextColor(50);

    // Define how to split the text into lines that fit within the margins
    const splitText = doc.splitTextToSize(cleanUpResponse(body), 180);

    // Add the content with line wrapping
    doc.text(splitText, margin, 35, { maxWidth: 180, align: 'left' });

    doc.save(`${fileName}.pdf`);
  }
  const cleanUpResponse = (response) => {
    return response
      .replace(/-\s/g, '') // Remove dashes and following spaces
      .replace(/\*\*/g, '') // Remove asterisks
      .trim(); // Remove any leading/trailing whitespace
  };

  // Function to get current date and time
  const getCurrentDateTime = () => {
    const now = new Date();
    const time = now.toLocaleTimeString(); // Get current time
    const date = now.toLocaleDateString(); // Get current date
    return { time, date };
  }
  const onTemplateHandle = (templateId) => {
    // Find the template with the matching templateid
    const foundTemplate = templatesWithIds.find(
      (templateObj) => templateObj.templateid === templateId
    );

    const text = foundTemplate['template']
    // Create a PDF and save the generated text in it
    if (templateId.startsWith("V.S")) {

      generatePdf("Vital Signs", text, "VitalSignsReport")
    }
    if (templateId.startsWith("H.T")) {
      generatePdf("Head to Toe Assessment", text, "HeadToToeAssessmentReport")
    }
  }

  const hanldeNewTemplateEntry = () => {
    setTranscription("")
  }
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
          <div className='lg:w-[900px] w-11/12 p-6 bg-white rounded-[7px]'>
            <div className=" flex bg-[#00817FFF] p-4">
              <div className='w-4/5 '>
                <h4 className="text-center font-bold text-lg text-white">NurseChart</h4>
              </div>
              <div className='w-1/5  flex justify-end'>
                <Link class="bg-[#910086FF] rounded-sm cursor-pointer p-1 text-white" to="/loggedout">
                  Logout
                </Link>
              </div>
            </div>
            <div className='flex lg:flex-row flex-col gap-1 grid-cols-2 mt-1'>
              {/* Left Section */}
              <div className='lg:w-1/4 '>
                <p>Recent Templates</p>
                <ul className='flex lg:flex-col flex-wrap lg:gap-0 gap-2'>
                  {templatesToDisplay.length === 0 ? (
                    <p className='text-red-600 text-sm'>No template added</p> // Show this message if there are no templates
                  ) : (
                    templatesToDisplay.map((template, index) => (
                      <a
                        onClick={() => onTemplateHandle(template)}
                        key={index}
                        className='text-blue-600 hover:cursor-pointer hover:underline'
                      >
                        {template}
                      </a>
                    ))
                  )}

                  {/* Conditionally render "See More..." if more than 10 templates exist */}
                  {templatesToDisplay.length >= 10 && (
                    <Link className='text-blue-600 hover:cursor-pointer hover:underline' to="all-templates" state={{ templatesWithIds: templatesWithIds }}>
                      See More...
                    </Link>
                  )}
                </ul>

                {/* <button className="bg-[#910086FF] rounded-sm cursor-pointer p-1 text-white w-full mt-2">
                      Add New Patient
                    </button> */}
              </div>
              {/* Right Section */}
              <div className='flex flex-col gap-2 lg:w-3/4 '>
                <p>Quick Templates</p>
                <div className='flex gap-2 lg:text-base text-sm'>
                  <select className='border focus:outline-none' value={selectedTemplate}
                    onChange={handleSelectChange}>
                    <option value="">Select a Template</option>
                    <option value="Vital Signs">Vital Signs</option>
                    <option value="Head-to-Toe Assessment">Head-to-Toe Assessment</option>
                    <option value="Medication Administration">Medication Administration</option>
                    <option value="Specialized Care">Specialized Care</option>
                    <option value="Patient Education">Patient Education</option>
                    <option value="Plan for Next Visit">Plain for Next Visit</option>
                  </select>
                  <button onClick={handleGenerateReport} className="bg-[#00817FFF] rounded-sm cursor-pointer p-1 text-white">
                    Generate Report
                  </button>
                  {showModal && (
                    <Modal
                      title="Verify the Extracted Information"
                      transcription={extractedInformation}
                      onClose={(updatedTranscription) => {
                        setextractedInformation(updatedTranscription); // Update state
                        setShowModal(false); // Close the modal
                        if (modalResolveRef.current) {
                          modalResolveRef.current(updatedTranscription); // Resolve the promise with the updated transcription
                        }
                      }}
                    />
                  )}

                </div>
                <p>Voice Recording</p>
                <div className='flex gap-2 '>
                  <button class="bg-[#00817FFF] rounded-sm cursor-pointer p-1 text-white" onClick={handleRecording}>
                    {isRecording ? 'Recording...' : 'Start Recording'}
                  </button>
                  <button class="bg-[#00817FFF] rounded-sm cursor-pointer p-1 text-white" onClick={handleStopRecording}>
                    Stop Recording
                  </button>
                  <button class="bg-[#00817FFF] rounded-sm cursor-pointer p-1 text-white" onClick={hanldeNewTemplateEntry}>
                    Clear for New Template
                  </button>
                </div>
                <textarea ref={textAreaRef} className='border resize-none p-1 border-[#DEDEDEFF] focus:outline-[#DEDEDEFF] focus:border-transparent' placeholder='Transcription will appear here.' id="transcription" name="transcription" value={transcription} readOnly rows="6" cols="50">
                </textarea>
              </div>
            </div>
          </div>
        </div>
        <div className='flex gap-2 justify-center mt-3'>
          <button class="bg-[#00817FFF] cursor-pointer py-2 px-4 text-white rounded">
            Previous
          </button>
          <button className="bg-[#00817FFF] cursor-pointer py-2 px-4 text-white rounded">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
