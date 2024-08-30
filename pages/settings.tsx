import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import PageContent from '@/components/PageContent';
import Database from '@/lib/Database';
import { notFound } from 'next/navigation';

import { useEffect, useState } from 'react';

import cookie from 'cookie';
import Meta from '@/components/Meta';

import { UAParser } from 'ua-parser-js';

import styles from '@/styles/Settings.module.scss';
import { X } from 'lucide-react';

interface SettingsType {
  animations: boolean;
  ads: boolean;
}

export default function Settings({ sessions }: { sessions: any[] }) {
  const [ settings, setSettings ] = useState<SettingsType>({
    animations: true,
    ads: true
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

  const currentSession = sessions.find(s => s.current);
  const otherSessions  = sessions.filter(s => !s.current);

  return (
    <>
      <Meta page={{ title: 'Settings' }} />
      <NavBar currentPage="settings" />

      <PageContent>
        <h1>Settings</h1>

        { /* TODO: Move it to the css 😒 */ }
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label htmlFor="ani">Animations</label>
            <input id="ani" type="checkbox" checked={settings.animations} onChange={e => setSettings({ ...settings, animations: e.target.checked })} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label htmlFor="ads">Ads</label>
            <input id="ads" type="checkbox" checked={settings.ads} onChange={e => setSettings({ ...settings, ads: e.target.checked })} />
          </div>
        </div>

        <h2>Sessions</h2>

        <p>
          View and manage your active sessions.
        </p>

        <h3>Current Session</h3>

        <div className={styles.sessions}>
          <div className={styles.sessionCard}>
            <div>
              <p>{currentSession.user_agent.os.name} {currentSession.user_agent.os.version} &bull; {currentSession.user_agent.browser.name} {currentSession.user_agent.browser.version}</p>
              <p>{new Date(currentSession.created).toLocaleString('en-GB')}</p>
            </div>
          </div>
        </div>

        <h3>Other Sessions</h3>

        <div className={styles.sessions}>
          {otherSessions.map(session => (
            <div key={session.id} className={styles.sessionCard}>
              <div>
                <p>{session.user_agent.os.name} {session.user_agent.os.version} &bull; {session.user_agent.browser.name} {session.user_agent.browser.version}</p>
                <p>{new Date(session.created).toLocaleString('en-GB')}</p>
              </div>

              <button onClick={() => { alert('Not yet implemented, yeah...'); }}>
                <X />
              </button>
            </div>
          ))}
        </div>
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

    const ua = new UAParser(s.user_agent).getResult();

    s.user_agent = {
      ua: ua.ua,
      browser: {
        name: ua.browser.name || null,
        version: ua.browser.version || null,
        major: ua.browser.major || null
      },
      engine: {
        name: ua.engine.name || null,
        version: ua.engine.version || null
      },
      os: {
        name: ua.os.name || null,
        version: ua.os.version || null
      },
      device: {
        vendor: ua.device.vendor || null,
        model: ua.device.model || null,
        type: ua.device.type || null
      },
      cpu: {
        architecture: ua.cpu.architecture || null
      }
    };
  });

  return {
    props: {
      sessions
    }
  };
}