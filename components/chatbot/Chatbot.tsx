import React, { useState, useEffect, useRef, useCallback } from 'react';
import { KnowledgeItem, ChatMessage, ChatView } from '@/types/chatbotTypes';
import { LOCAL_STORAGE_KNOWLEDGE_KEY, LOCAL_STORAGE_MESSAGES_KEY, SendIcon, PlusIcon, InfoIcon, BrainIcon, ChatBubbleIcon } from '@/lib/chatbotConstants';
import { generateAnswer } from '@/components/geminiService';
import KnowledgeItemDisplay from './KnowledgeItemDisplay';
import MessageBubble from './MessageBubble';
import LoadingSpinner from './LoadingSpinner';

const predefinedAlpYalayKnowledge: string[] = [
  // Section 1: Professional Summary
  "Alp Yalay is a Translator, Localizer, and developer based in Istanbul, Turkey.",
  "Alp Yalay holds a Bachelor's degree in Translation & Interpretation from Izmir University of Economics.",
  "Alp Yalay's studies included major courses in diplomatic, consecutive, audio-visual, literary, medical, economic, and legal translation.",
  "Alp Yalay's primary area of expertise is video game localization, combining linguistic skills with technical knowledge.",
  "Alp Yalay is passionate about bridging the gap between language and technology.",
  "Alp Yalay employs a 'Hybrid Translation Methodology,' integrating manual translation with AI-assisted editing and verification.",
  "Contact Email: alpyalay@gmail.com",
  "Contact GitHub: github.com/KhazP (https://github.com/KhazP)",
  "Contact LinkedIn: linkedin.com/in/alpyalay (https://linkedin.com/in/alpyalay)",
  "Contact Website: alpyalay.org (https://alpyalay.org)",

  // Section 2.1: Translation & Localization
  "Expertise in Video Game Localization: Adapting games for Turkish audiences (UI, dialogue, cultural references).",
  "Proficient in Technical Translation: Translating technical documentation and software content.",
  "Experience in Legal & Economic Translation: Working with legal and financial documents.",
  "Specialized Academic Training: University coursework in diplomatic, consecutive, audio-visual, literary, medical, economic, legal, media, and computer-assisted translation.",
  "Skilled in Website Localization: Adapting web content for different locales.",
  "Proficient in Subtitling & Transcreation: Creating subtitles and creatively adapting content.",
  "Meticulous in Post-editing & Proofreading: Review and correction of translated text.",
  "Focus on Quality Assurance (QA): Ensuring linguistic and functional quality of localized products.",
  "Expert in Terminology Management: Creating and maintaining consistent glossaries and termbases.",
  "Utilizes Machine Translation: Leveraging MT and AI tools to enhance translation workflows.",

  // Section 2.2: Technical Skills
  "Software/Tools Proficiency: SDL Trados, CAT Tools, Microsoft Office Suite, Adobe Photoshop, DaVinci Resolve, SubtitleEdit.",
  "Programming Languages: Python.",
  "Programming Frameworks/Libraries: Flet, PyQt6.",
  "Programming Concepts: AI-Aided Programming ('Vibe Coding'), Localization Engineering, Automation.",
  "AI Development Experience: Creating specialized AI assistants (GPTs) and leveraging LLMs (Gemini, Claude) for translation and editing.",

  // Section 2.3: Management & Soft Skills
  "Soft Skills: Project Management & Planning, Team Leadership, Cross-Cultural Communication, Customer Service & Satisfaction, Research Skills, Teamwork, Social Media Management, Web Content Writing.",

  // Section 3.1: Software & AI Projects
  "Project - Localization Comparison Tool: Open-source Python/Flet app for comparing localization files (CSV, XML, LANG, JSON) to identify changes. GitHub: https://github.com/KhazP/Localization-Comparison-Tool",
  "Project - AutoTidy: Python/PyQt6 utility for Windows/Linux to automatically organize folders by moving files to dated 'Cleanup' folders. GitHub: https://github.com/KhazP/AutoTidy",
  "Project - F1 Regulations Assistant GPTs: AI assistant for F1 regulations (2024-2026) using official FIA docs, can analyze images. Links: ChatGPT - https://chatgpt.com/g/g-eaNLvlHI7-f1-regulations-assistant, Gemini - https://gemini.google.com/gem/7016463ffba5",

  // Section 3.2: Translation & Localization Projects
  "Project - Heroes of Hammerwatch II (Fan Translation): Translator ensuring consistency, stylistic integrity. Hybrid approach (manual + AI post-editing). Status: Ongoing polish. Link: https://steamcommunity.com/app/1781750/workshop/",
  "Project - Battle Talent (Official Turkish Localization): For CyDream Technologies. Physics-based VR game. Platform: Steam VR, Meta Quest. Timeline: Jan 2021 - Present. Volume: ~14,700 words. Links: Steam - https://store.steampowered.com/app/1325900/Battle_Talent/, Case Study - https://alpyalay.org/CaseStudyPage/battle-talent-case-study.html",
  "Battle Talent Case Study - Challenge: Indirect source text (Chinese -> English -> Turkish), basic Google Sheets instead of CAT tools, limited testing.",
  "Battle Talent Case Study - Solution: 'Hybrid Translation Methodology' using AI (Gemini 1.5 Pro) for consistency scans.",
  "Battle Talent Case Study - Impact: Full Turkish localization, strong developer relationship, solidified game localization career path.",
  
  // Section 3.3: Web Development Projects & Portfolio Details
  "Portfolio Tech Stack: Personal website (alpyalay.org) built with Next.js, TypeScript, React & Framer Motion (animations), Tailwind CSS, and React Three Fiber (3D elements).",
  "Portfolio Internationalization: The portfolio supports both English and Turkish.",
  "Web Project - Can Maden Website: A custom website for an artist.",
  "Web Project - Sait Maden Archival Website: A static site preserving graphic designer Sait Maden's work.",

  // Section 4: Professional Experience
  "Experience - Junior Social Media Manager, Muse İstanbul (Apr 2024 - Aug 2024): Managed iGA Istanbul Airport's social media, creative writing, translated posts for airport & CEO.",
  "Experience - Barista, Waiter, Cashier, Asma Yaprağı (Jul 2015 - Sep 2021): Various roles, cash-flow management, restaurant management.",
  "Experience - Intern, Şafak Tercüme (Feb 2021 - Mar 2021): 20-day internship in professional translation agency workflows.",

  // Section 5: Education & Certifications
  "Education - Izmir University of Economics (2018 - 2022): Bachelor's in Translation and Interpreting, GPA: 2.86.",
  "Education - Pera Güzel Sanatlar Lisesi (2014 - 2018): High School Diploma, Art/Art Studies, General.",
  "Education - Sisli Terakki Lisesi (2005 - 2014): Primary, Middle School, 9th Grade.",
  "Education - Robert College (2001 - 2005): Kindergarten.",
  "Certification - TOEFL iBT® Score: 92.",
  "Certification - Certificate of Achievement: Honourable Mention, 'Polymaths in the Republican Era Poster Exhibition' (May 2022).",
  "Certification - Microsoft Office Specialist (MOS) (2010).",
  
  // Section 6: Methodology & Approach
  "Follows a Hybrid Translation Methodology combining human expertise with technology.",
  "Methodology Step 1 - Manual Translation: Initial translation using linguistic and cultural knowledge.",
  "Methodology Step 2 - AI-Assisted Editing: Advanced AI (Claude, Gemini Pro) for consistency and speed in editing.",
  "Methodology Step 3 - Manual Verification: Technical background used for accuracy and implementation verification (software/games).",
  
  // Additional Details from OCR Pages 1 & 2
  "Maintains a strong digital presence: portfolio website (alpyalay.org), LinkedIn (alpyalay), GitHub (KhazP), X (@alpyalay).",
  "Digital Presence - X (Twitter @alpyalay): Active since Sep 2014, engages with translation/localization community.",
  "Digital Presence - GitHub (KhazP): Hosts portfolio source code and specialized localization tools.",
  "Digital Presence - Community Engagement: Communicates with developers/translators on platforms like Discord.",
  "Technical Skills - AI & Prompt Engineering: Maintains a vibe-coding-prompt-template repository for AI tools and prompt engineering.",
  "Methodology - Research-Driven Process: Uses online dictionaries, cross-references localized games, AI for obscure terminology.",
  "Methodology - Commitment to Quality: Meticulous terminology management, personal glossaries, dedication to post-update LQA.",
  "Career Development - Continuous Improvement: Recognizes skill improvement over time, revisits earlier translations to update them.",
  "Career Development - Future Potential: Linguistic expertise + technical skills position him for specialized technical translation or consulting."
];


