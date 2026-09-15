import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';

const SavedJobsContext = createContext(null);

export function SavedJobsProvider({ children }) {
  const [savedJobs, setSavedJobs] = useLocalStorage('careerhub_saved_jobs', []);
  const { showToast } = useToast();

  const toggleSavedJob = (jobId) => {
    const isSaved = savedJobs.includes(jobId);
    if (isSaved) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
      showToast('Job removed from saved list', 'success');
    } else {
      setSavedJobs([...savedJobs, jobId]);
      showToast('Job saved successfully', 'success');
    }
  };

  const isJobSaved = (jobId) => savedJobs.includes(jobId);

  return (
    <SavedJobsContext.Provider value={{ savedJobs, toggleSavedJob, isJobSaved }}>
      {children}
    </SavedJobsContext.Provider>
  );
}

export const useSavedJobs = () => {
  const context = useContext(SavedJobsContext);
  if (!context) {
    throw new Error('useSavedJobs must be used within a SavedJobsProvider');
  }
  return context;
};
