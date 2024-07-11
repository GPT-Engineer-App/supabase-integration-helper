import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl">Welcome to Our App</h1>
      <p>Get started by logging in or registering.</p>
      <div className="mt-4 space-x-4">
        <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
      </div>
    </div>
  );
};

export default Index;