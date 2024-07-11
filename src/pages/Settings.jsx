import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabaseClient';

const Settings = () => {
  const [detectionInterval, setDetectionInterval] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const { data, error } = await supabase.from('settings').select('*').single();
      if (error) {
        console.error(error);
      } else {
        setDetectionInterval(data.detection_interval);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async () => {
    const { error } = await supabase.from('settings').upsert({ id: 1, detection_interval: detectionInterval });
    if (error) {
      setError(error.message);
    } else {
      setError(null);
      alert('Settings saved successfully');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl mb-4">Settings</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <label htmlFor="detectionInterval" className="block text-sm font-medium text-gray-700">
          Detection Interval (ms)
        </label>
        <Input
          id="detectionInterval"
          name="detectionInterval"
          type="number"
          placeholder="Enter detection interval in milliseconds"
          value={detectionInterval}
          onChange={(e) => setDetectionInterval(e.target.value)}
          required
        />
      </div>
      <Button onClick={handleSave}>Save Settings</Button>
    </div>
  );
};

export default Settings;