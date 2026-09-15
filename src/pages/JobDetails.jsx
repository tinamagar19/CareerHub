import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { featuredJobs } from '../data/mockData';
import { MapPin, DollarSign, Clock, Bookmark, Share2, Briefcase, ChevronLeft, Building2, Globe, Users, Calendar, X } from 'lucide-react';
import { useSavedJobs } from '../context/SavedJobsContext';
import { useApplications } from '../context/ApplicationsContext';
import { useAuth } from '../context/AuthContext';

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = featuredJobs.find(j => j.id === parseInt(id));
  
  const { isJobSaved, toggleSavedJob } = useSavedJobs();
  const { applyForJob, hasApplied } = useApplications();
  const { currentUser } = useAuth();
  
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    resume: '',
    coverLetter: ''
  });

  if (!job) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Job Not Found</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">The job you are looking for does not exist or has been removed.</p>
          <Link to="/jobs" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg">Back to Jobs</Link>
        </div>
      </div>
    );
  }

  const saved = isJobSaved(job.id);
  const alreadyApplied = currentUser ? hasApplied(job.id, currentUser.email) : false;

  const handleApplyClick = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setShowApplyModal(true);
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (applyForJob(job, formData)) {
      setShowApplyModal(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pt-8 pb-16 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-5xl mx-auto">
        
        <Link to="/jobs" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 mb-6 transition-colors">
          <ChevronLeft size={16} className="mr-1" />
          Back to jobs
        </Link>

        {/* Header Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-700 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-2xl shadow-sm border border-blue-100 dark:border-slate-600 flex-shrink-0 transition-colors">
              {job.logo}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">{job.title}</h1>
              <div className="text-lg text-slate-600 dark:text-slate-300 font-medium mb-4">{job.company}</div>
              
              <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <MapPin size={16} className="text-slate-400" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Briefcase size={16} className="text-slate-400" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <DollarSign size={16} className="text-slate-400" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={16} className="text-slate-400" />
                  <span>Posted {job.postedAt}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 md:flex-col md:w-40 flex-shrink-0">
            <button 
              onClick={handleApplyClick}
              disabled={alreadyApplied}
              className={`flex-1 font-semibold py-3 px-4 rounded-xl transition-colors shadow-sm text-center ${
                alreadyApplied 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200 dark:shadow-none'
              }`}
            >
              {alreadyApplied ? 'Applied' : 'Apply Now'}
            </button>
            <button 
              onClick={() => toggleSavedJob(job.id)}
              className={`flex-1 font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 border ${
                saved 
                ? 'bg-red-50 border-red-200 text-red-600 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400' 
                : 'bg-white border-slate-200 hover:border-blue-600 hover:text-blue-600 text-slate-700 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300 dark:hover:border-blue-400 dark:hover:text-blue-400'
              }`}
            >
              <Bookmark className={saved ? "fill-current" : ""} size={18} />
              <span>{saved ? 'Saved' : 'Save Job'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Job Description</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                {job.description}
              </p>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Responsibilities</h2>
              <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 mb-8 ml-2">
                {job.responsibilities.map((req, idx) => (
                  <li key={idx} className="leading-relaxed">{req}</li>
                ))}
              </ul>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Requirements</h2>
              <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 mb-8 ml-2">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="leading-relaxed">{req}</li>
                ))}
              </ul>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Benefits</h2>
              <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 ml-2">
                <li>Competitive salary package</li>
                <li>Health insurance and medical benefits</li>
                <li>Flexible working hours</li>
                <li>Professional development budget</li>
                <li>Regular team building events</li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Info */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
              <h3 className="font-bold text-slate-900 dark:text-white mb-6">About Company</h3>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-400">
                  <Building2 size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">{job.company}</h4>
                  <a href="#" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">View profile</a>
                </div>
              </div>
              
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
                {job.company} is a leading tech company focused on creating innovative solutions that impact millions of users worldwide.
              </p>

              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <Globe size={16} className="text-slate-400" />
                  <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline">www.{job.company.toLowerCase()}.com</a>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <Users size={16} className="text-slate-400" />
                  <span>100-500 Employees</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <Calendar size={16} className="text-slate-400" />
                  <span>Founded 2015</span>
                </div>
              </div>
            </div>

            {/* Share */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Share this job</h3>
              <div className="flex gap-3">
                <button className="flex-1 bg-slate-50 dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 transition-colors flex items-center justify-center">
                  <Share2 size={18} />
                </button>
                <button className="flex-1 bg-slate-50 dark:bg-slate-700 hover:bg-[#1DA1F2]/10 text-slate-600 dark:text-slate-300 hover:text-[#1DA1F2] dark:hover:text-[#1DA1F2] py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 transition-colors flex items-center justify-center font-medium">
                  Twitter
                </button>
                <button className="flex-1 bg-slate-50 dark:bg-slate-700 hover:bg-[#0A66C2]/10 text-slate-600 dark:text-slate-300 hover:text-[#0A66C2] dark:hover:text-[#0A66C2] py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 transition-colors flex items-center justify-center font-medium">
                  LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg border border-slate-200 dark:border-slate-700 overflow-hidden animate-slide-up">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Apply for {job.title}</h3>
              <button onClick={() => setShowApplyModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    name="fullName"
                    required 
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    required 
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required 
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Resume (Link or text)</label>
                  <input 
                    type="text" 
                    name="resume"
                    required 
                    value={formData.resume}
                    onChange={handleChange}
                    placeholder="https://link-to-resume.com"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Cover Letter</label>
                  <textarea 
                    name="coverLetter"
                    rows="4" 
                    value={formData.coverLetter}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 resize-none" 
                  ></textarea>
                </div>
                <div className="pt-4 flex gap-3">
                  <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors">
                    Submit Application
                  </button>
                  <button type="button" onClick={() => setShowApplyModal(false)} className="flex-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-medium py-2.5 rounded-lg transition-colors">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
