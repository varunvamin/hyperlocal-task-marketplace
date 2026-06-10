import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, MapPin, ArrowRight, 
  UserPlus, SearchCheck, FileText, Trophy,
  Clock
} from 'lucide-react';
import Footer from '../components/Footer';
import api from '../services/api';

/* ──────────────────────────────────────────
   Animated Counter Component
   ────────────────────────────────────────── */
const AnimatedCounter = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  const formatNumber = (num) => {
    if (num >= 1000) return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 0) + 'K';
    return num.toString();
  };

  return (
    <span ref={ref} className="text-4xl sm:text-5xl font-black text-blue-600">
      {formatNumber(count)}{suffix}
    </span>
  );
};

/* ──────────────────────────────────────────
   Featured Job Card Component
   ────────────────────────────────────────── */
const FeaturedJobCard = ({ job }) => {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
      {/* Hover accent bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
            {job.title}
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">{job.company || 'Local Business'}</p>
        </div>
        <span className="ml-3 shrink-0 px-3 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-100">
          {job.type || 'Full-time'}
        </span>
      </div>

      {/* Location + Salary */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-1.5">
          <MapPin size={14} className="text-gray-400" />
          <span>{job.location}</span>
        </div>
        <span className="font-bold text-blue-600">
          ₹{typeof job.pay === 'number' ? job.pay.toLocaleString() : job.pay}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-2">
        {job.description}
      </p>

      {/* Footer */}
      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <Clock size={13} />
          <span>Posted recently</span>
        </div>
        <Link 
          to={`/jobs/${job.id}`} 
          className="text-blue-600 font-semibold text-sm hover:text-blue-800 flex items-center gap-1 group-hover:gap-2 transition-all"
        >
          View Details 
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────
   Home (Landing) Page
   ────────────────────────────────────────── */
const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/jobs')
      .then(res => {
        setFeaturedJobs(res.data.slice(0, 6));
      })
      .catch(() => {
        // Fallback demo jobs if API is not available
        setFeaturedJobs([
          { id: 1, title: 'Senior Software Engineer', company: 'Tech Innovations Inc.', location: 'Mumbai, MH', pay: 25000, type: 'Full-time', description: 'We are looking for an experienced software engineer to join our growing team.', status: 'open' },
          { id: 2, title: 'Product Manager', company: 'Digital Solutions Ltd.', location: 'Delhi, DL', pay: 20000, type: 'Full-time', description: 'Join our product team to shape the future of our platform.', status: 'open' },
          { id: 3, title: 'UI/UX Designer', company: 'Creative Studios', location: 'Remote', pay: 18000, type: 'Full-time', description: 'Design beautiful and intuitive user experiences for millions of users.', status: 'open' },
          { id: 4, title: 'Frontend Developer', company: 'Web Ventures', location: 'Bangalore, KA', pay: 22000, type: 'Full-time', description: 'Build responsive and performant web applications using modern technologies.', status: 'open' },
          { id: 5, title: 'Data Analyst', company: 'Analytics Pro', location: 'Pune, MH', pay: 15000, type: 'Part-time', description: 'Analyze large datasets and provide insights to drive business decisions.', status: 'open' },
          { id: 6, title: 'DevOps Engineer', company: 'Cloud Systems', location: 'Remote', pay: 28000, type: 'Full-time', description: 'Manage and optimize cloud infrastructure. Experience with AWS, Docker required.', status: 'open' },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/jobs?q=${encodeURIComponent(searchQuery)}&loc=${encodeURIComponent(searchLocation)}`);
  };

  const steps = [
    { icon: UserPlus, title: 'Create Account', desc: 'Sign up in minutes and set up your profile', num: 1 },
    { icon: SearchCheck, title: 'Search Jobs', desc: 'Browse thousands of job openings', num: 2 },
    { icon: FileText, title: 'Apply', desc: 'Submit your application directly', num: 3 },
    { icon: Trophy, title: 'Get Hired', desc: 'Connect with employers and land your dream job', num: 4 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* ═══════════ HERO SECTION ═══════════ */}
      <section className="relative bg-gradient-to-b from-blue-50 via-white to-white pt-16 sm:pt-24 pb-20 sm:pb-28 overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 leading-tight">
            Your Gateway to Better
            <br />
            <span className="text-blue-600">Career Opportunities</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Discover thousands of job opportunities from top companies around the world. 
            Find your perfect role today and grow your career.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/jobs"
              className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 text-lg font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all duration-300 hover:-translate-y-0.5"
            >
              Browse Jobs
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/post-job"
              className="w-full sm:w-auto px-8 py-4 text-lg font-bold rounded-xl text-gray-700 bg-white border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 hover:-translate-y-0.5 shadow-sm"
            >
              Post a Job
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ SEARCH SECTION ═══════════ */}
      <section className="relative -mt-10 z-10 pb-16 sm:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              {/* Job Title Input */}
              <div className="sm:col-span-2">
                <label htmlFor="search-keyword" className="block text-sm font-semibold text-gray-700 mb-2">
                  Job Title or Keyword
                </label>
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    id="search-keyword"
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="e.g., Software Engineer, Plumber"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>

              {/* Location Input */}
              <div className="sm:col-span-2">
                <label htmlFor="search-location" className="block text-sm font-semibold text-gray-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    id="search-location"
                    type="text"
                    value={searchLocation}
                    onChange={e => setSearchLocation(e.target.value)}
                    placeholder="e.g., Mumbai, Remote"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="sm:col-span-1 flex items-end">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <Search size={18} />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* ═══════════ STATS SECTION ═══════════ */}
      <section className="bg-gradient-to-r from-blue-50 via-blue-50/50 to-blue-50 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 text-center">
            <div className="space-y-2">
              <AnimatedCounter target={10000} suffix="+" />
              <p className="text-gray-500 font-medium text-sm sm:text-base">Active Job Listings</p>
            </div>
            <div className="space-y-2">
              <AnimatedCounter target={500} suffix="+" />
              <p className="text-gray-500 font-medium text-sm sm:text-base">Companies Hiring</p>
            </div>
            <div className="space-y-2">
              <AnimatedCounter target={50000} suffix="+" />
              <p className="text-gray-500 font-medium text-sm sm:text-base">Successful Placements</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURED JOBS SECTION ═══════════ */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
              Featured Opportunities
            </h2>
            <p className="mt-3 text-gray-500 text-lg font-medium">
              Explore our latest job listings from leading companies
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredJobs.map(job => (
                <FeaturedJobCard key={job.id} job={job} />
              ))}
            </div>
          )}

          {/* View All Jobs */}
          <div className="mt-12 text-center">
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-bold hover:bg-blue-600 hover:text-white transition-all duration-300 group"
            >
              View All Jobs
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS SECTION ═══════════ */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
            How b2r Works
          </h2>
          <p className="text-gray-500 text-lg font-medium mb-16">
            Simple steps to find your next opportunity
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {steps.map((step, index) => (
              <div key={step.num} className="relative group">
                {/* Connector line (hidden on mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-full h-px bg-gray-300 z-0"></div>
                )}
                
                <div className="relative z-10 flex flex-col items-center">
                  {/* Step number circle */}
                  <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-black mb-5 shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform duration-300">
                    {step.num}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-[200px] mx-auto">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA SECTION ═══════════ */}
      <section className="bg-blue-600 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-5">
            Ready to Find Your Next Opportunity?
          </h2>
          <p className="text-blue-100 text-lg sm:text-xl max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            Join thousands of professionals who have found their perfect role on b2r
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 text-lg font-bold rounded-xl text-blue-600 bg-white hover:bg-gray-100 transition-all duration-300 shadow-lg hover:-translate-y-0.5"
            >
              Sign Up Now
            </Link>
            <Link
              to="/jobs"
              className="w-full sm:w-auto px-8 py-4 text-lg font-bold rounded-xl text-white border-2 border-white hover:bg-white hover:text-blue-600 transition-all duration-300 hover:-translate-y-0.5"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <Footer />
    </div>
  );
};

export default Home;
