import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!user) {
    return <div className="p-8 text-center">You are not logged in.</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-28 bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
      <div className="space-y-4">
        <div>
          <span className="font-semibold">Email:</span> {user.email}
        </div>
        <div>
          <span className="font-semibold">Full Name:</span> {user.fullName || '-'}
        </div>
        <div>
          <span className="font-semibold">Role:</span> {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : '-'}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
