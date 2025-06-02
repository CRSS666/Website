import Header from '@/components/Header';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

import api from '@/lib/api';

export default async function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await api.getUser();

  return (
    <>
      <Header />
      <NavBar user={user} />

      <main>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '16px' }}>
          {children}
        </div>
      </main>

      <Footer />
    </>
  );
}
