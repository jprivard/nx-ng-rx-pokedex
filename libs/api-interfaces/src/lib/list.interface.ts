export interface ListApiRepsonse {
  count: number;
  results: {
    name: string;
    url: string;
  }[];
}
