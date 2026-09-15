import { useApplications } from '../context/ApplicationsContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Building2, CheckCircle, Calendar } from 'lucide-react';
import { useEffect } from 'react';

export default function MyApplications() {
  const { currentUser } = useAuth();
  const { getMyApplications } = useApplications();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const applications = getMyApplications(currentUser.email);

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-[calc(100vh-4rem)] pt-8 pb-16 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">My Applications</h1>
          <p className="text-slate-600 dark:text-slate-400">Track the status of jobs you've applied for.</p>
        </div>

        {applications.length > 0 ? (
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm transition-colors hover:border-blue-200 dark:hover:border-blue-500">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xl shadow-sm border border-blue-100 dark:border-slate-600 flex-shrink-0">
                      {app.company.charAt(0)}
                    </div>
                    <div>
                      <Link to={`/jobs/${app.jobId}`}>
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{app.jobTitle}</h3>
                      </Link>
                      <div className="flex items-center gap-2 mt-1 text-sm text-slate-500 dark:text-slate-400 font-medium">
                        <Building2 size={14} /> {app.company}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-slate-400 dark:text-slate-500">
                        <Calendar size={14} /> Applied: {app.appliedAt}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">
                      <CheckCircle size={14} />
                      {app.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-12 text-center shadow-sm">
            <div className="w-20 h-20 bg-blue-50 dark:bg-slate-700 text-blue-300 dark:text-slate-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase size={40} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No applications yet</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              When you apply for a job, it will show up here.
            </p>
            <Link 
              to="/jobs" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-colors inline-block"
            >
              Find a Job
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
