'use client';

import { useState } from 'react';

import styles from '@/styles/components/TabContainer.module.scss';

interface TabContainerProps {
  tabs: {
    title: string;
    children: React.ReactNode;
  }[];
  className?: string;
}

export default function TabContainer({
  tabs,
  className
}: Readonly<TabContainerProps>) {
  const [currentTab, setCurrentTab] = useState<{
    title: string;
    children: React.ReactNode;
  }>(tabs[0]);

  return (
    <div
      className={
        className ? `${className} ${styles.tabContainer}` : styles.tabContainer
      }
    >
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            data-current={tab.title == currentTab.title}
            key={tab.title.toLowerCase().replace(' ', '-')}
            onClick={() => setCurrentTab(tab)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div>{currentTab.children}</div>
    </div>
  );
}
