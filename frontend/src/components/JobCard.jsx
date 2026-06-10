import React from 'react';
import { MapPin, DollarSign, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  const statusColors = {
    open: 'bg-green-100 text-green-700 border-green-200',
    in_progress: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    completed: 'bg-gray-100 text-gray-700 border-gray-200'
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 transform origin-left scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
      
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{job.title}</h3>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${statusColors[job.status] || statusColors.open} uppercase tracking-wider`}>
          {job.status.replace('_', ' ')}
        </span>
      </div>
      
      <p className="text-gray-600 mb-6 line-clamp-2 text-sm leading-relaxed">{job.description}</p>
      
      <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-500 mb-6">
        <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100">
          <MapPin size={16} className="text-indigo-500" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-2.5 py-1.5 rounded-lg border border-green-100 font-bold">
          <DollarSign size={16} />
          <span>{job.pay.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Clock size={14} />
          <span>Posted recently</span>
        </div>
        <Link to={`/jobs/${job.id}`} className="text-indigo-600 font-semibold text-sm hover:text-indigo-800 flex items-center gap-1 group-hover:underline">
          View Details &rarr;
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
