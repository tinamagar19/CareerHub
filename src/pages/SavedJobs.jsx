import { useSavedJobs } from '../context/SavedJobsContext';
import { featuredJobs } from '../data/mockData';
import JobCard from '../components/JobCard';
import { BookmarkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SavedJobs() {
  const { savedJobs } = useSavedJobs();

  // Filter featured jobs that are saved
  const savedJobDetails = featuredJobs.filter(job => savedJobs.includes(job.id));

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-[calc(100vh-4rem)] pt-8 pb-16 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Saved Jobs</h1>
          <p className="text-slate-600 dark:text-slate-400">View and manage the opportunities you've bookmarked.</p>
        </div>

        {savedJobDetails.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {savedJobDetails.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-12 text-center shadow-sm">
            <div className="w-20 h-20 bg-blue-50 dark:bg-slate-700 text-blue-300 dark:text-slate-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookmarkIcon size={40} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No saved jobs yet</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              Jobs you save will appear here for easy access.
            </p>
            <Link 
              to="/jobs" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-colors inline-block"
            >
              Browse Jobs
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
