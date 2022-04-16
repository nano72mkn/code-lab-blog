export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between py-5 md:py-10">
      <p className="font-black text-2xl md:text-4xl">Code Lab 🤔</p>
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
              href="https://blog.code-lab.xyz"
            >
              Blog
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
