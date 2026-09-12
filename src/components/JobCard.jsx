import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Clock, Bookmark } from 'lucide-react';
import { useState } from 'react';

export default function JobCard({ job }) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl shadow-sm border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
            {job.logo}
          </div>
          <div>
            <Link to={`/jobs/${job.id}`}>
              <h3 className="font-bold text-lg text-slate-900 hover:text-blue-600 transition-colors">{job.title}</h3>
            </Link>
            <p className="text-slate-500 font-medium text-sm">{job.company}</p>
          </div>
        </div>
        <button 
          onClick={() => setSaved(!saved)}
          className={`p-2 rounded-full transition-colors ${saved ? 'text-red-500 bg-red-50' : 'text-slate-400 hover:text-red-500 hover:bg-red-50'}`}
        >
          <Bookmark className={saved ? "fill-current" : ""} size={20} />
        </button>
      </div>

      <div className="flex flex-wrap gap-y-2 gap-x-4 mb-5 text-sm text-slate-600">
        <div className="flex items-center gap-1.5">
          <MapPin size={16} className="text-slate-400" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <DollarSign size={16} className="text-slate-400" />
          <span>{job.salary}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={16} className="text-slate-400" />
          <span>{job.type}</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-slate-100">
        <span className="text-xs font-medium text-slate-400">{job.postedAt}</span>
        <Link 
          to={`/jobs/${job.id}`}
          className="text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
