import Image from 'next/image';

export const Author: React.FC = () => {
  return (
    <div className="flex space-x-4 p-5 shadow-md rounded-md bg-white">
      <Image
        src="/icon/icon.jpeg"
        width="50"
        height="50"
        layout="fixed"
        className="rounded-full"
      />
      <div className="flex-1 space-y-2">
        <p className="font-bold text-lg">@shota1995m</p>
        <p className="text-xs leading-5">
          コードを書いたり、ゲームをしたりする人
          <br />
          アプリを作るのが好き。
          <br />
          仕事はwebのフロントエンドが多め
          <br />
          React Native / React大好き人間
        </p>
      </div>
    </div>
  );
};
