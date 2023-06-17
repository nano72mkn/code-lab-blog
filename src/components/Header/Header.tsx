import Link from 'next/link';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between py-5 md:py-10">
      <Link href="/">
        <h1 className="font-black text-2xl md:text-4xl">Code Lab 🤔</h1>
      </Link>
      <nav>
        <ul className="flex space-x-6">
          <li>
            <Link
              className="transition hover:underline hover:text-gray-400"
              href="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="transition underline font-bold hover:text-gray-400"
              href="/blog"
            >
              Blog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
