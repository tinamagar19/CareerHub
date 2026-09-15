import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Clock, Bookmark } from 'lucide-react';
import { useSavedJobs } from '../context/SavedJobsContext';

export default function JobCard({ job }) {
  const { isJobSaved, toggleSavedJob } = useSavedJobs();
  const saved = isJobSaved(job.id);

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSavedJob(job.id);
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-500 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xl shadow-sm border border-blue-100 dark:border-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
            {job.logo}
          </div>
          <div>
            <Link to={`/jobs/${job.id}`}>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{job.title}</h3>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">{job.company}</p>
          </div>
        </div>
        <button 
          onClick={handleSave}
          className={`p-2 rounded-full transition-colors ${saved ? 'text-red-500 bg-red-50 dark:bg-red-900/30' : 'text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30'}`}
        >
          <Bookmark className={saved ? "fill-current" : ""} size={20} />
        </button>
      </div>

      <div className="flex flex-wrap gap-y-2 gap-x-4 mb-5 text-sm text-slate-600 dark:text-slate-400">
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

      <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-700">
        <span className="text-xs font-medium text-slate-400">{job.postedAt}</span>
        <Link 
          to={`/jobs/${job.id}`}
          className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50 dark:bg-slate-700 hover:bg-blue-100 dark:hover:bg-slate-600 px-4 py-2 rounded-lg transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
