export type Post = {
  slug: string;
  frontMatter: PostFrontMatter;
};

export type PostFrontMatter = {
  title: string;
  published: boolean;
  tags: string[];
  date: string;
  update?: string;
  emoji: string;
};
