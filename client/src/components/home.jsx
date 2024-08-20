import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { GoogleGenerativeAI  } from '@google/generative-ai';
import config from './config';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      transcription: '',
      selectedTemplate: ''
    };
    this.recognition = null;
    this.textAreaRef = React.createRef();
  }

  componentDidMount() {
    // Check for browser support of the Web Speech API
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;

      // When speech is recognized
      this.recognition.onresult = (event) => {
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
        this.setState((prevState) => ({
          transcription: prevState.transcription + finalTranscript
        }));

        // Update interim transcript separately without appending to state
        if (this.textAreaRef.current) {
          this.textAreaRef.current.value = this.state.transcription + interimTranscript;
          // Scroll the text area to the bottom after transcription update
          this.textAreaRef.current.scrollTop = this.textAreaRef.current.scrollHeight;
        }
      };

      this.recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };
    }
  }


  // Function to stop Recording
  handleStopRecording = () => {
    if (this.state.isRecording) {
      this.recognition.stop();
      this.setState({ isRecording: false })
    }
  }

  // Function to Start Recording
  handleRecording = () => {
    if (!this.state.isRecording) {

      this.recognition.start();
      this.setState({ isRecording: true });
    }
  };

  // Handle dropdown selection change
  handleSelectChange = (event) => {
    this.setState({ selectedTemplate: event.target.value });
  }

  // Handle button click event
  handleGenerateReport = () => {
    
    const { selectedTemplate, transcription } = this.state;
    const genAI = new GoogleGenerativeAI(config.apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    // Define the text from which you want to extract details
      const text = `
      Patient's vital signs are as follows: Temperature is 98.6°F, Pulse is 72 bpm, Respiration rate is 16 breaths per minute, Blood pressure is 120/80 mmHg, Oxygen saturation is 98%, Pain level is 3 out of 10, and Blood sugar level is 90 mg/dL.
      `;

    // Generate the response
    // Check if the selected option is "Vital Signs"
    if (selectedTemplate === "Vital Signs") {
      // Define the prompt for extraction
      const prompt = `
      Extract the following details from the text:
      - Temperature
      - Pulse
      - Respiration
      - Blood pressure
      - Oxygen saturation
      - Pain level
      - Blood sugar level

      Text: ${text}
      `;
      async function run() {
        // const prompt = "Write a story about an AI and magic"
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);
      }
      
      run();
    }
    // else {
    //   console.log('Please select "Vital Signs" to generate the report.');
    // }
  }


  render() {
    const { isRecording, transcription } = this.state;
    return (
      <div className='w-full h-full'>
        <div className='flex justify-center items-center mt-8'>
          <div className='lg:w-[632px] w-11/12 p-6 bg-white rounded-[7px]'>
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
                <ul className='flex flex-col gap-0'>
                  <p>Patient List</p>

                  <a className='text-blue-600 hover:cursor-pointer hover:underline'>Ali Ahmed</a>
                  <a className='text-blue-600 hover:cursor-pointer hover:underline'>Ali Ahmed</a>
                  <a className='text-blue-600 hover:cursor-pointer hover:underline'>Ali Ahmed</a>
                  <a className='text-blue-600 hover:cursor-pointer hover:underline'>See More...</a>
                </ul>
                <button className="bg-[#910086FF] rounded-sm cursor-pointer p-1 text-white w-full mt-2">
                  Add New Patient
                </button>
              </div>
              {/* Right Section */}
              <div className='flex flex-col gap-2 lg:w-3/4 '>
                <p>Quick Templates</p>
                <div className='flex gap-2 lg:text-base text-sm'>
                  <select className='border focus:outline-none' value={this.state.selectedTemplate}
                    onChange={this.handleSelectChange}>
                    <option value="">Select a Template</option>
                    <option value="Vital Signs">Vital Signs</option>
                    <option value="Head-to-Toe Assessment">Head-to-Toe Assessment</option>
                    <option value="Medication Administration">Medication Administration</option>
                    <option value="Specialized Care">Specialized Care</option>
                    <option value="Patient Education">Patient Education</option>
                    <option value="Plan for Next Visit">Plain for Next Visit</option>
                  </select>
                  <button onClick={this.handleGenerateReport} className="bg-[#910086FF] rounded-sm cursor-pointer p-1 text-white">
                    Generate Report
                  </button>
                </div>
                <p>Voice Recording</p>

                <div className='flex gap-2 '>
                  <button class="bg-[#910086FF] rounded-sm cursor-pointer p-1 text-white" onClick={this.handleRecording}>
                    {isRecording ? 'Recording...' : 'Start Recording'}
                  </button>
                  <button class="bg-[#910086FF] rounded-sm cursor-pointer p-1 text-white" onClick={this.handleStopRecording}>
                    Stop Recording
                  </button>
                </div>
                <textarea ref={this.textAreaRef} className='border resize-none p-1 border-[#DEDEDEFF] focus:outline-[#DEDEDEFF] focus:border-transparent' placeholder='Transcription will appear here.' id="transcription" name="transcription" value={transcription} readOnly rows="6" cols="50">
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
    );
  }
}

export default Home;
