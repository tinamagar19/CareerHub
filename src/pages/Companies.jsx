import { Building2, MapPin, Briefcase } from 'lucide-react';
import { featuredJobs } from '../data/mockData';
import { Link } from 'react-router-dom';

export default function Companies() {
  // Extract unique companies from mockData
  const uniqueCompanies = Array.from(new Set(featuredJobs.map(job => job.company)))
    .map(companyName => {
      const job = featuredJobs.find(j => j.company === companyName);
      return {
        id: companyName, // using name as id for simplicity
        name: companyName,
        logo: job.logo,
        location: job.location,
        jobCount: featuredJobs.filter(j => j.company === companyName).length
      };
    });

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-[calc(100vh-4rem)] pt-8 pb-16 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Top Companies</h1>
          <p className="text-slate-600 dark:text-slate-400">Discover great places to work and find your next career opportunity.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {uniqueCompanies.map((company) => (
            <div key={company.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-500 transition-all duration-300 group">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-2xl shadow-sm border border-blue-100 dark:border-slate-600 mb-4 group-hover:scale-110 transition-transform">
                  {company.logo}
                </div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {company.name}
                </h3>
                
                <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 mb-4">
                  <MapPin size={14} />
                  <span>{company.location}</span>
                </div>
                
                <div className="w-full border-t border-slate-100 dark:border-slate-700 pt-4 mt-2 flex justify-between items-center">
                  <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300">
                    <Briefcase size={16} className="text-slate-400" />
                    <span>{company.jobCount} open {company.jobCount === 1 ? 'job' : 'jobs'}</span>
                  </div>
                  <Link 
                    to={`/jobs?query=${encodeURIComponent(company.name)}`}
                    className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50 dark:bg-slate-700 hover:bg-blue-100 dark:hover:bg-slate-600 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    View Jobs
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
