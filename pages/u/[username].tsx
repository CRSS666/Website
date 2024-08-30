import Footer from '@/components/Footer';
import Meta from '@/components/Meta';
import NavBar from '@/components/NavBar';
import PageContent from '@/components/PageContent';
import Database from '@/lib/Database';

import {
  Permission,
  hasPermission
} from '@/utils/permissions';

import Image from 'next/image';

export default function User({ user }: { user: any }) {
  return (
    <>
      <Meta page={{ title: user.global_name, user }} />
      <NavBar currentPage="user" />

      <PageContent>
        <div className="container">
          <h1>{user.global_name}</h1>

          <Image src={`https://cdn.discordapp.com/avatars/${user.did}/a_${user.avatar}.png`} alt={user.global_name} width={128} height={128} />

          <ul>
            <li>Admin: {hasPermission(user.permissions, Permission.Admin) ? 'Yes' : 'No'}</li>
          </ul>

          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt perferendis exercitationem aliquid? Corrupti, veniam nam quis, quas, reprehenderit similique perspiciatis veritatis consectetur quidem omnis iste placeat quod! Dolore, labore est.</p>
        </div>
      </PageContent>

      <Footer />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const db = new Database();

  const user = await db.getUserUsername(context.query.username as string);

  if (!user) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      user: {
        id: user.id,
        did: user.did,
        username: user.username,
        global_name: user.global_name,
        avatar: user.avatar,
        banner: user.banner,
        accent_color: user.accent_color,
        permissions: user.permissions
      }
    }
  };
}