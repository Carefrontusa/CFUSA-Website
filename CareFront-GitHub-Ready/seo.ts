import type {Metadata} from 'next';
export const siteOrigin='https://carefront-benefits.l1lbill.chatgpt.site';
export function pageMetadata(title:string,description:string,path:string):Metadata{return {title,description,alternates:{canonical:siteOrigin+path},openGraph:{title,description,url:siteOrigin+path,siteName:'CareFront USA',type:'website',locale:'en_US'},twitter:{card:'summary',title,description}}}
