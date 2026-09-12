import { useParams, Link } from 'react-router-dom';
import { featuredJobs } from '../data/mockData';
import { MapPin, DollarSign, Clock, Bookmark, Share2, Briefcase, ChevronLeft, Building2, Globe, Users, Calendar } from 'lucide-react';

export default function JobDetails() {
  const { id } = useParams();
  // In a real app, fetch based on id. For now, just use the first featured job if not found
  const job = featuredJobs.find(j => j.id === parseInt(id)) || featuredJobs[0];

  return (
    <div className="bg-slate-50 min-h-screen pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        <Link to="/jobs" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 mb-6 transition-colors">
          <ChevronLeft size={16} className="mr-1" />
          Back to jobs
        </Link>

        {/* Header Card */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-2xl shadow-sm border border-blue-100 flex-shrink-0">
              {job.logo}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{job.title}</h1>
              <div className="text-lg text-slate-600 font-medium mb-4">{job.company}</div>
              
              <div className="flex flex-wrap gap-4 text-sm text-slate-600">
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
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors shadow-sm shadow-blue-200 text-center">
              Apply Now
            </button>
            <button className="flex-1 bg-white border border-slate-200 hover:border-blue-600 hover:text-blue-600 text-slate-700 font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2">
              <Bookmark size={18} />
              <span>Save Job</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Job Description</h2>
              <p className="text-slate-600 leading-relaxed mb-8">
                {job.description}
              </p>

              <h2 className="text-xl font-bold text-slate-900 mb-4">Responsibilities</h2>
              <ul className="list-disc list-inside space-y-2 text-slate-600 mb-8 ml-2">
                {job.responsibilities.map((req, idx) => (
                  <li key={idx} className="leading-relaxed">{req}</li>
                ))}
              </ul>

              <h2 className="text-xl font-bold text-slate-900 mb-4">Requirements</h2>
              <ul className="list-disc list-inside space-y-2 text-slate-600 mb-8 ml-2">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="leading-relaxed">{req}</li>
                ))}
              </ul>

              <h2 className="text-xl font-bold text-slate-900 mb-4">Benefits</h2>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-2">
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
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-6">About Company</h3>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-400">
                  <Building2 size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">{job.company}</h4>
                  <a href="#" className="text-sm text-blue-600 hover:underline">View profile</a>
                </div>
              </div>
              
              <p className="text-sm text-slate-600 mb-6">
                {job.company} is a leading tech company focused on creating innovative solutions that impact millions of users worldwide.
              </p>

              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3 text-slate-600">
                  <Globe size={16} className="text-slate-400" />
                  <a href="#" className="hover:text-blue-600 hover:underline">www.{job.company.toLowerCase()}.com</a>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Users size={16} className="text-slate-400" />
                  <span>100-500 Employees</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Calendar size={16} className="text-slate-400" />
                  <span>Founded 2015</span>
                </div>
              </div>
            </div>

            {/* Share */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Share this job</h3>
              <div className="flex gap-3">
                <button className="flex-1 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 py-2.5 rounded-xl border border-slate-200 transition-colors flex items-center justify-center">
                  <Share2 size={18} />
                </button>
                <button className="flex-1 bg-slate-50 hover:bg-[#1DA1F2]/10 text-slate-600 hover:text-[#1DA1F2] py-2.5 rounded-xl border border-slate-200 transition-colors flex items-center justify-center font-medium">
                  Twitter
                </button>
                <button className="flex-1 bg-slate-50 hover:bg-[#0A66C2]/10 text-slate-600 hover:text-[#0A66C2] py-2.5 rounded-xl border border-slate-200 transition-colors flex items-center justify-center font-medium">
                  LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
