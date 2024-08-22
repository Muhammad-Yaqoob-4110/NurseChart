// Alltemplates.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const Alltemplates = () => {

  const location = useLocation();
  const { templatesWithIds } = location.state || {}; // Ensure recentTemplates is an array or null
//   console.log('recent template', templatesWithIds);

const groupedTemplates = templatesWithIds.reduce((acc, item) => {
    const { templateid, template } = item;
    // Extract date part from templateid
    const date = templateid.split(" ").slice(-1)[0];

    if (!acc[date]) acc[date] = [];
    acc[date].push(templateid);

    return acc;
}, {});

    const onTemplateHandle = (templateId) => {
        // console.log(templateId)
        // console.log(recentTemplates)
        // Find the template with the matching templateid
        const foundTemplate = templatesWithIds.find(
          (templateObj) => templateObj.templateid === templateId
        );
    console.log(foundTemplate)
        const text = foundTemplate['template']
        // Create a PDF and save the generated text in it
        if(templateId.startsWith("V.S")){
    
          generatePdf("Vital Signs", text, "VitalSignsReport")
        }
        if(templateId.startsWith("H.T")){
          generatePdf("Head to Toe Assessment", text, "HeadToToeAssessmentReport")
        }
      }

    //   generate pdf
 const generatePdf = (heading, body, fileName) =>{
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
  return (
    <div className="bg-[#f0f5fe] min-h-screen p-8">
            <h1 className="lg:text-3xl text-xl font-bold text-center text-[rgb(0,129,127)] mb-8">All Templates</h1>
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                {Object.keys(groupedTemplates).map((date, index) => (
                    <div key={index} className="mb-8">
                        <h2 className="lg:text-2xl text-lg font-semibold text-gray-700 mb-4">{date}</h2>
                        <ul className="space-y-2">
                            {groupedTemplates[date].map((template, idx) => (
                                <li key={idx} >
                                    <a 
                                    onClick={() => onTemplateHandle(template)}
                                        className="lg:text-lg text-blue-600 hover:underline hover:cursor-pointer"
                                    >
                                        {template}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
  );
};

export default Alltemplates;
