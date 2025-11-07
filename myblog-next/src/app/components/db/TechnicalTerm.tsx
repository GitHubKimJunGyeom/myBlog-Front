// components/TechnicalTermList.tsx

import React from 'react';

interface NotionDataItem {
  title: string;
  created_time: string;
  translated_title: string;
  translated_overview: string;
  translated_content: string;
}

interface TechnicalTermListProps {
  notionData: NotionDataItem[];
}

const i18n = {
  'blog.technical_term_list': '기술 용어 목록',
  'blog.technical_term_list_description': '개발자를 위한 필수 용어 정리',
};

const t = (key: keyof typeof i18n) => i18n[key];

const CommonMetaData: React.FC<{ title: string; description: string; isArticle: boolean }> = ({ title, description }) => (
  <head>
    <title>{title}</title>
    <meta name="description" content={description} />
  </head>
);

const ModalTermDetail: React.FC<{ title: string; content: string }> = ({ title, content }) => {
  return (
    <button className="text-orange-500 hover:text-orange-700">
      {title} 상세 보기
    </button>
  );
};

const TechnicalTermList: React.FC<TechnicalTermListProps> = ({ notionData }) => {
  return (
    <>
      <CommonMetaData 
        title={t('blog.technical_term_list')}
        description={t('blog.technical_term_list_description')}
        isArticle={true}
      />
      
      <div>
        <h1 className="font-bold text-black text-4xl mb-2 whitespace-pre-line">
          {t('blog.technical_term_list')}
        </h1>
        <h2 className="font-bold text-gray-500 text-xl mb-2 whitespace-pre-line">
          {t('blog.technical_term_list_description')}
        </h2>
      </div>

      <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-12">
        {notionData.map((data) => (
          <article 
            key={data.title} 
            className="flex flex-col shadow-xl my-4 bg-amber-50 border-2 border-solid border-amber-200 rounded-xl"
          >
            <div className="flex flex-col justify-start p-6">
              <p className="text-sm text-gray-500 pb-3">
                {data.created_time}
              </p>
              <h2 className="font-bold text-gray-900 text-2xl mb-2">
                {data.title}
              </h2>
              <div className="w-full flex flex-col pb-3">
                <p className="text-xl pb-3">
                  {data.translated_title}
                </p>
                <p className="pb-6">
                  {data.translated_overview}
                </p>
              </div>
              <div className="text-sm text-orange-500 mb-2">
                <ModalTermDetail 
                  title={data.title}
                  content={data.translated_content}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
};

export default TechnicalTermList;