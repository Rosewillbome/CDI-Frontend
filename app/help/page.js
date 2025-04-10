"use client"
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

const FAQPage = () => {
  // FAQ states
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Chatbot states
  const [showChatbot, setShowChatbot] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Chatbot knowledge base with enhanced responses
  const chatbotKnowledge = {
    greetings: [
      "Hello! I'm your virtual assistant under development... How can I help you though?😊",
      "Welcome to the Drought Monitoring System support. What would you like to know?",
      "Hi there! I can answer questions about drought data, alerts, and the monitoring system."
    ],
    support: {
      response: "For technical support, you can email our team at info@ndekaobad.co.ke",
      followUp: "Would you like me to connect you with a support person directly?"
    },
    system: {
      response: "This system was developed by the Food and Agriculture Organization (FAO) and the National Emergency Coordination and Operations Centre (NECOC) to monitor drought conditions across Uganda.",
      followUp: "Would you like more details about the system architecture?"
    },
    datasets: {
      response: "The system uses three primary datasets:\n\n1. Precipitation (CHIRPS) - Rainfall estimates\n2. Temperature (MODIS LST) - Land surface temperature\n3. Vegetation (NDVI) - Vegetation health index",
      followUp: "Would you like detailed specifications for any particular dataset?"
    },
    contact: {
      response: "You can contact:\n\n• FAO Uganda\n  Email: uganda@fao.org\n  Phone: +254 734525907\n\n• NECOC Uganda\n  Email: info@ndekaobad.co.ke\n  Phone: +254 734 525 907",
      followUp: "Would you like me to connect you with a specific department?"
    },
    classification: {
      response: "Drought severity classifications:\n\n• >1.0: Normal conditions\n• 0.8-1.0: Mild drought\n• 0.6-0.8: Moderate drought\n• 0.4-0.6: Severe drought\n• <0.4: Extreme drought",
      followUp: "Would you like interpretation guidelines for these classifications?"
    },
    default: {
      response: "I couldn't find an exact answer to your question. Would you like me to:",
      options: [
        "Connect you with a human expert",
        "Search the documentation",
        "Provide related information"
      ]
    }
  };

  // Enhanced getBotResponse function
  const getBotResponse = (userMessage) => {
    const lowerMsg = userMessage.toLowerCase().trim();
    
    // Greetings
    if (/^(hello|hi|hey|greetings)/.test(lowerMsg)) {
      return {
        text: chatbotKnowledge.greetings[Math.floor(Math.random() * chatbotKnowledge.greetings.length)],
        options: []
      };
    }
    
    // Support requests
    if (/(support|help|assistance|problem|issue)/.test(lowerMsg)) {
      return {
        text: chatbotKnowledge.support.response,
        options: ['Yes, connect me', 'No, thanks']
      };
    }
    
    // System information
    if (/(system|about|what is this|platform)/.test(lowerMsg)) {
      return {
        text: chatbotKnowledge.system.response,
        options: ['Yes, more details', 'No, thanks']
      };
    }
    
    // Data questions
    if (/(data|dataset|source|information)/.test(lowerMsg)) {
      return {
        text: chatbotKnowledge.datasets.response,
        options: ['Precipitation', 'Temperature', 'Vegetation', 'All details']
      };
    }
    
    // Contact requests
    if (/(contact|email|phone|call|speak)/.test(lowerMsg)) {
      return {
        text: chatbotKnowledge.contact.response,
        options: ['FAO contact', 'NECOC contact', 'Technical support']
      };
    }
    
    // Classification questions
    if (/(class|severity|level|index)/.test(lowerMsg)) {
      return {
        text: chatbotKnowledge.classification.response,
        options: ['Interpretation', 'Examples', 'Calculation method']
      };
    }
    
    // Affirmative responses
    if (/(yes|yeah|yep|yup|please|sure|ok)/.test(lowerMsg)) {
      return {
        text: "I'll connect you with the appropriate team. Please expect a response within 24 hours. Is there anything else I can help with?",
        options: []
      };
    }
    
    // Negative responses
    if (/(no|nope|nah|not now|later)/.test(lowerMsg)) {
      return {
        text: "Understood. Feel free to ask if you need anything else. What else can I help you with today?",
        options: []
      };
    }
    
    // Default response with multiple options
    return {
      text: chatbotKnowledge.default.response,
      options: chatbotKnowledge.default.options
    };
  };

  // Handle sending messages
  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim()) return;

    
    const userMsg = { text: inputMessage, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    
    setTimeout(() => {
      const response = getBotResponse(inputMessage);
      const botMsg = { 
        text: response.text, 
        sender: 'bot',
        options: response.options || []
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); 
  };

 
  const handleQuickReply = (option) => {
    const userMsg = { text: option, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const response = getBotResponse(option);
      const botMsg = { 
        text: response.text, 
        sender: 'bot',
        options: response.options || []
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize with greeting when chatbot opens
  useEffect(() => {
    if (showChatbot && messages.length === 0) {
      setTimeout(() => {
        setMessages([{ 
          text: chatbotKnowledge.greetings[0], 
          sender: 'bot' 
        }]);
      }, 500);
    }
  }, [showChatbot]);

  
  const faqs = [
    {
      question: "What is the Uganda Drought Monitoring System?",
      answer: (
        <div className="space-y-2">
          <p>This is an online monitoring platform that provides:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Timely drought data and visualizations</li>
            <li>Early warning alerts</li>
            <li>Historical drought analysis</li>
            <li>District-level drought assessments</li>
          </ul>
          <p>Developed by the Food and Agriculture Organization (FAO) in collaboration with Uganda's National Emergency Coordination and Operations Centre (NECOC).</p>
        </div>
      )
    },
    {
      question: "What datasets are used in the system?",
      answer: (
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold">1. Precipitation Data (CHIRPS)</h4>
            <ul className="list-disc pl-5 text-sm">
              <li>Source: Climate Hazards Group Infrared Precipitation with Station Data</li>
              <li>Resolution: ~5.5km (0.05°)</li>
              <li>Frequency: Daily, aggregated to monthly</li>
              <li>Coverage: 2002 to present</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">2. Temperature Data (MODIS LST)</h4>
            <ul className="list-disc pl-5 text-sm">
              <li>Source: Moderate Resolution Imaging Spectroradiometer</li>
              <li>Resolution: 1km</li>
              <li>Frequency: Daily/8-day composites</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">3. Vegetation Data (NDVI)</h4>
            <ul className="list-disc pl-5 text-sm">
              <li>Source: MODIS and VIIRS satellites</li>
              <li>Resolution: 500m (MODIS), 375m (VIIRS)</li>
              <li>Frequency: 16-day composites</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      question: "How often is the data updated?",
      answer: (
        <div className="space-y-2">
          <p>The system updates monthly with a one-month latency:</p>
          <ul className="list-disc pl-5">
            <li>Data for January becomes available in late February</li>
            <li>February data in late March, etc.</li>
          </ul>
          <p>This delay ensures data quality and completeness from all sources.</p>
          <p className="text-sm text-gray-600">Note: During emergencies, provisional data may be released earlier.</p>
        </div>
      )
    },
    {
      question: "How are drought conditions classified?",
      answer: (
        <div className="space-y-3">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Index Value</th>
                <th className="border p-2">Classification</th>
                <th className="border p-2">Potential Impacts</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">&gt;1.0</td>
                <td className="border p-2">Normal</td>
                <td className="border p-2">No drought conditions</td>
              </tr>
              <tr>
                <td className="border p-2">0.8-1.0</td>
                <td className="border p-2">Mild</td>
                <td className="border p-2">Early drought signs, reduced pasture</td>
              </tr>
              <tr>
                <td className="border p-2">0.6-0.8</td>
                <td className="border p-2">Moderate</td>
                <td className="border p-2">Crop stress, water shortages</td>
              </tr>
              <tr>
                <td className="border p-2">0.4-0.6</td>
                <td className="border p-2">Severe</td>
                <td className="border p-2">Crop failure, livestock distress</td>
              </tr>
              <tr>
                <td className="border p-2">&lt;0.4</td>
                <td className="border p-2">Extreme</td>
                <td className="border p-2">Emergency conditions</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm text-gray-600 mt-2">The Combined Drought Index (CDI) is calculated from precipitation, temperature, and vegetation indicators.</p>
        </div>
      )
    },
    {
      question: "How can I access historical drought data?",
      answer: (
        <div className="space-y-2">
          <p>The system provides historical data back to 2002. To access:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Navigate to the 'Historical Analysis' section</li>
            <li>Select your time period of interest</li>
            <li>Choose geographical area (national, regional, or district-level)</li>
            <li>Download data in CSV or GeoTIFF format</li>
          </ol>
          <p className="text-sm text-blue-600">For bulk historical data requests, please contact the support team.</p>
        </div>
      )
    },
    {
      question: "Who should I contact for technical support?",
      answer: (
        <div className="space-y-2">
          <p>For technical issues or data inquiries:</p>
          <div className="bg-blue-50 p-3 rounded-md">
            <p className="font-medium">Drought Monitoring Support Team</p>
            <p>Email: </p>
            <p>Phone: </p>
            <p className="text-sm mt-1">Available Monday-Friday, 8:00-17:00 EAT</p>
          </div>
          <p className="text-sm text-gray-600">For urgent matters during non-working hours, please use the emergency contact number provided above.</p>
        </div>
      )
    }
  ];

  
  const filteredFaqs = faqs.filter(faq => {
    const questionMatch = faq.question.toLowerCase().includes(searchQuery.toLowerCase());
    const answerMatch = typeof faq.answer === 'string' 
      ? faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      : faq.answer.props.children.toString().toLowerCase().includes(searchQuery.toLowerCase());
    return questionMatch || answerMatch;
  });

 
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Uganda Drought Monitoring System - FAQ</title>
        <meta name="description" content="Frequently Asked Questions about Uganda's Drought Monitoring System" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Header */}
      <header className="bg-[#308DE0] py-8 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Frequently Asked Questions ( FAQ )
            </h1>
            <a className='text-white bg-blue-400 rounded-md px-4' href="/doc.pdf" download="Uganda Drought Monitoring System User Documentation">Click here to Download User Documentation</a>
          </div>
          
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search questions..."
              className="w-full py-3 px-5 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:bg-[#308DE0] text-gray-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search FAQs"
            />
            <button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#308DE0] hover:bg-[#308DE0] text-white p-2 rounded-lg"
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto py-8 px-4">
        {/* FAQ section */}
        <section className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="bg-[#308DE0] px-6 py-4">
            <h2 className="text-xl font-semibold text-white">
              Common Questions
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <div key={index} className="px-6 py-4">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center text-left focus:outline-none group"
                    aria-expanded={activeIndex === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <h3 className="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                      {faq.question}
                    </h3>
                    <svg
                      className={`w-5 h-5 text-gray-500 transform transition-transform ${activeIndex === index ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div 
                    id={`faq-answer-${index}`}
                    className={`mt-3 text-gray-600 overflow-hidden transition-all duration-300 ease-in-out ${activeIndex === index ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    {faq.answer}
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-500">
                  No results found for "{searchQuery}". Try different keywords or ask the chatbot for help.
                </p>
              </div>
            )}
          </div>
        </section>


      </main>

      {/* Chatbot interface */}
      <div className="fixed bottom-6 right-6 z-50">
        {showChatbot && (
          <div className="bg-white rounded-t-xl rounded-bl-xl shadow-2xl w-80 h-[32rem] flex flex-col border border-gray-300 mb-2 transform transition-all duration-300">
            {/* Chat header */}
            <div className="bg-[#308DE0] text-white px-4 py-3 rounded-t-xl flex justify-between items-center">
              <h3 className="font-medium">Drought Monitor Assistant</h3>
              <button 
                onClick={() => setShowChatbot(false)}
                className="text-white hover:text-gray-200 focus:outline-none"
                aria-label="Close chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            {/* Messages area */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <h4 className="font-medium text-gray-700">How can I help you today?</h4>
                  <p className="text-sm text-gray-500 mt-1">Ask about drought data, system features, or get support</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg, i) => (
                    <div key={i}>
                      <div 
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-xs px-4 py-2 rounded-lg ${msg.sender === 'user' 
                            ? 'bg-[#308DE0] text-white rounded-br-none' 
                            : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'}`}
                        >
                          {msg.text.split('\n').map((line, j) => (
                            <p key={j}>{line}</p>
                          ))}
                        </div>
                      </div>
                      {msg.options && msg.options.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-1 mb-3">
                          {msg.options.map((option, k) => (
                            <button
                              key={k}
                              onClick={() => handleQuickReply(option)}
                              className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-full transition-colors"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-200 text-gray-800 px-4 py-2 rounded-lg rounded-bl-none shadow-sm">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
            
            {/* Input area */}
            <div className="p-3 border-t border-gray-200 bg-white rounded-bl-xl">
              <form onSubmit={handleSendMessage} className="flex items-center">
                <input
                  type="text"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  disabled={isTyping}
                  aria-label="Type your message"
                />
                <button
                  type="submit"
                  className="bg-[#308DE0] hover:bg-[#308DE0] text-white px-4 py-2 rounded-r-full disabled:opacity-50 transition-colors"
                  disabled={!inputMessage.trim() || isTyping}
                  aria-label="Send message"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        )}
        
        {/* Chatbot toggle button */}
        <button
          onClick={() => setShowChatbot(!showChatbot)}
          className={`bg-blue-700 hover:bg-[#308DE0] text-white rounded-full p-4 shadow-lg transition-all duration-300 ${showChatbot ? 'rotate-90' : ''}`}
          aria-label="Open chat"
        >
          {showChatbot ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default FAQPage;