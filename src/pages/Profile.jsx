import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase.from('profiles').select('*').single();
      if (error) {
        console.error(error);
      } else {
        setProfile(data);
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!profile) {
    return <p>No profile data found.</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 md:p-8 lg:p-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl md:text-3xl">Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Email: {profile.email}</p>
          <Button onClick={handleLogout} className="w-full">Logout</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;