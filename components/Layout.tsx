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
      {/*
      <div style={{ background: 'var(--errorContainer)', color: 'var(--error)', padding: '16px', textAlign: 'center' }}>
        WARNING: This is a testing instance of the CRSS website, the database and thus the user generated content can and will be wiped at times.
      </div>
      */}
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
