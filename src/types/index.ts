export interface FollowUp {
  id: string;
  trigger: string;
  message: string;
  note?: string;
}

export interface Script {
  id: string;
  packId: '01' | '02' | '03';
  categoryId: string;
  title: string;
  message: string;
  keywords: string[];
  followUps?: FollowUp[];
  contextNote?: string;
}

export interface Category {
  id: string;
  packId: '01' | '02' | '03';
  title: string;
  description: string;
  targetCount: number;
}

export interface Pack {
  id: '01' | '02' | '03';
  number: string;
  title: string;
  subtitle: string;
  targetCount: number;
  categories: Category[];
}

export interface SearchMatch {
  script: Script;
  pack: Pack;
  category: Category;
  score: number;
  highlightSnippet?: string;
}

