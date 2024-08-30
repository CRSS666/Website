import styles from '@/styles/Dropdown.module.scss';

import Link from 'next/link';

import { MouseEventHandler, useRef } from 'react';

export default function Dropdown({ children, items, className }: { children: React.ReactNode, items: { divider?: boolean, icon?: any, label?: string, href?: string, onClick?: MouseEventHandler<HTMLAnchorElement> }[], className: string }) {
  const dropDownRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    dropDownRef.current?.classList.toggle(styles.open);
  };

  return (
    <div className={`${styles.dropDown} ${className}`} ref={dropDownRef}>
      <label onClick={handleClick}>
        {children}
      </label>

      <div className={styles.dropDownMenu}>
        <ul>
          {items.map((item, i) => (
            (item.divider && 
              <li key={i}>
                <div className={styles.divider}></div>
              </li>
            ) || (
              <li key={i}>
                {item.href ? (
                  <Link href={item.href!}>
                    {item.icon && <item.icon />}

                    {item.label}
                  </Link>
                ) : (
                  <a onClick={item.onClick}>
                    {item.icon && <item.icon />}

                    {item.label}
                  </a>
                )}
              </li>
            )
          ))}
        </ul>
      </div>

      <div className={styles.mobileOverlay} onClick={handleClick} />
    </div>
  );
}