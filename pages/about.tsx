import Card from '@/components/Card';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import PageContent from '@/components/PageContent';
import Database from '@/lib/Database';

import Image from 'next/image';
import Link from 'next/link';

import { Role } from '@/utils/permissions';

import styles from '@/styles/About.module.scss';
import { Globe } from 'lucide-react';
import Meta from '@/components/Meta';


export default function About({ teamMembers }: { teamMembers: any[] }) {
  return (
    <>
      <Meta page={{ title: 'About' }} />
      <NavBar currentPage="about" />

      <PageContent>
        <h1>About</h1>

        <p>
          We are a small team running this server. 
        </p>

        <h2>Team</h2>

        <div className={styles.teamList}>
          {teamMembers.map((member, i) => (
            <Card key={i} className={styles.teamCard}>
              <div className={styles.memberBanner}>
                <Image src={`https://cdn.discordapp.com/avatars/${member.did}/a_${member.avatar}.png`} alt={member.global_name} width={128} height={128} />
              </div>

              <div className={styles.memberContent}>
                <ul className={styles.memberLinks}>
                  <li>
                    <Link href="#" title="Website">
                      <Globe />
                    </Link>
                  </li>
                </ul>

                <h3>{member.global_name}</h3>
                
                {member.role === Role.Owner && <label>Owner</label>}
                {member.role === Role.Admin && <label>Admin</label>}
              </div>
            </Card>
          ))}
        </div>
      </PageContent>

      <Footer />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const db = new Database();

  const teamMembers = await db.getTeam();

  if (!teamMembers)
    return {
      notFound: true
    };

  return {
    props: {
      teamMembers
    }
  };
}