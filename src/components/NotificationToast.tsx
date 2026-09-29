import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { notifications, removeNotification } = useApp();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full px-4 pointer-events-none no-print">
      {notifications.map(n => {
        const isSuccess = n.type === 'success';
        const isWarning = n.type === 'warning';

        return (
          <div
            key={n.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-lg shadow-lg border text-sm transition-all ${
              isSuccess
                ? 'bg-slate-900 text-white border-teal-500/40'
                : isWarning
                ? 'bg-amber-950 text-amber-100 border-amber-500/40'
                : 'bg-slate-900 text-white border-blue-500/40'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />}
              {isWarning && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />}
              {!isSuccess && !isWarning && <Info className="w-4 h-4 text-blue-400 shrink-0" />}
              <span className="truncate">{n.message}</span>
            </div>
            <button
              onClick={() => removeNotification(n.id)}
              className="text-slate-400 hover:text-white p-1 transition-colors shrink-0"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
