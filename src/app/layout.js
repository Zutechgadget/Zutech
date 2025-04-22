import '../styles/globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import { UserProvider } from '../components/UserProvider';
import { CartProvider } from '../components/CartContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard Application for managing products, categories, and orders',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning={true}>
        <UserProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}