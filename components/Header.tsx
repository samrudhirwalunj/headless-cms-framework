import Link from 'next/link';
import { getMenu } from '../lib/wordpress';

interface MenuItem {
  id: string;
  label: string;
  path: string;
}

export default async function Header() {
  const menuItems = await getMenu('HEADER_MENU');

  return (
    <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-gray-900 tracking-tight">
          Headless CMS
        </Link>
        <nav className="flex gap-6">
          {Array.isArray(menuItems) && menuItems.map((item: MenuItem) => (
            <Link 
              key={item.id} 
              href={item.path} 
              className="text-gray-600 hover:text-blue-600 font-medium transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}