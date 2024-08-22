// Alltemplates.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const Alltemplates = () => {
    // const recentTemplates = ["H.T 4:13:10 PM 8/21/2024",
    //                         "H.T 6:19:59 PM 8/21/2024",
    //                         "V.S 6:21:59 PM 8/21/2024",
    //                         "V.S 6:49:49 PM 8/21/2024",
    //                         "H.T 6:49:56 PM 8/21/2024",
    //                         "V.S 6:50:01 PM 8/21/2024",
    //                         "H.T 6:50:08 PM 8/21/2024",
    //                         "V.S 6:50:12 PM 8/21/2024",
    //                         "H.T 6:50:20 PM 8/21/2024",
    //                         "V.S 6:50:28 PM 8/21/2024",]
  const location = useLocation();
  const { recentTemplates } = location.state || {}; // Ensure recentTemplates is an array or null
  console.log('recent template', recentTemplates);

    // Group templates by date
    const groupedTemplates = recentTemplates.reduce((acc, template) => {
        const date = template.split(" ").slice(-1)[0]; // Extract date part
        if (!acc[date]) acc[date] = [];
        acc[date].push(template);
        return acc;
    }, {});


  return (
    <div className="bg-gray-100 min-h-screen p-8">
            <h1 className="lg:text-3xl text-xl font-bold text-center text-[rgb(0,129,127)] mb-8">All Templates</h1>
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                {Object.keys(groupedTemplates).map((date, index) => (
                    <div key={index} className="mb-8">
                        <h2 className="lg:text-2xl text-lg font-semibold text-gray-700 mb-4">{date}</h2>
                        <ul className="space-y-2">
                            {groupedTemplates[date].map((template, idx) => (
                                <li key={idx}>
                                    <a 
                                        href="#"
                                        className="lg:text-lg text-blue-600 hover:underline"
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
