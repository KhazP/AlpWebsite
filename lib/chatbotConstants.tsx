
import React from 'react';

export const GEMINI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';
export const LOCAL_STORAGE_KNOWLEDGE_KEY = 'personalChatbotKnowledgeBase';
export const LOCAL_STORAGE_MESSAGES_KEY = 'personalChatbotMessages';

export const SendIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className || "w-6 h-6"}
  >
    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
  </svg>
);

export const TrashIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className || "w-5 h-5"}
  >
    <path
      fillRule="evenodd"
      d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.347-9Zm5.493 0a.75.75 0 1 0-1.498.058l-.347 9a.75.75 0 0 0 1.498.058l.347-9Z"
      clipRule="evenodd"
    />
  </svg>
);

export const PlusIcon: React.FC<{className?: string}> = ({ className }) => (
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-5 h-5"}>
    <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
  </svg>
);

export const BotIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}>
    <path fillRule="evenodd" d="M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Zm4.125 3.375a.75.75 0 0 0 0 1.5h6.75a.75.75 0 0 0 0-1.5h-6.75Zm-.75 3.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75ZM9 12.75a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5H9Zm1.06 2.625a.75.75 0 0 1 .97-.073l2.25 1.5a.75.75 0 0 1-.97 1.448l-2.25-1.5a.75.75 0 0 1-.073-.97Z" clipRule="evenodd" />
    <path d="M7.125 7.5A1.125 1.125 0 1 0 5.25 8.625h1.875Zm9 0A1.125 1.125 0 1 0 14.25 8.625h1.875Z" />
 </svg>
);

export const UserIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}>
    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
  </svg>
);

export const InfoIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-5 h-5"}>
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
  </svg>
);

export const BrainIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM4.5 19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25c0-1.593-2.502-4.249-5.118-5.06a11.16 11.16 0 0 0-2.264 0c-2.616.811-5.118 3.467-5.118 5.06Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 12.632c.38-.029.756-.051 1.125-.066m2.41 2.457c.224.238.46.468.707.689M9.167 15.17c.247-.221.484-.45.707-.689m-.042-2.452c-.38.029-.756.051-1.125.066M12 21.75a17.932 17.932 0 0 0 5.617-1.033m-11.234 0A17.932 17.932 0 0 1 12 21.75m-6.75-9.368a11.123 11.123 0 0 1 1.096-3.359m11.308 0c.264.449.497.929.692 1.438m-3.084 1.921a5.192 5.192 0 0 0-3.296 0" />
  </svg>
);

export const ChatBubbleIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-2.184-2.183a6.721 6.721 0 0 0-2.184 0l-2.184 2.183v-3.091c-.34-.02-.68-.045-1.02-.072-1.133-.093-1.98-.957-1.98-2.193V10.608c0-.97.616-1.813 1.5-2.097m0 0A7.496 7.496 0 0 1 12 6.75a7.496 7.496 0 0 1 5.372 2.261M9 13.5H3.75m0 0A7.496 7.496 0 0 1 12 3.75a7.496 7.496 0 0 1 8.25 5.25" />
  </svg>
);
