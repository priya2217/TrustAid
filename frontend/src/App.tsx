import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import BeneficiaryDashboard from './pages/BeneficiaryDashboard';
import DonationTracker from './pages/DonationTracker';
import DonorDashboard from './pages/DonorDashboard';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import NGODashboard from './pages/NGODashboard';
import ProfilePage from './pages/ProfilePage';
import RequestAid from './pages/RequestAid';
import ViewRequests from './pages/ViewRequests';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/beneficiary" element={<BeneficiaryDashboard />} />
          <Route path="/ngo" element={<NGODashboard />} />
          <Route path="/donor" element={<DonorDashboard />} />
          <Route path="/request-aid" element={<RequestAid />} />
          <Route path="/view-requests" element={<ViewRequests />} />
          <Route path="/donations/:id" element={<DonationTracker />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
