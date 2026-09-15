import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';

const ApplicationsContext = createContext(null);

export function ApplicationsProvider({ children }) {
  const [applications, setApplications] = useLocalStorage('careerhub_applications', []);
  const { showToast } = useToast();

  const applyForJob = (job, applicantData) => {
    // Check if already applied
    const alreadyApplied = applications.some(app => app.jobId === job.id && app.email === applicantData.email);
    if (alreadyApplied) {
      showToast('You have already applied for this job', 'error');
      return false;
    }

    const newApplication = {
      id: Date.now(),
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      appliedAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      status: 'Applied',
      ...applicantData
    };

    setApplications([...applications, newApplication]);
    showToast('Application submitted successfully!', 'success');
    return true;
  };

  const getMyApplications = (email) => {
    return applications.filter(app => app.email === email);
  };
  
  const hasApplied = (jobId, email) => {
    return applications.some(app => app.jobId === jobId && app.email === email);
  };

  return (
    <ApplicationsContext.Provider value={{ applications, applyForJob, getMyApplications, hasApplied }}>
      {children}
    </ApplicationsContext.Provider>
  );
}

export const useApplications = () => {
  const context = useContext(ApplicationsContext);
  if (!context) {
    throw new Error('useApplications must be used within an ApplicationsProvider');
  }
  return context;
};
