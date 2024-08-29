import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import PageContent from '@/components/PageContent';
import Database from '@/lib/Database';
import { notFound } from 'next/navigation';

import { useEffect, useState } from 'react';

import cookie from 'cookie';
import Meta from '@/components/Meta';

interface SettingsType {
  animations: boolean;
  ads: boolean;
  language: string;
}

export default function Settings({ sessions }: { sessions: any[] }) {
  const [ settings, setSettings ] = useState<SettingsType>({
    animations: true,
    ads: true,
    language: 'en'
  });

  useEffect(() => {
    const settings = localStorage.getItem('crss_settings');

    if (settings !== null) {
      setSettings(JSON.parse(settings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('crss_settings', JSON.stringify(settings));
  }, [ settings ]);

  return (
    <>
      <Meta page={{ title: 'Settings' }} />
      <NavBar currentPage="settings" />

      <PageContent>
        <h1>Settings</h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label htmlFor="ani">Animations</label>
            <input id="ani" type="checkbox" checked={settings.animations} onChange={e => setSettings({ ...settings, animations: e.target.checked })} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label htmlFor="ads">Ads</label>
            <input id="ads" type="checkbox" checked={settings.ads} onChange={e => setSettings({ ...settings, ads: e.target.checked })} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label htmlFor="lang">Language</label>
            <select id="lang" onChange={e => setSettings({ ...settings, language: e.target.value })}>
              <option value="en">English</option>
              <option value="hu">Hungarian</option>
            </select>
          </div>
        </div>

        <h2>Sessions</h2>

        <table>
          <thead>
            <tr>
              <th>User Agent</th>
              <th>Created</th>
              <th>Expires</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map(session => (
              <tr key={session.id}>
                <td><code>{session.user_agent}</code></td>
                <td>{new Date(session.created).toLocaleDateString('hu-HU')}</td>
                <td>{new Date(session.expires).toLocaleDateString('hu-HU')}</td>
                <td>
                  {session.current ? (
                    <label>Current Session</label>
                  ) : (
                    <button>Sign Out</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </PageContent>

      <Footer />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const db = new Database();

  const cookies = cookie.parse(context.req.headers.cookie);

  if (!cookies.session)
    return {
      notFound: true
    };

  const session = await db.getSession(cookies.session);

  if (!session)
    return {
      notFound: true
    };

  const sessions = await db.getUserSessions(session.uid);

  if (!sessions)
    return {
      notFound: true
    };

  sessions.forEach((s: any) => {
    s.current = session.id === s.id;
    s.created = s.created.toISOString();
    s.expires = s.expires.toISOString();
  });

  return {
    props: {
      sessions
    }
  };
}