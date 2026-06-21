import Link from 'next/link';
import { getMenu } from '../lib/wordpress'; // Relative path check

interface MenuItem {
  id: string;
  label: string;
  path: string;
}

export default async function Footer() {
  // Fetch the footer menu allocation slot
  const menuItems = await getMenu('FOOTER_MENU');

  return (
    <footer className="border-t bg-gray-50 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Side: Copyright notice */}
        <p className="text-gray-500 text-sm order-2 md:order-1">
          &copy; {new Date().getFullYear()} Headless Framework. All rights reserved.
        </p>

        {/* Right Side: Dynamic Footer Navigation Links */}
        <nav className="flex flex-wrap gap-6 order-1 md:order-2">
          {Array.isArray(menuItems) && menuItems.map((item: MenuItem) => (
            <Link 
              key={item.id} 
              href={item.path} 
              className="text-gray-500 hover:text-blue-600 text-sm font-medium transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

      </div>
    </footer>
  );
}