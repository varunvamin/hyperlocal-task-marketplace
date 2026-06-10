import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import JobCard from '../components/JobCard';
import { LayoutDashboard, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app we might filter jobs by the user, but for MVP we fetch all and filter client side 
    // or create a dedicated endpoint. Here we'll just fetch all and filter by posted_by.
    api.get('/jobs')
      .then(res => {
        const userJobs = res.data.filter(job => job.posted_by === user.id);
        setJobs(userJobs);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200">
        <div className="bg-indigo-100 p-3 rounded-xl text-indigo-600">
          <LayoutDashboard size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 font-medium mt-1">Welcome back, {user?.name}</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          Your Posted Jobs
        </h2>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
          </div>
        ) : jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-300">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No jobs posted yet</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">You haven't posted any jobs. Create your first task to get help from locals.</p>
            <Link to="/post-job" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 shadow-md hover:-translate-y-0.5 transition-all">
              Post a Job Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
