import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, Code, Briefcase, Edit2, Save, X } from 'lucide-react';

export default function Profile() {
  const { currentUser, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    experience: ''
  });

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    } else {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        skills: currentUser.skills || '',
        experience: currentUser.experience || ''
      });
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-slate-800 shadow-sm rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 px-8 py-10 text-white flex justify-between items-start">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white text-blue-600 rounded-full flex items-center justify-center text-4xl font-bold shadow-md">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-bold">{currentUser.name}</h1>
                <p className="text-blue-100 flex items-center gap-2 mt-2">
                  <Mail size={16} /> {currentUser.email}
                </p>
              </div>
            </div>
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Edit2 size={16} />
                Edit Profile
              </button>
            )}
          </div>

          {/* Content */}
          <div className="p-8">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      disabled
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-600 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      placeholder="+977 98..."
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Years of Experience</label>
                    <input 
                      type="text" 
                      name="experience" 
                      value={formData.experience} 
                      onChange={handleChange} 
                      placeholder="e.g., 3 years"
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Skills (comma separated)</label>
                    <input 
                      type="text" 
                      name="skills" 
                      value={formData.skills} 
                      onChange={handleChange} 
                      placeholder="React, Node.js, Design..."
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
                  >
                    <Save size={18} /> Save Changes
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setIsEditing(false)} 
                    className="border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 px-6 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
                  >
                    <X size={18} /> Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 dark:bg-slate-700 p-3 rounded-xl text-blue-600 dark:text-blue-400">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Phone</h3>
                      <p className="text-lg font-medium text-slate-900 dark:text-white mt-1">
                        {currentUser.phone || 'Not provided'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 dark:bg-slate-700 p-3 rounded-xl text-blue-600 dark:text-blue-400">
                      <Briefcase size={24} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Experience</h3>
                      <p className="text-lg font-medium text-slate-900 dark:text-white mt-1">
                        {currentUser.experience || 'Not provided'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-700 pt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Code className="text-blue-600 dark:text-blue-400" size={24} />
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Skills</h3>
                  </div>
                  
                  {currentUser.skills ? (
                    <div className="flex flex-wrap gap-2">
                      {currentUser.skills.split(',').map((skill, index) => (
                        <span key={index} className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg font-medium text-sm">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500 dark:text-slate-400 italic">No skills added yet.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
