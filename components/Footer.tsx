export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Headless Framework. All rights reserved.</p>
      </div>
    </footer>
  );
}