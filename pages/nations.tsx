import Footer from '@/components/Footer';
import Meta from '@/components/Meta';
import NavBar from '@/components/NavBar';
import PageContent from '@/components/PageContent';
import Database from '@/lib/Database';

import Link from 'next/link';
import Image from 'next/image';

import styles from '@/styles/Nations.module.scss';

export default function Nations({ nations }: { nations: any[] }) {
  return (
    <>
      <Meta page={{ title: 'Nations' }} />
      <NavBar currentPage="nations" />

      <PageContent>
        <h1>Nations</h1>

        <div className={styles.nationGrid}>
          {nations.map((nation, i) => (
            <Link key={i} href={`/nation/${nation.code}`} className={styles.nationCard}>
              <h2>{nation.name}</h2>
              <p>{nation.short_description}</p>

              <Image src={`https://crss.fra1.cdn.digitaloceanspaces.com/nation/${nation.code}/flag.svg`} alt={nation.name} width={128} height={64} className={styles.icon} />
            </Link>
          ))}
        </div>
      </PageContent>

      <Footer />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const db = new Database();

  const nations = await db.getNations();

  return {
    props: {
      nations
    }
  };
}