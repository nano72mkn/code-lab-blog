declare module 'markdown-toc' {
  const toc: (markdown: string) => {
    content: string;
    json: { content: string; slug: string; lvl: number }[];
  };
  export default toc;
}
