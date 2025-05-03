
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ArchiveIcon, BoxIcon, ClipboardListIcon, ListIcon, PackageIcon } from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: ListIcon },
    { path: '/products', label: 'Products', icon: BoxIcon },
    { path: '/categories', label: 'Categories', icon: ClipboardListIcon },
    { path: '/inventory', label: 'Inventory', icon: PackageIcon },
    { path: '/reports', label: 'Reports', icon: ArchiveIcon },
  ];

  return (
    <div className="hidden md:flex h-screen w-64 flex-col bg-sidebar fixed left-0 top-0 bottom-0 border-r">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2">
          <BoxIcon className="w-7 h-7 text-white" />
          <span className="text-xl font-bold text-white">Inventory MS</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 mt-6">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-white"
                      : "text-sidebar-foreground hover:bg-sidebar-primary"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-white font-medium">JD</span>
          </div>
          <div>
            <p className="text-sm font-medium text-white">John Doe</p>
            <p className="text-xs text-white/70">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
