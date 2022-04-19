// import { ReactComponent as Github } from 'components/icons/github.svg';
// import Twitter from 'components/icons/twitter.svg';
// import Zenn from 'components/icons/zenn.svg';

import { Github } from 'components/icons/Github';
import { Twitter } from 'components/icons/Twitter';
import { Zenn } from 'components/icons/Zenn';

export const Sns = () => {
  return (
    <div className="p-5 shadow-md rounded-md bg-white flex space-x-5 justify-center">
      <a
        href="https://twitter.com/shota1995m"
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <Twitter className="text-gray-500 hover:text-blue-400" />
      </a>
      <a
        href="https://zenn.dev/shota1995m"
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <Zenn className="text-gray-500 hover:text-blue-500" />
      </a>
      <a
        href="https://github.com/shota1995m"
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <Github className="text-gray-500 hover:text-gray-800" />
      </a>
    </div>
  );
};
