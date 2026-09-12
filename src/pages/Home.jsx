import { Search, MapPin } from 'lucide-react';
import { categories, featuredJobs } from '../data/mockData';
import JobCard from '../components/JobCard';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient text-white pt-20 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Find a job you'll <span className="text-yellow-300">love.</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Discover thousands of job opportunities from top companies and take the next step in your career.
          </p>
          
          {/* Search Box */}
          <div className="bg-white p-2 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row gap-2 max-w-3xl mx-auto">
            <div className="flex items-center flex-1 px-4 py-3 md:py-2">
              <Search className="text-slate-400 mr-3" size={24} />
              <input 
                type="text" 
                placeholder="Job title, keyword, company..." 
                className="w-full bg-transparent border-none focus:outline-none text-slate-800 placeholder-slate-400"
              />
            </div>
            <div className="hidden md:block w-px bg-slate-200 my-2"></div>
            <div className="flex items-center flex-1 px-4 py-3 md:py-2 border-t md:border-t-0 border-slate-100">
              <MapPin className="text-slate-400 mr-3" size={24} />
              <input 
                type="text" 
                placeholder="Location" 
                className="w-full bg-transparent border-none focus:outline-none text-slate-800 placeholder-slate-400"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 md:py-4 px-8 rounded-xl md:rounded-full transition-colors w-full md:w-auto">
              Search Jobs
            </button>
          </div>
          
          {/* Popular Searches */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-2 text-sm text-blue-100">
            <span className="font-medium mr-2">Popular Searches:</span>
            <span className="bg-blue-800/50 hover:bg-blue-800 px-3 py-1.5 rounded-full cursor-pointer transition-colors border border-blue-700/50">Frontend Developer</span>
            <span className="bg-blue-800/50 hover:bg-blue-800 px-3 py-1.5 rounded-full cursor-pointer transition-colors border border-blue-700/50">UI/UX Designer</span>
            <span className="bg-blue-800/50 hover:bg-blue-800 px-3 py-1.5 rounded-full cursor-pointer transition-colors border border-blue-700/50">Software Engineer</span>
            <span className="bg-blue-800/50 hover:bg-blue-800 px-3 py-1.5 rounded-full cursor-pointer transition-colors border border-blue-700/50">Data Analyst</span>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Popular Categories</h2>
            <p className="text-slate-600">Explore jobs across various industries</p>
          </div>
          <Link to="/jobs" className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1">
            View all <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="bg-white border border-slate-200 rounded-2xl p-6 text-center hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group">
              <div className="w-14 h-14 mx-auto bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {/* Simplified icons mapping just for this UI */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">{category.name}</h3>
              <p className="text-sm text-slate-500">{category.jobsCount} jobs</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-slate-50/50 border-t border-slate-100">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Featured Jobs</h2>
            <p className="text-slate-600">Discover the latest opportunities</p>
          </div>
          <Link to="/jobs" className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1">
            Browse all <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {featuredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>
    </div>
  );
}
