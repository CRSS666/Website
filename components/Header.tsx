'use client';

import { Comic_Neue } from 'next/font/google';
import Image from 'next/image';

import Logo from '@/public/logo.svg';

import styles from '@/styles/components/Header.module.scss';

const comicNeue = Comic_Neue({
  subsets: ['latin'],
  weight: '700'
});

export default function Header() {
  // dummy data
  const server = {
    ip: 'play.crss.cc',
    version: '1.21.5',
    online: 69
  };

  return (
    <header className={styles.pageHero}>
      <Image
        className={styles.headerImage}
        src="https://cdn.crss.cc/img/2025-07-06_23.35.17.png"
        alt="A arial photo of the sever's spawn in the first nation, Republic of Panorama."
        width={3440}
        height={1440}
        quality={50}
      />

      <div className={styles.content}>
        <div className={styles.container}>
          <div>
            <Logo />

            <h1 className={comicNeue.className}>
              Clyde&apos;s Real Survival SMP
            </h1>
          </div>
          <div>
            <label htmlFor="ip">Server Address:</label>

            <input type="text" value={server.ip} id="ip" readOnly size={8} />

            <label htmlFor="ip">Version: {server.version}</label>
          </div>
        </div>
      </div>
    </header>
  );
}
