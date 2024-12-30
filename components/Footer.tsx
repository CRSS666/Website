import {
  SiModrinth,
  SiGithub,
  SiYoutube,
  SiDiscord
} from '@icons-pack/react-simple-icons';

import Link from 'next/link';

import styles from '@/styles/Footer.module.scss';
import AdBanner from './AdBanner';

import getConfig from 'next/config';

export default function Footer() {
  const { publicRuntimeConfig } = getConfig(); 

  const git = publicRuntimeConfig.git;

  return (
    <>
      <AdBanner />

      <footer className={styles.pageFooter}>
        <div className={styles.container}>
          <div>
            <p>
              Copyright &copy; {new Date().getFullYear()} CRSS
            </p>

            <p>
              Website originally designed by Myadeleines, heavily modified and rewritten by TheClashFruit.
            </p>
          </div>

          <div>
            <ul>
              <li>
                <Link href="https://modrinth.com/organization/crss" target="_blank">
                  <SiModrinth />
                </Link>
              </li>
              <li>
                <Link href="https://github.com/crss666" target="_blank">
                  <SiGithub />
                </Link>
              </li>
              <li>
                <Link href="https://youtube.com/@CRSS666" target="_blank">
                  <SiYoutube />
                </Link>
              </li>
              <li>
                <Link href="https://discord.gg/rGjCKawPkS" target="_blank">
                  <SiDiscord />
                </Link>
              </li>
            </ul>

            <p>
              CRSS/Website
              <br />
              {git.branch}@<a href={`https://github.com/CRSS666/website/commit/${git.commit.sha}`}>{git.commit.sha.slice(0, 7)}</a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
