import { appHost } from 'config/app';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between py-5 md:py-10">
      <a href={appHost}>
        <h1 className="font-black text-2xl md:text-4xl">Code Lab 🤔</h1>
      </a>
      <nav>
        <ul className="flex space-x-6">
          <li>
            <a
              className="transition hover:underline hover:text-gray-400"
              href="https://code-lab.xyz"
            >
              Home
            </a>
          </li>
          <li>
            <a
              className="transition underline font-bold hover:text-gray-400"
              href={appHost}
            >
              Blog
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
