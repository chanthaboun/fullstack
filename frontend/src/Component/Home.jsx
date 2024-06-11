import React, { useEffect } from 'react';
import { FaPlaneDeparture } from 'react-icons/fa';
import '../Styles/Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {


  const navigate = useNavigate()
  useEffect(() => {
    
  }, []);

  return (
    <div className="min-h-screen bg-home flex flex-col items-center">
      <header className="bg-header w-full p-4 flex justify-between items-center nav-animation">
        <div className="flex items-center text-white">
          <FaPlaneDeparture size={24} />
          <h1 className="ml-2 text-2xl">LANDING</h1>
        </div>
        <nav className="text-white">
          <a href="#" className="mr-4 active">Active</a>
          <a href="#" className="mr-4">Link</a>
          <a href="#" className="mr-4">Link</a>
          <button className="bg-action text-white py-2 px-4 rounded" onClick={() => navigate('/login')}>Logout</button>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-bold mb-4">Main Hero Message to sell yourself!</h2>
        <p className="text-xl mb-8">Sub-hero message, not too long and not too short. Make it just right!</p>
        <button className="bg-white text-black py-2 px-6 rounded-full shadow-lg">Subscribe</button>
        <div className="mt-8">
          <img src="https://cdn.pixabay.com/photo/2020/05/23/20/08/books-5211309_1280.jpg" alt="Illustration" className="illustration img-animation" />
        </div>
      </main>
    </div>
  );
};

export default Home;
