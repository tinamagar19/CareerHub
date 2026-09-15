import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { categories, featuredJobs } from '../data/mockData';
import JobCard from '../components/JobCard';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    const q = searchQuery.trim();
    if (q) params.append('query', q);
    navigate(`/jobs?${params.toString()}`);
  };

  const handlePopularSearch = (term) => {
    navigate(`/jobs?query=${encodeURIComponent(term)}`);
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/jobs?query=${encodeURIComponent(categoryName)}`);
  };

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
          <form onSubmit={handleSearch} className="bg-white p-2 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row gap-2 max-w-2xl mx-auto">
            <div className="flex items-center flex-1 px-4 py-3 md:py-2">
              <Search className="text-slate-400 mr-3" size={24} />
              <input 
                type="text" 
                name="keyword"
                autoComplete="off"
                list="job-titles"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Job title, keyword, company..." 
                className="w-full bg-transparent border-none focus:outline-none text-slate-800 placeholder-slate-400"
              />
              <datalist id="job-titles">
                <option value="Frontend Developer" />
                <option value="UI/UX Designer" />
                <option value="Software Engineer" />
                <option value="Data Analyst" />
                <option value="Graphic Design Intern" />
                <option value="Freelance Content Writer" />
                <option value="Customer Support Representative" />
              </datalist>
            </div>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 md:py-4 px-8 rounded-xl md:rounded-full transition-colors w-full md:w-auto">
              Search Jobs
            </button>
          </form>
          
          {/* Popular Searches */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-2 text-sm text-blue-100">
            <span className="font-medium mr-2">Popular Searches:</span>
            {['Frontend Developer', 'UI/UX Designer', 'Software Engineer', 'Data Analyst'].map(term => (
              <span 
                key={term}
                onClick={() => handlePopularSearch(term)}
                className="bg-blue-800/50 hover:bg-blue-800 px-3 py-1.5 rounded-full cursor-pointer transition-colors border border-blue-700/50"
              >
                {term}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-colors duration-200">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">Popular Categories</h2>
            <p className="text-slate-600 dark:text-slate-400">Explore jobs across various industries</p>
          </div>
          <Link to="/jobs" className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 transition-colors">
            View all <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <div 
              key={category.id} 
              onClick={() => handleCategoryClick(category.name)}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 text-center hover:shadow-md hover:border-blue-200 dark:hover:border-blue-500 transition-all cursor-pointer group"
            >
              <div className="w-14 h-14 mx-auto bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {/* Simplified icons mapping just for this UI */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{category.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{category.jobsCount} jobs</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">Featured Jobs</h2>
              <p className="text-slate-600 dark:text-slate-400">Discover the latest opportunities</p>
            </div>
            <Link to="/jobs" className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 transition-colors">
              Browse all <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
