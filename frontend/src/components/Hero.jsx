import React from 'react';
import { Activity, ArrowRight, MapPin } from 'lucide-react';

const Hero = ({ onStart, manualCity, setManualCity, locationError }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 animate-fade-in-up">
      <div className="glass p-6 rounded-full mb-8 shadow-xl animate-float">
        <Activity className="w-16 h-16 text-brand-600" />
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold text-slate-800 mb-6 tracking-tight drop-shadow-sm">
        Find the Right Care, <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-accent-500">Right Now.</span>
      </h1>
      <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
        Describe your symptoms and our AI will guide you to the right medical specialist.
        We'll even rank and recommend top-rated doctors near you based on your location.
      </p>

      <div className="glass p-6 rounded-3xl shadow-lg w-full max-w-md mb-8">
        <div className="flex flex-col gap-4">
          <label className="text-left text-sm font-semibold text-slate-700 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-500" />
            Where are you located?
          </label>
          <input 
            type="text" 
            placeholder={locationError ? "Enter city (e.g. New York)" : "Auto-detecting... or type city here"} 
            value={manualCity}
            onChange={(e) => setManualCity(e.target.value)}
            className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white/80 transition-all"
          />
          {locationError && !manualCity && (
            <p className="text-xs text-red-500 text-left">Please enter a city since location access was denied.</p>
          )}
        </div>
      </div>

      <button
        onClick={onStart}
        className="group flex items-center gap-3 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white px-10 py-4 rounded-full text-xl font-bold transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
      >
        Start Consultation
        <div className="bg-white/20 p-1.5 rounded-full group-hover:translate-x-2 transition-transform">
          <ArrowRight className="w-5 h-5" />
        </div>
      </button>
      
      <p className="mt-10 text-sm text-slate-500 max-w-md font-medium">
        Disclaimer: This AI assistant provides general healthcare guidance only and is not a substitute for professional medical advice.
      </p>
    </div>
  );
};

export default Hero;
