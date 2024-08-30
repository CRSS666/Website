import PageContent from '@/components/PageContent';
import { useUser } from '@/context/UserContext';
import { getCookieFromContext } from '@/utils/cookies';
import { use, useEffect, useState } from 'react';

import Image from 'next/image';

export default function Admin() {
  const { user, isLoggedIn } = useUser();

  const [ users, setUsers ] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/v1/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  }, [ ]);

  const addTeamMember = (userId: number) => {
    alert(userId);
  };

  const editPermissions = (user: any) => {
    const perms = prompt('Enter new permissions for user (1 == Admin; There is nothing more.):', user.permissions);

    if (perms === null) {
      return;
    }

    fetch(`/api/v1/user/${user.username}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        permissions: perms,
      })
    })
      .then((response) => {
        if (response.status === 204) {
          alert('Permissions updated.');
        } else {
          alert('Failed to update permissions.');
        }
      });
  };

  if (!isLoggedIn) {
    return null;
  }

  return (  
    <>
      <PageContent>
        <h1>Admin</h1>
        <p>Welcome, {user.names.global_name}!</p>

        <p>What are we doin&apos; today?</p>

        <h2>Users</h2>

        <table>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Username</th>
              <th>Global Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users && (
              users.map((u) => (
                <tr key={u.id}>
                  <td>
                    <Image src={`https://cdn.discordapp.com/avatars/${u.did}/${u.avatar}.png`} alt={user.global_name} width={32} height={32} />
                  </td>
                  <td>{u.username}</td>
                  <td>{u.global_name}</td>
                  <td>
                    <button onClick={() => { addTeamMember(u.id); }}>
                      Add As Team Member (On the /about page.)
                    </button>
                    <button onClick={() => { editPermissions(u); }}>
                      Edit Permissions
                    </button>
                    <button onClick={() => { alert('GDPR? Yeah no, will implement later.'); }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

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