const Chatbot: React.FC = () => {
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [newKnowledgeText, setNewKnowledgeText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);
  const [activeView, setActiveView] = useState<ChatView>(ChatView.KNOWLEDGE);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof process.env.NEXT_PUBLIC_API_KEY === 'undefined' || process.env.NEXT_PUBLIC_API_KEY === '' || process.env.NEXT_PUBLIC_API_KEY === "MISSING_API_KEY" || process.env.NEXT_PUBLIC_API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
      setApiKeyMissing(true);
      setError("Gemini API Key is not configured. Please set it to use the chatbot features.");
    } else {
      setApiKeyMissing(false);
      setError(null);
    }

    try {
      const storedKnowledge = localStorage.getItem(LOCAL_STORAGE_KNOWLEDGE_KEY);
      if (storedKnowledge) {
        setKnowledgeItems(JSON.parse(storedKnowledge).map((item: KnowledgeItem) => ({...item, createdAt: new Date(item.createdAt)})));
      } else {
        // Seed with predefined knowledge if local storage is empty
        const initialKnowledge: KnowledgeItem[] = predefinedAlpYalayKnowledge.map((text, index) => ({
          id: `predefined-${Date.now()}-${index}`,
          text: text,
          createdAt: new Date()
        }));
        setKnowledgeItems(initialKnowledge);
        localStorage.setItem(LOCAL_STORAGE_KNOWLEDGE_KEY, JSON.stringify(initialKnowledge));
      }

      const storedMessages = localStorage.getItem(LOCAL_STORAGE_MESSAGES_KEY);
      if (storedMessages) {
        setChatMessages(JSON.parse(storedMessages).map((msg: ChatMessage) => ({...msg, timestamp: new Date(msg.timestamp)})));
      } else {
         // Add initial bot message if no history
        setChatMessages([{
          id: Date.now().toString(),
          sender: 'bot',
          text: "Hello! I'm pre-loaded with information about Alp Yalay. Ask me anything about his skills, experience, or projects. You can also add more information in the 'My Knowledge' section.",
          timestamp: new Date()
        }]);
      }
    } catch (e) {
      console.error("Failed to parse from localStorage", e);
      setError("There was an issue loading your saved data. It might be corrupted.");
    }
  }, []);

  useEffect(() => {
    try {
        localStorage.setItem(LOCAL_STORAGE_KNOWLEDGE_KEY, JSON.stringify(knowledgeItems));
    } catch (e) {
        console.error("Failed to save knowledge to localStorage", e);
        setError("Could not save knowledge data. LocalStorage might be full or disabled.");
    }
  }, [knowledgeItems]);

  useEffect(() => {
    try {
        localStorage.setItem(LOCAL_STORAGE_MESSAGES_KEY, JSON.stringify(chatMessages));
    } catch (e) {
        console.error("Failed to save messages to localStorage", e);
        setError("Could not save chat history. LocalStorage might be full or disabled.");
    }
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleAddKnowledge = () => {
    if (newKnowledgeText.trim() === '') return;
    const newItem: KnowledgeItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2,9),
      text: newKnowledgeText.trim(),
      createdAt: new Date(),
    };
    setKnowledgeItems(prev => [newItem, ...prev]);
    setNewKnowledgeText('');
    
    // Add a confirmation message to chat
    const confirmationMsg: ChatMessage = {
        id: Date.now().toString() + '_knowledge_confirm',
        sender: 'bot',
        text: `Okay, I've learned: "${newItem.text.substring(0,50)}${newItem.text.length > 50 ? '...' : ''}"`,
        timestamp: new Date(),
    };
    setChatMessages(prev => [...prev, confirmationMsg]);
  };

  const handleDeleteKnowledge = (id: string) => {
    const itemToDelete = knowledgeItems.find(item => item.id === id);
    setKnowledgeItems(prev => prev.filter(item => item.id !== id));

    if (itemToDelete) {
        const confirmationMsg: ChatMessage = {
            id: Date.now().toString() + '_knowledge_delete',
            sender: 'bot',
            text: `I've forgotten: "${itemToDelete.text.substring(0,50)}${itemToDelete.text.length > 50 ? '...' : ''}"`,
            timestamp: new Date(),
        };
        setChatMessages(prev => [...prev, confirmationMsg]);
    }
  };

  const handleSendMessage = useCallback(async () => {
    if (userInput.trim() === '' || isLoading || apiKeyMissing) return;

    const newUserMessage: ChatMessage = {
      id: Date.now().toString() + Math.random().toString(36).substring(2,9),
      sender: 'user',
      text: userInput.trim(),
      timestamp: new Date(),
    };
    setChatMessages(prev => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);
    setError(null);

    try {
      const { text: botResponseText, sources } = await generateAnswer(newUserMessage.text, knowledgeItems);
      const botMessage: ChatMessage = {
        id: Date.now().toString() + '_bot_response' + Math.random().toString(36).substring(2,9),
        sender: 'bot',
        text: botResponseText,
        timestamp: new Date(),
        sources: sources,
      };
      setChatMessages(prev => [...prev, botMessage]);
    } catch (e: any) {
      const errorMessage: ChatMessage = {
        id: Date.now().toString() + '_error',
        sender: 'bot',
        text: `Sorry, I encountered an error: ${e.message || 'Unknown error'}`,
        timestamp: new Date(),
      };
      setChatMessages(prev => [...prev, errorMessage]);
      setError(e.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInput, isLoading, knowledgeItems, apiKeyMissing]);


  return (
    <div className="bg-slate-800 shadow-2xl rounded-xl overflow-hidden flex flex-col h-[calc(100vh-12rem)] max-h-[700px]">
      {apiKeyMissing && (
        <div className="p-4 bg-red-500 text-white text-center text-sm flex items-center justify-center gap-2">
          <InfoIcon className="w-5 h-5"/> API Key is not configured. Chat functionality is disabled.
        </div>
      )}
      {error && !apiKeyMissing && (
         <div className="p-3 bg-yellow-500 text-yellow-900 text-center text-xs flex items-center justify-center gap-2">
          <InfoIcon className="w-4 h-4"/> Error: {error}
        </div>
      )}

      <div className="flex border-b border-slate-700">
        <button 
          onClick={() => setActiveView(ChatView.KNOWLEDGE)}
          className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors duration-150 ease-in-out
            ${activeView === ChatView.KNOWLEDGE ? 'bg-slate-700 text-sky-400' : 'text-slate-400 hover:bg-slate-700/50 hover:text-sky-300'}`}
        >
          <BrainIcon className="w-5 h-5" /> My Knowledge
        </button>
        <button 
          onClick={() => setActiveView(ChatView.CHAT)}
          className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors duration-150 ease-in-out
            ${activeView === ChatView.CHAT ? 'bg-slate-700 text-sky-400' : 'text-slate-400 hover:bg-slate-700/50 hover:text-sky-300'}`}
        >
          <ChatBubbleIcon className="w-5 h-5" /> Chat
        </button>
      </div>
      
      {activeView === ChatView.KNOWLEDGE && (
        <div className="p-6 flex-grow overflow-y-auto space-y-6 bg-slate-800/50">
          <div>
            <label htmlFor="newKnowledge" className="block text-sm font-medium text-slate-300 mb-1">
              Add something you want me to remember:
            </label>
            <div className="flex gap-2">
              <textarea
                id="newKnowledge"
                rows={3}
                value={newKnowledgeText}
                onChange={e => setNewKnowledgeText(e.target.value)}
                placeholder="e.g., My favorite color is blue."
                className="flex-grow p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow"
              />
              <button
                onClick={handleAddKnowledge}
                disabled={!newKnowledgeText.trim()}
                className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <PlusIcon className="w-5 h-5 mr-1" /> Add
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-slate-300 mb-3">Things I Know About You:</h3>
            {knowledgeItems.length === 0 ? (
              <p className="text-slate-500 italic">I don't know anything about you yet. Add some facts above!</p>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                {knowledgeItems.map(item => (
                  <KnowledgeItemDisplay key={item.id} item={item} onDelete={handleDeleteKnowledge} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeView === ChatView.CHAT && (
         <div className="flex flex-col flex-grow overflow-hidden"> {/* Parent flex container for chat */}
            <div ref={chatContainerRef} className="flex-grow p-4 space-y-2 overflow-y-auto bg-slate-800/30">
                {chatMessages.map(msg => (
                <MessageBubble key={msg.id} message={msg} />
                ))}
                {isLoading && (
                <div className="flex justify-start pl-12"> {/* Aligns with bot messages */}
                    <LoadingSpinner size="w-5 h-5" />
                </div>
                )}
            </div>
            <div className="p-4 border-t border-slate-700 bg-slate-800">
                <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={userInput}
                    onChange={e => setUserInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && !isLoading && handleSendMessage()}
                    placeholder={apiKeyMissing ? "API Key not set" : "Ask me anything..."}
                    className="flex-grow p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow"
                    disabled={isLoading || apiKeyMissing}
                />
                <button
                    onClick={handleSendMessage}
                    disabled={isLoading || userInput.trim() === '' || apiKeyMissing}
                    className="p-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Send message"
                >
                    <SendIcon className="w-5 h-5" />
                </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
