// lib/notion.ts
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_API_TOKEN, // .env.local 에서 관리
});

export default notion;