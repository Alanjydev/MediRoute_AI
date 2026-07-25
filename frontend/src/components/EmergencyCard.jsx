import React from 'react';
import { AlertTriangle, PhoneCall } from 'lucide-react';
import DoctorCard from './DoctorCard';

const EmergencyCard = ({ hospitals }) => {
  return (
    <div className="mt-6 w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex items-start gap-4">
          <div className="bg-red-100 p-3 rounded-full shrink-0">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-red-800 mb-2">Possible Medical Emergency</h2>
            <p className="text-red-700 font-medium mb-4">
              Your symptoms suggest a possible life-threatening condition. Please seek immediate emergency medical attention or call your local emergency number (e.g., 911).
            </p>
            <a 
              href="tel:911" 
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <PhoneCall className="w-5 h-5" />
              Call Emergency Services
            </a>
          </div>
        </div>
      </div>

      {hospitals && hospitals.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4 px-2">Nearest Hospitals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hospitals.slice(0, 4).map((hospital, index) => (
              <DoctorCard key={index} doctor={hospital} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyCard;
