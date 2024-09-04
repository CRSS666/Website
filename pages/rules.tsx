import AdBanner from '@/components/AdBanner';
import Footer from '@/components/Footer';
import Meta from '@/components/Meta';
import NavBar from '@/components/NavBar';

import PageContent from '@/components/PageContent';

export default function Rules() {
  const nations = [];

  return (
    <>
      <Meta page={{ title: 'Rules' }} />
      <NavBar currentPage="rules" />

      <PageContent>
        <h1 id="rules">Rules</h1>

        <ol>
          <li>
            The use of modified clients that give an unfair advantage to
            players, such as hacked clients, is not permitted.
            <ul>
              <li>
                You are not allowed to use them even for their legitimate
                features, such as a &quot;fullbright&quot; option.
              </li>
              <li>
                If admins suspect you are hacking you will be immediately
                banned.
              </li>
            </ul>
          </li>
          <li>
            Do not modify or destroy (grief) other player&apos;s constructions
            without their consent, or steal any of their items.
            <ul>
              <li>
                You are allowed to visit any build, as long as you don&apos;t
                take anything, and if you do you pay them back.
              </li>
              <li>
                You should ask permission in the discord or the in-game chat
                before modifying builds.
              </li>
            </ul>
          </li>
          <li>
            Follow the laws of the nations you are in to avoid issues with other
            players and making the server not fun to play.
            <ul>
              <li>
                If you feel the laws are too vague, feel free to ask the people
                in charge of them what they mean with something, and feel free
                to contribute to them. Complaining that they don&apos;t make
                sense won&apos;t get you anywhere.
              </li>
              <li>
                Breaking laws won&apos;t necessarily get you banned, the nation
                you are in will take measures and punish you for your actions as
                they see fit.
              </li>
            </ul>
          </li>
          <li>
            Do not attempt to make nations where the territory is already owned
            by another nation.
            <ul>
              <li>
                You can make it near the borders of a nation but never inside
                one, you can&apos;t just take existing territory as your own.
              </li>
              <li>
                Other nations are free to claim more territory whenever they
                feel like it, as long as it doesn&apos;t take other
                nations&apos; territory with it.
              </li>
            </ul>
          </li>
        </ol>
      </PageContent>

      <Footer />
    </>
  );
}
