import type { Metadata,Viewport } from 'next';
import './globals.css';
import {Header,Footer} from './site';
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#082f3c'};
export const metadata: Metadata={metadataBase:new URL('https://carefront-benefits.l1lbill.chatgpt.site'),title:'CareFront USA | Better benefits. Stronger businesses.',description:'CareFront connects businesses with independent supplemental benefits providers and specialist business solutions. Explore everyday care, take-home pay, and potential savings.',icons:{icon:[{url:'/favicon.ico',sizes:'any'},{url:'/favicon.png',type:'image/png'}],shortcut:'/favicon.ico'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><a href="#main-content" className="skiplink">Skip to content</a><Header/>{children}<Footer/></body></html>}
