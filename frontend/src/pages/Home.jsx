import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      
      <div className="max-w-4xl w-full space-y-12 text-center z-10 py-20">
        
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 drop-shadow-sm">
            Hyperlocal micro-jobs, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">done right.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-600 leading-relaxed font-medium">
            Connect with locals instantly. Post short-term tasks or earn money completing them in your neighborhood.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/jobs" className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 text-lg font-bold rounded-full text-white bg-indigo-600 hover:bg-indigo-700 shadow-xl hover:shadow-indigo-500/30 transition-all hover:-translate-y-1">
            Browse Jobs
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/post-job" className="w-full sm:w-auto px-8 py-4 text-lg font-bold rounded-full text-slate-700 bg-white border-2 border-slate-200 hover:border-indigo-600 hover:text-indigo-600 transition-all hover:-translate-y-1 shadow-sm">
            Post a Task
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16">
          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow text-left group">
            <div className="bg-indigo-100 text-indigo-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Briefcase size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800">Quick Tasks</h3>
            <p className="text-slate-600 font-medium leading-relaxed">Find people to help with moving, cleaning, assembling furniture, and more.</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow text-left group">
            <div className="bg-purple-100 text-purple-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MapPin size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800">Local Connections</h3>
            <p className="text-slate-600 font-medium leading-relaxed">Connect with workers and posters in your immediate neighborhood.</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow text-left group">
            <div className="bg-green-100 text-green-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800">Trusted Network</h3>
            <p className="text-slate-600 font-medium leading-relaxed">Review trust scores and past completions to ensure safety and reliability.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
