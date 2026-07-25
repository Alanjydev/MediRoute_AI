import React, { useState } from 'react';
import Hero from './components/Hero';
import Chat from './components/Chat';
import { useLocation } from './hooks/useLocation';

function App() {
  const [started, setStarted] = useState(false);
  const [manualCity, setManualCity] = useState('');
  const { coordinates, locationError, isLoading } = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-brand-100 animate-gradient-x flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-accent-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }} />

      <div className="z-10 w-full flex justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center text-slate-500 gap-4 glass p-10 rounded-3xl">
            <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
            <p className="font-medium text-lg text-brand-800">Acquiring location...</p>
          </div>
        ) : !started ? (
          <div className="w-full max-w-5xl mx-auto">
            <Hero 
              onStart={() => setStarted(true)} 
              manualCity={manualCity} 
              setManualCity={setManualCity} 
              locationError={locationError} 
            />
          </div>
        ) : (
          <div className="w-full max-w-4xl h-[85vh] animate-fade-in-up">
            <Chat 
              coordinates={coordinates} 
              locationError={locationError} 
              manualCity={manualCity}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
