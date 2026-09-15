import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, SlidersHorizontal, ChevronDown, Frown } from 'lucide-react';
import { featuredJobs } from '../data/mockData';
import JobCard from '../components/JobCard';

export default function Jobs() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Clean up potential URL autofill
  const cleanQuery = (q) => {
    if (!q) return '';
    const trimmed = q.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.includes('localhost')) {
      return '';
    }
    return trimmed;
  };

  const queryParam = cleanQuery(searchParams.get('query'));
  
  // Local states for inputs (so they only filter when clicking search)
  const [localQuery, setLocalQuery] = useState(queryParam);

  // Sync local state when URL changes (e.g. from Home page or popular tags)
  useEffect(() => {
    setLocalQuery(cleanQuery(searchParams.get('query')));
  }, [searchParams]);
  
  // Filter states
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [selectedSalaries, setSelectedSalaries] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 3; 

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    
    const finalQuery = cleanQuery(localQuery);
    if (finalQuery) {
      params.set('query', finalQuery);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const handleSingleSelectChange = (setter, value) => {
    setter(prev => prev.includes(value) ? [] : [value]);
  };

  const clearFilters = () => {
    setSelectedLocations([]);
    setSelectedJobTypes([]);
    setSelectedSalaries([]);
    setSearchParams(new URLSearchParams());
    setLocalQuery('');
  };

  // Filter Logic
  const filteredJobs = useMemo(() => {
    const q = queryParam.toLowerCase();
    
    return featuredJobs.filter(job => {
      // Search matching (Title, Company, Keyword, Location)
      const matchesSearch = q === '' || 
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.description.toLowerCase().includes(q) ||
        job.type.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q);
        
      // Checkbox location filtering
      const matchesLocation = selectedLocations.length === 0 || selectedLocations.some(l => job.location.toLowerCase().includes(l.toLowerCase()) || (l === 'Other' && !['remote', 'kathmandu', 'pokhara', 'butwal'].includes(job.location.toLowerCase())));
      
      const matchesJobType = selectedJobTypes.length === 0 || selectedJobTypes.includes(job.type);
      
      // Robust salary matching for mock data
      const matchesSalary = selectedSalaries.length === 0 || selectedSalaries.some(sal => {
        const s = job.salary;
        if (sal === '< NPR 40K') return s.includes('15K') || s.includes('20K') || s.includes('25K') || s.includes('30K') || s.includes('35K');
        if (sal === 'NPR 40K - 60K') return s.includes('40K') || s.includes('45K') || s.includes('50K');
        if (sal === 'NPR 60K - 90K') return s.includes('60K') || s.includes('65K') || s.includes('70K') || s.includes('80K') || s.includes('90K');
        if (sal === '> NPR 90K') return s.includes('100K') || s.includes('120K') || s.includes('150K');
        return false;
      });

      return matchesSearch && matchesLocation && matchesJobType && matchesSalary;
    });
  }, [queryParam, selectedLocations, selectedJobTypes, selectedSalaries]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredJobs.length]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-[calc(100vh-4rem)] pt-8 pb-16 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Search */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Find Your Next Opportunity</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Explore thousands of jobs and take the next step in your career.</p>
          
          <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-6 transition-colors">
            {/* Search Input Box */}
            <div className="flex-1 flex flex-col sm:flex-row gap-2">
              <div className="flex items-center flex-1 px-4 py-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all cursor-text">
                <Search className="text-slate-400 mr-3" size={20} />
                <input 
                  type="text"
                  name="keyword"
                  autoComplete="off"
                  list="job-titles"
                  value={localQuery}
                  onChange={(e) => setLocalQuery(e.target.value)}
                  placeholder="Search jobs..." 
                  className="w-full bg-transparent border-none focus:outline-none text-slate-800 dark:text-white placeholder-slate-400"
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
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors shadow-sm whitespace-nowrap">
                Search
              </button>
            </div>
          </form>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <button 
            className="lg:hidden flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-3 rounded-xl font-medium text-slate-700 dark:text-slate-300"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <SlidersHorizontal size={20} />
            Filters
          </button>

          {/* Left Sidebar - Filters */}
          <div className={`lg:w-1/4 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 sticky top-24 transition-colors">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-lg text-slate-900 dark:text-white">Filters</h2>
                <button onClick={clearFilters} className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">Clear all</button>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 flex justify-between items-center cursor-pointer">
                  Location <ChevronDown size={16} />
                </h3>
                <div className="space-y-3">
                  {['Remote', 'Kathmandu', 'Pokhara', 'Butwal', 'Biratnagar', 'Chitwan', 'Other'].map((item) => (
                    <label key={item} className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={selectedLocations.includes(item)}
                        onChange={() => handleSingleSelectChange(setSelectedLocations, item)}
                        className="w-4 h-4 rounded-full text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-600 dark:bg-slate-700" 
                      />
                      <span className="text-slate-600 dark:text-slate-400">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Job Type Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 flex justify-between items-center cursor-pointer">
                  Job Type <ChevronDown size={16} />
                </h3>
                <div className="space-y-3">
                  {['Full Time', 'Part Time', 'Internship', 'Contract', 'Freelance'].map((item) => (
                    <label key={item} className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={selectedJobTypes.includes(item)}
                        onChange={() => handleSingleSelectChange(setSelectedJobTypes, item)}
                        className="w-4 h-4 rounded-full text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-600 dark:bg-slate-700" 
                      />
                      <span className="text-slate-600 dark:text-slate-400">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Salary Range Filter */}
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 flex justify-between items-center cursor-pointer">
                  Salary Range <ChevronDown size={16} />
                </h3>
                <div className="space-y-3">
                  {['< NPR 40K', 'NPR 40K - 60K', 'NPR 60K - 90K', '> NPR 90K'].map((item) => (
                    <label key={item} className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={selectedSalaries.includes(item)}
                        onChange={() => handleSingleSelectChange(setSelectedSalaries, item)} 
                        className="w-4 h-4 rounded-full text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-600 dark:bg-slate-700" 
                      />
                      <span className="text-slate-600 dark:text-slate-400">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Area - Job Cards */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Showing <span className="text-slate-900 dark:text-white font-bold">{filteredJobs.length}</span> jobs</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500 dark:text-slate-400">Sort by:</span>
                <select className="bg-transparent border-none text-slate-900 dark:text-white font-medium focus:outline-none cursor-pointer dark:bg-slate-800">
                  <option>Most Recent</option>
                  <option>Relevant</option>
                  <option>Highest Paid</option>
                </select>
              </div>
            </div>

            {/* Active Filters Chips */}
            {(queryParam || selectedLocations.length > 0 || selectedJobTypes.length > 0 || selectedSalaries.length > 0) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {queryParam && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-lg text-sm font-medium transition-colors">
                    <Search size={14} /> &quot;{queryParam}&quot;
                    <button 
                      onClick={() => {
                        const params = new URLSearchParams(searchParams);
                        params.delete('query');
                        setSearchParams(params);
                      }} 
                      className="ml-1 hover:text-blue-900 dark:hover:text-blue-100"
                    >
                      &times;
                    </button>
                  </span>
                )}
                {selectedLocations.map(loc => (
                  <span key={loc} className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium transition-colors">
                    {loc}
                    <button onClick={() => handleSingleSelectChange(setSelectedLocations, loc)} className="ml-1 hover:text-slate-900 dark:hover:text-white">&times;</button>
                  </span>
                ))}
                {selectedJobTypes.map(type => (
                  <span key={type} className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium transition-colors">
                    {type}
                    <button onClick={() => handleSingleSelectChange(setSelectedJobTypes, type)} className="ml-1 hover:text-slate-900 dark:hover:text-white">&times;</button>
                  </span>
                ))}
                {selectedSalaries.map(sal => (
                  <span key={sal} className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium transition-colors">
                    {sal}
                    <button onClick={() => handleSingleSelectChange(setSelectedSalaries, sal)} className="ml-1 hover:text-slate-900 dark:hover:text-white">&times;</button>
                  </span>
                ))}
                <button 
                  onClick={clearFilters}
                  className="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 ml-2 font-medium"
                >
                  Clear all
                </button>
              </div>
            )}

            {currentJobs.length > 0 ? (
              <div className="flex flex-col gap-4">
                {currentJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-12 text-center shadow-sm">
                <div className="w-20 h-20 bg-slate-50 dark:bg-slate-700 text-slate-300 dark:text-slate-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Frown size={40} />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No jobs found</h2>
                <p className="text-slate-500 dark:text-slate-400">
                  We couldn't find any jobs matching your current filters. Try adjusting your search criteria.
                </p>
                <button 
                  onClick={clearFilters}
                  className="mt-6 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium py-2 px-6 rounded-lg transition-colors hover:bg-blue-100 dark:hover:bg-blue-900/50"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Pagination Component */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <div className="flex gap-2">
                  <button 
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    &lt;
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-colors ${
                        currentPage === page 
                          ? 'bg-blue-600 text-white shadow-sm border border-blue-600' 
                          : 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button 
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    &gt;
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
