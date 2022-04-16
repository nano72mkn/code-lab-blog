type Post = {
  slag: string;
  frontMatter: PostFrontMatter;
};

type PostFrontMatter = {
  title: string;
  published: boolean;
  tags: string[];
  date: string;
};
