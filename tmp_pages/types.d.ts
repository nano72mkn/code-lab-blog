type Post = {
  slug: string;
  frontMatter: PostFrontMatter;
};

type PostFrontMatter = {
  title: string;
  published: boolean;
  tags: string[];
  date: string;
  update?: string;
  emoji: string;
};
