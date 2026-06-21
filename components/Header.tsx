import Link from 'next/link';
import { getMenu } from '../lib/wordpress';

interface MenuItem {
  id: string;
  label: string;
  path: string;
}

// 🛠️ FIXED: Added the interface to accept the logo prop from layout.tsx
interface HeaderProps {
  logo: string | null;
}

export default async function Header({ logo }: HeaderProps) {
  const menuItems = await getMenu('HEADER_MENU');

  return (
    <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/">
          {/* If a logo exists from WordPress, render the image. Otherwise, fallback to text logo */}
          {logo ? (
            <img src={logo} alt="Website Logo" className="h-10 w-auto object-contain" />
          ) : (
            <span className="font-bold text-xl text-gray-900 tracking-tight">
              Headless CMS
            </span>
          )}
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