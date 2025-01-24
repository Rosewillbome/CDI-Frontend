import React from 'react';
import TopSection from './TopSection';
import MiddleSection from './MiddleSection';
import BottomSection from './BottomSection';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopSection />
      <MiddleSection />
      <BottomSection />
    </div>
  );
};

export default HomePage;