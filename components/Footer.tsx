'use client';

import Link from 'next/link';

import {
  SiBluesky,
  SiDiscord,
  SiGithub,
  SiModrinth,
  SiYoutube
} from '@icons-pack/react-simple-icons';

import styles from '@/styles/components/Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.info}>
          <div>
            <p>
              This website is <Link href="">open-soruce</Link>.
            </p>
          </div>
          <div>
            <p>Copyright &copy; {new Date().getFullYear()} CRSS.</p>
            {/* Please do not put the start of the copyright year, it's useless and I think it fucks up the overall look of the footer. */}
            <p>
              Infrastructure provided by{' '}
              <Link href="https://theclashfruit.me">TheClashFruit</Link>.
            </p>
          </div>
        </div>
        <div className={styles.links}>
          <div className={styles.socials}>
            <ul>
              <li>
                <Link href="https://discord.gg/rGjCKawPkS">
                  <SiDiscord />
                </Link>
              </li>
              <li>
                <Link href="https://bsky.app/profile/crss.cc">
                  <SiBluesky />
                </Link>
              </li>
              <li>
                <Link href="https://youtube.com/@CRSS666">
                  <SiYoutube />
                </Link>
              </li>
              <li>
                <Link href="https://github.com/crss666">
                  <SiGithub />
                </Link>
              </li>
              <li>
                <Link href="https://modrinth.com/organization/crss">
                  <SiModrinth />
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li>
                <Link href="/legal/rules">Rules</Link>
              </li>
              <li>
                <Link href="/legal/tos">Terms of Service</Link>
              </li>
              <li>
                <Link href="/legal/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
