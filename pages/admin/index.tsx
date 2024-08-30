import PageContent from '@/components/PageContent';
import { useUser } from '@/context/UserContext';
import { getCookieFromContext } from '@/utils/cookies';
import { useRef } from 'react';

export default function Admin() {
  const { user, isLoggedIn } = useUser();

  if (!isLoggedIn) {
    return null;
  }

  return (  
    <>
      <PageContent>
        <h1>Admin</h1>
        <p>Welcome, {user.names.global_name}!</p>

        <p>What are we doin&apos; today?</p>

        <h2>Your User in JSON Format</h2>

        <p>In case you need it for some reason.</p>

        <pre>
          {JSON.stringify(user, null, 2)}
        </pre>
      </PageContent>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { req } = context;

  const cookie     = req.headers.cookie;
  let   isLoggedIn = false;

  if (cookie) {
    const sessionCookie = getCookieFromContext('session', cookie);

    if (sessionCookie) {
      isLoggedIn = true;
    }
  }

  if (!isLoggedIn) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
}