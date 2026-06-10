import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Mail, Shield, Star, Award } from 'lucide-react';

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>
      
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-16 mb-8">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-blue-100 flex items-center justify-center text-blue-600 text-5xl font-black shadow-md">
              {user.name.charAt(0).toUpperCase()}
            </div>
            
            <div className="bg-white rounded-full px-6 py-2 shadow-sm border border-slate-100 flex items-center gap-2 mb-2">
              <Star className="text-yellow-400 fill-current" size={20} />
              <span className="font-bold text-slate-800 text-lg">{user.trust_score.toFixed(1)}</span>
              <span className="text-slate-500 font-medium">Trust Score</span>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-black text-slate-900">{user.name}</h2>
              <div className="flex items-center gap-2 text-slate-500 font-medium mt-1">
                <Mail size={16} />
                <span>{user.email}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-slate-100">
              <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-4">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                  <Shield size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-500">Account Role</p>
                  <p className="font-bold text-slate-900 capitalize">{user.role}</p>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-4">
                <div className="bg-purple-100 text-purple-600 p-3 rounded-xl">
                  <Award size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-500">Status</p>
                  <p className="font-bold text-slate-900">Verified Member</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
