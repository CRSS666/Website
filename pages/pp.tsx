import PageContent from '@/components/PageContent';
import NavBar from '@/components/NavBar';
import Meta from '@/components/Meta';
import styles from '../styles/PremiumPlus.module.scss';
import Link from 'next/link';
import Footer from '@/components/Footer';
export default function PremiumPlus() {
  return (
    <>
      <Meta page={{ title: 'Premium Plus' }} />
      <NavBar currentPage="pp" />

      <PageContent>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <h1>CRSS Premium+ Subscription Plan</h1>
            <span>
              Unlock the Ultimate Minecraft Experience with CRSS Premium
            </span>
            <h2>$6.90/month</h2>
            <span>or save 2% with annual billing!</span>
          </div>
          <span>
            Join the elite ranks of CRSS Premium+ members and elevate your
            Minecraft gameplay to new heights.
          </span>
          <span>
            For just $6.90 per month, our subscription plan offers you exclusive
            perks, priority access, and a superior gaming environment. With CRSS
            Premium+, you&apos;ll enjoy premium features that enhance your
            experience and set you apart from the rest.
          </span>
          <span>
            <h3>Exclusive Benefits of CRSS Premium+:</h3>
            <ul>
              <li>
                <strong>Priority Queue Access:</strong> Skip the lines and jump
                straight into the game with priority server access, ensuring
                you&apos;re always where the action is.
              </li>
              <li>
                <strong>Custom Kits & Items:</strong> Receive unique in-game
                kits and items available only to CRSS Premium+ members, giving
                you an edge in every match.
              </li>
              <li>
                <strong>Enhanced Gameplay Features:</strong> Access premium
                plugins and gameplay enhancements, including advanced commands
                and special game modes, designed to take your Minecraft
                experience to the next level.
              </li>
              <li>
                <strong>Monthly Loot Crates:</strong> Get monthly loot crates
                filled with rare items, unique cosmetics, and special bonuses,
                keeping your inventory well-stocked with top-tier gear.
              </li>
              <li>
                <strong>Dedicated Support:</strong> Enjoy priority assistance
                from our premium support team, ensuring any issues or questions
                are resolved quickly so you can focus on the game.
              </li>
              <li>
                <strong>VIP Events & Contests:</strong> Participate in exclusive
                events and contests with bigger and better rewards, open only to
                CRSS Premium+ members.
              </li>
            </ul>
            <h3>Subscription Details:</h3>
            <ul>
              <li>
                <strong>Subscription Fee:</strong> $6.90 per month, offering
                exceptional value for a premium gaming experience.
              </li>
              <li>
                <strong>Contract Term:</strong> Flexible monthly subscription
                with the freedom to cancel anytime.
              </li>
              <li>
                <strong>Instant Activation:</strong> Your CRSS Premium+ benefits
                activate immediately upon subscription, so you can start
                enjoying all the perks right away.
              </li>
            </ul>
            <h3>Join CRSS Premium+ Today</h3>
            <span>
              For just $6.90 per month, you can access the ultimate Minecraft
              experience with CRSS Premium+. Don&apos;t miss out on the
              exclusive benefits that come with being a premium member of our
              community. For more information or to subscribe, visit our website
              at <Link href="/">crss.cc</Link> or contact our support team
              at&nbsp;
              <a href="mailto:admin@theclashfruit.me">admin@theclashfruit.me</a>
              .
            </span>
          </span>
          <center>
            {' '}
            <h2>Compare our plans</h2>
          </center>
          <div className={styles.subLayout}>
            <div className={styles.card}>
              <h1>CRSS Free</h1>
              <ul>
                <li>9 inventory slots</li>
                <li>Full access to inventory</li>
                <li>Unrestricted use of chat</li>
              </ul>
              <h3>Current Plan</h3>
            </div>
            <div className={styles.card}>
              <h1>CRSS Premium+</h1>
              <ul>
                <li>Ad-free browsing</li>
                <li>Access to special kits and gamemodes</li>
                <li>Browse the web ingame</li>
                <li>Exclusive capes</li>
              </ul>
              <h3>$6.90</h3>
              <strong>Best Value</strong>
            </div>
            <div className={styles.card}>
              <h1>CRSS EnterpriseX</h1>
              <ul>
                <li>Free flight</li>
                <li>Creative mode</li>
                <li>Add your own custom cape</li>
                <li>Create your own items</li>
                <li>Enterprise-grade management solutions</li>
              </ul>
              <h3>Contact Us</h3>
            </div>
          </div>
        </div>
      </PageContent>
      <Footer />
    </>
  );
}
