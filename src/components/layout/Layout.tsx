
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Toaster } from '@/components/ui/toaster';

interface LayoutProps {
  children: React.ReactNode;
  onSearch?: (query: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onSearch }) => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 md:ml-64">
        <Navbar onSearch={onSearch} />
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
      <Toaster />
    </div>
  );
};

export default Layout;
