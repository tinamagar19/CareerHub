import { CheckCircle, XCircle, X } from 'lucide-react';

export default function Toast({ message, type, onClose }) {
  const isSuccess = type === 'success';

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border animate-slide-up transition-all ${
      isSuccess ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'
    }`}>
      {isSuccess ? <CheckCircle size={20} className="text-green-500" /> : <XCircle size={20} className="text-red-500" />}
      <p className="font-medium text-sm">{message}</p>
      <button onClick={onClose} className="ml-2 text-slate-400 hover:text-slate-600">
        <X size={16} />
      </button>
    </div>
  );
}
