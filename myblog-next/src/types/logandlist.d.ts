// type definitions for logandlist
export interface pathnote {
    id : string;
    title : string;
    content_ja : string;
    content_ko : string;
    created_at : string;
};

export interface comment {
  page_id: string;
  nickname: string;
  password_hash: string;
  content: string;
};