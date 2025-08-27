import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { notFound } from 'next/navigation';

type Props = {
  params: { lang: string };
};

export async function generateStaticParams() {
  const langs = ['ko', 'ja'];
  return langs.map(lang => ({ lang }));
}

export default async function IntroducePage({ params }: Props) {
  const { lang } = params;
  const filePath = path.join(process.cwd(), 'content/introduce', lang, 'introduce.md');

  if (!fs.existsSync(filePath)) {
    notFound(); // ✅ JSX 밖에서 사용
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { content } = matter(fileContent);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return (
    <main className="markdown mx-auto px-4 sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
      {/* 
        Optional: <CommonMetaData isArticle={false} />
        Optional: 제목이나 날짜 등 보여주고 싶다면 data.title, data.date 등 추가 가능
      */}
      <article
        dir="ltr" // ✏️ 향후 필요시 언어별로 조정 가능
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </main>
  );
}
