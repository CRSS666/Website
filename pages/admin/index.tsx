import PageContent from '@/components/PageContent';
import { useUser } from '@/context/UserContext';
import { getCookieFromContext } from '@/utils/cookies';

export default function Admin() {
  const { user, isLoggedIn } = useUser();

  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <nav>
        <ul>
          <li>tba</li>
        </ul>
      </nav>
      <PageContent>
        <h1>Admin</h1>
        <p>Welcome, {user.global_name}!</p>

        <p>What are we doin&apos; today?</p>
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