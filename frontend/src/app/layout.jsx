import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Django Next.js CRUD Starter',
  description: 'A starter template for Django and Next.js projects',
  keywords: ['django, next.js, starter, template, CRUD, REST, API'],
  authors: [
    {
      name: 'lace04',
      url: 'https://github.com/lace04',
    },
  ],
  openGraph: {
    title: 'Django Next.js CRUD Starter',
    description: 'A starter template for Django and Next.js projects',
    url: '',
    siteName: 'Django',
    locale: 'en_US',
    type: 'website',
    images: [
      'https://tse2.mm.bing.net/th/id/OIG4.7Age.tdTC8HKCrYizNwl?pid=ImgGn',
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
