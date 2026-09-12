import { useState } from 'react';
import { Search, MapPin, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { featuredJobs } from '../data/mockData';
import JobCard from '../components/JobCard';

export default function Jobs() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="bg-slate-50 min-h-screen pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Search */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Find Your Next Opportunity</h1>
          <p className="text-slate-600 mb-6">Explore thousands of jobs and take the next step in your career.</p>
          
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-2">
            <div className="flex items-center flex-1 px-4 py-3 md:py-2">
              <Search className="text-slate-400 mr-3" size={20} />
              <input 
                type="text" 
                placeholder="Search jobs..." 
                className="w-full bg-transparent border-none focus:outline-none text-slate-800 placeholder-slate-400"
              />
            </div>
            <div className="hidden md:block w-px bg-slate-200 my-2"></div>
            <div className="flex items-center flex-1 px-4 py-3 md:py-2 border-t md:border-t-0 border-slate-100">
              <MapPin className="text-slate-400 mr-3" size={20} />
              <input 
                type="text" 
                placeholder="Location" 
                className="w-full bg-transparent border-none focus:outline-none text-slate-800 placeholder-slate-400"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 md:py-3 px-8 rounded-xl transition-colors md:w-auto w-full">
              Search
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <button 
            className="lg:hidden flex items-center justify-center gap-2 bg-white border border-slate-200 py-3 rounded-xl font-medium text-slate-700"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <SlidersHorizontal size={20} />
            Filters
          </button>

          {/* Left Sidebar - Filters */}
          <div className={`lg:w-1/4 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-lg text-slate-900">Filters</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Clear all</button>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-slate-800 mb-3 flex justify-between items-center cursor-pointer">
                  Location <ChevronDown size={16} />
                </h3>
                <div className="space-y-3">
                  {['Remote', 'Kathmandu', 'Pokhara', 'Butwal', 'Other'].map((item) => (
                    <label key={item} className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300" />
                      <span className="text-slate-600">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Job Type Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-slate-800 mb-3 flex justify-between items-center cursor-pointer">
                  Job Type <ChevronDown size={16} />
                </h3>
                <div className="space-y-3">
                  {['Full-time', 'Part-time', 'Internship', 'Contract'].map((item) => (
                    <label key={item} className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300" />
                      <span className="text-slate-600">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Salary Range Filter */}
              <div>
                <h3 className="font-semibold text-slate-800 mb-3 flex justify-between items-center cursor-pointer">
                  Salary Range <ChevronDown size={16} />
                </h3>
                <div className="space-y-3">
                  {['< $500', '$500 - $1,000', '$1,000 - $2,000', '> $2,000'].map((item) => (
                    <label key={item} className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300" />
                      <span className="text-slate-600">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Area - Job Cards */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <span className="text-slate-600 font-medium">Showing <span className="text-slate-900 font-bold">24</span> jobs</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">Sort by:</span>
                <select className="bg-transparent border-none text-slate-900 font-medium focus:outline-none cursor-pointer">
                  <option>Most Recent</option>
                  <option>Relevant</option>
                  <option>Highest Paid</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {/* Multiplying the mock data to show a list */}
              {featuredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
              {featuredJobs.map((job) => (
                <JobCard key={`dup-${job.id}`} job={job} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <div className="flex gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50">&lt;</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-600 text-white font-medium shadow-sm">1</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium">2</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium">3</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50">&gt;</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
