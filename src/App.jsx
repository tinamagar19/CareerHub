import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import SavedJobs from './pages/SavedJobs';
import MyApplications from './pages/MyApplications';
import Profile from './pages/Profile';
import Companies from './pages/Companies';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { SavedJobsProvider } from './context/SavedJobsContext';
import { ApplicationsProvider } from './context/ApplicationsContext';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <SavedJobsProvider>
            <ApplicationsProvider>
              <div className="flex flex-col min-h-screen font-sans bg-white dark:bg-slate-900 transition-colors duration-200">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/jobs/:id" element={<JobDetails />} />
                    <Route path="/companies" element={<Companies />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/saved-jobs" element={<SavedJobs />} />
                    <Route path="/applications" element={<MyApplications />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </ApplicationsProvider>
          </SavedJobsProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
