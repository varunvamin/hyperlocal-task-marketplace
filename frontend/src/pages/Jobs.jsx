import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';

const Jobs = () => {
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [locationQuery] = useState(searchParams.get('loc') || '');

  useEffect(() => {
    api.get('/jobs')
      .then(res => setJobs(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredJobs = jobs.filter(job => 
    (searchQuery === '' || job.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (locationQuery === '' || job.location.toLowerCase().includes(locationQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-slate-900 mb-4">Available Jobs</h1>
        <p className="text-lg text-slate-500 font-medium mb-8 max-w-2xl mx-auto">
          Find short-term tasks in your area and start earning today.
        </p>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <>
          <div className="mb-6 flex justify-between items-center text-sm font-medium text-slate-500 border-b border-slate-200 pb-4">
            <span>Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}</span>
          </div>
          
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <p className="text-slate-500 text-lg font-medium">No jobs found matching your search.</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 text-indigo-600 font-bold hover:text-indigo-800"
              >
                Clear Search
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Jobs;
