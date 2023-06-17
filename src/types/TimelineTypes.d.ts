export type Url = `https://${string}.${string}`;
export interface ActivityType {
  title: string;
  contentSnippet: string | undefined;
  link: string;
  isoDate: string;
  year: string;
  favicon: string;
}
