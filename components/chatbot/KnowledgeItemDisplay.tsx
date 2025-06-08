
import React from 'react';
import { KnowledgeItem } from '@/types/chatbotTypes';
import { TrashIcon } from '@/lib/chatbotConstants';

interface KnowledgeItemDisplayProps {
  item: KnowledgeItem;
  onDelete: (id: string) => void;
}

const KnowledgeItemDisplay: React.FC<KnowledgeItemDisplayProps> = ({ item, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg shadow hover:bg-slate-600 transition-colors duration-150 ease-in-out">
      <p className="text-slate-200 text-sm flex-grow mr-2 break-words">{item.text}</p>
      <button
        onClick={() => onDelete(item.id)}
        className="p-2 text-slate-400 hover:text-red-400 transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-md"
        aria-label="Delete knowledge item"
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default KnowledgeItemDisplay;
