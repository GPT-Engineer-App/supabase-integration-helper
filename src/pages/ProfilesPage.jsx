import React from 'react';
import ProfileList from '@/components/ProfileList';

const ProfilesPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Profiles</h1>
      <ProfileList />
    </div>
  );
};

export default ProfilesPage;