import React from 'react';
import { MapPin, Star, Phone, ExternalLink, User, Award } from 'lucide-react';

const DoctorCard = ({ doctor }) => {
  return (
    <div className="glass bg-white/90 rounded-2xl shadow-sm border border-slate-200/60 p-5 hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1 transition-all group relative overflow-hidden h-full flex flex-col">
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-100 rounded-full mix-blend-multiply filter blur-2xl opacity-50 group-hover:bg-accent-100 transition-colors"></div>
      
      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-brand-100 to-brand-50 p-4 rounded-2xl shadow-sm border border-brand-100 group-hover:scale-110 transition-transform">
            <User className="w-7 h-7 text-brand-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 leading-tight group-hover:text-brand-700 transition-colors">{doctor.name}</h3>
            <div className="flex items-center gap-1.5 mt-2 bg-yellow-50 w-max px-2 py-1 rounded-md border border-yellow-100">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-bold text-yellow-700">{doctor.rating || "N/A"}</span>
              <span className="text-yellow-600/70 text-xs font-semibold">({doctor.reviews || 0} reviews)</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-5 space-y-3 text-sm text-slate-600 font-medium flex-1 relative z-10">
        <div className="flex items-start gap-3 group/item">
          <div className="bg-slate-100 p-1.5 rounded-md group-hover/item:bg-brand-50 transition-colors mt-0.5">
            <MapPin className="w-4 h-4 text-slate-500 group-hover/item:text-brand-600 transition-colors" />
          </div>
          <span className="leading-relaxed">{doctor.address}</span>
        </div>
        {doctor.phone && (
          <div className="flex items-center gap-3 group/item">
            <div className="bg-slate-100 p-1.5 rounded-md group-hover/item:bg-brand-50 transition-colors">
               <Phone className="w-4 h-4 text-slate-500 group-hover/item:text-brand-600 transition-colors" />
            </div>
            <span>{doctor.phone}</span>
          </div>
        )}
      </div>
      
      <div className="mt-6 flex gap-3 relative z-10">
        {doctor.google_maps_link ? (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(doctor.name + ' ' + doctor.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-slate-100 hover:bg-brand-600 hover:text-white text-slate-700 text-sm font-bold py-2.5 px-4 rounded-xl text-center transition-all shadow-sm hover:shadow-md"
          >
            Directions
          </a>
        ) : null}
        {doctor.website && (
          <a
            href={doctor.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 flex-1 bg-brand-50 hover:bg-accent-600 hover:text-white text-brand-700 text-sm font-bold py-2.5 px-4 rounded-xl transition-all border border-brand-100 hover:border-transparent shadow-sm hover:shadow-md"
          >
            Website
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
};

export default DoctorCard;
