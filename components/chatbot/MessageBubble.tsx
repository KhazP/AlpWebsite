
import React from 'react';
import { ChatMessage } from '@/types/chatbotTypes';
import { BotIcon, UserIcon } from '@/lib/chatbotConstants';

interface MessageBubbleProps {
  message: ChatMessage;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex items-start gap-3 my-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white">
          <BotIcon className="w-5 h-5" />
        </div>
      )}
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-xl shadow-md break-words ${
          isUser
            ? 'bg-sky-500 text-white rounded-br-none'
            : 'bg-slate-700 text-slate-200 rounded-bl-none'
        }`}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>
        {message.sources && message.sources.length > 0 && (
            <div className="mt-2 pt-2 border-t border-slate-600">
                <h4 className="text-xs font-semibold text-slate-400 mb-1">Sources:</h4>
                <ul className="list-disc list-inside space-y-1">
                    {message.sources.map((source, index) => (
                        <li key={index} className="text-xs">
                            <a 
                                href={source.uri} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-sky-300 hover:text-sky-200 hover:underline break-all"
                            >
                                {source.title || source.uri}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        )}
      </div>
      {isUser && (
         <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-slate-300">
          <UserIcon className="w-5 h-5" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
