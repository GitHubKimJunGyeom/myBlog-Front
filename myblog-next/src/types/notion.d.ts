export interface FetchNotionDataBase {
    lang : string;
    database : string;
};
export interface PageId {
  targetDataBasePageId : string;
};
export interface clipping_list {
    page_id : string;
    title : string;
    summary : string;
    tags: string[];
    created_time: string;
    url: string;
};
export interface technical_term_list {
    title : string;
    translated_title : string;
    translated_overview : string;
    translated_content : string;
    created_time: string
};
export interface business_insight_list {
    title : string;
    tags: string[];
    now_lang_content: string;
    importance: string;
    created_time: string;
};
export interface programming_insight_list {
  page_id : string;
  title : string;
  summary: string;
  created_time: string;
  tags: object;
};
export interface comment {
  userName: string;
  lastEditedTime: string;  
  comment: string;
};