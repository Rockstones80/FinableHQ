// app/auth/signup/layout.tsx
import React from 'react';
import Sidebar, { SidebarProvider } from '@/components/layout/sidebar';


interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  
  return (
    <SidebarProvider>
      <div className="flex overflow-hidden h-screen">
        <Sidebar />
        <main className="flex-1 w-full  overflow-y-scroll h-full custom-scrollbar ">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;

