import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProfiles } from '@/integrations/supabase/index.js';
import Loader from '@/components/ui/loader';

const ProfileList = () => {
  const { data: profiles, isLoading, error } = useQuery({
    queryKey: ['profiles'],
    queryFn: fetchProfiles,
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading profiles</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Created At</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map(profile => (
            <tr key={profile.id}>
              <td className="py-2 px-4 border-b">{profile.username}</td>
              <td className="py-2 px-4 border-b">{profile.email}</td>
              <td className="py-2 px-4 border-b">{new Date(profile.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfileList;