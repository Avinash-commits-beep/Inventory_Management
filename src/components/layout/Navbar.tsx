
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SearchIcon, BoxIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface NavbarProps {
  onSearch?: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <BoxIcon className="w-6 h-6 text-inventory-blue" />
          <span className="text-xl font-bold text-inventory-blue">Inventory MS</span>
        </Link>

        <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit" className="ml-2">
            Search
          </Button>
        </form>

        <div className="flex items-center gap-2">
          <Link to="/products">
            <Button variant="outline">Products</Button>
          </Link>
          <Link to="/add-product">
            <Button>Add Product</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
