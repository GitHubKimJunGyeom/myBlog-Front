import Head from 'next/head'; 
import Script from 'next/script'; 
import React, { useMemo } from 'react';
import { useRouter } from 'next/router'; 
import { seoConfig, profileConfig, G_TAG_ID } from '../config'; 

interface CommonMetaDataProps {
  title?: string;
  description?: string;
  isArticle?: boolean;
}

const CommonMetaData: React.FC<CommonMetaDataProps> = (props) => {
  const router = useRouter();
  const lang = (router.locale || 'ko') as keyof typeof seoConfig; 

  const metaSEO = useMemo(() => {
    const finalTitle = props.isArticle && props.title ? props.title : seoConfig[lang].title;
    const finalDescription = props.isArticle && props.description ? props.description : seoConfig[lang].description;
    const pageType = props.isArticle ? 'article' : 'website';

    return {
      title: finalTitle,
      description: finalDescription,
      pageType: pageType,
    };
  }, [props.isArticle, props.title, props.description, lang]);

  return (
    <>
      <Head>
        <title>{metaSEO.title}</title>
        <meta name="description" content={metaSEO.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes, minimum-scale=1" />
        <meta name="charset" content="utf-8" />
        <meta name="color-scheme" content="light" />

        <meta property="og:site_name" content={metaSEO.title} />
        <meta property="og:title" content={metaSEO.title} />
        <meta property="og:description" content={metaSEO.description} />
        <meta property="og:type" content={metaSEO.pageType} />
        <meta property="og:url" content={seoConfig[lang].url} />
        <meta name="author" content={profileConfig.name} />

      </Head>

      <Script 
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${G_TAG_ID}`} 
      />
      
      <Script 
        id="gtag-init" 
        strategy="afterInteractive" 
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${G_TAG_ID}');
          `,
        }}
      />
    </>
  );
};

export default CommonMetaData;