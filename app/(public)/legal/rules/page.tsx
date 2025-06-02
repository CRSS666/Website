import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Rules',
  openGraph: {
    title: 'Rules'
  }
};

export default function Rules() {
  return (
    <>
      <h1>Rules</h1>

      <p>
        Please read our rules carefully. Breaking them may lead to temporary or
        permanent suspension of your account on the website and/or a ban on the
        Minecraft servers.
      </p>

      <p>
        You may appeal a ban/suspension through our email:{' '}
        <Link href="mailto:admins@crss.cc">admins@crss.cc</Link>.
      </p>

      <h2>Website Rules</h2>
      <ul>
        <li>You may not post illegal content.</li>
        <li>
          You may not post adult content, including (but not limited to)
          explicit 18+ videos or images.
        </li>
        <li>
          You may not post content harmful to someone else, including (but not
          limited to) harassment.
        </li>
        <li>
          Gallery images must be from Minecraft, and specifically from one of
          CRSS&apos;s servers.
        </li>
      </ul>

      <h2>Server Rules</h2>
      <ol>
        <li>
          <strong>
            The use of modified clients that give an unfair advantage to
            players, such as hacked clients, are not permitted.
          </strong>
          <ul>
            <li>
              You are not allowed to use them even for their legitimate
              features, such as a &quot;fullbright&quot; option.
            </li>
            <li>
              If admins suspect you are hacking you will be immediately banned.
            </li>
          </ul>
        </li>

        <li>
          <strong>
            Do not modify or destroy (grief) other player&apos;s constructions
            without their consent, or steal any of their items.
          </strong>
          <ul>
            <li>
              You are allowed to visit any build, as long as you don&apos;t take
              anything, and if you do you pay them back.
            </li>
            <li>
              You should ask permission in the discord or the in-game chat
              before modifying builds.
            </li>
          </ul>
        </li>

        <li>
          <strong>
            Follow the laws of the nations you are in to avoid issues with other
            players and making the server not fun to play.
          </strong>
          <ul>
            <li>
              If you feel the laws are too vague, feel free to ask the people in
              charge of them what they mean with something, and feel free to
              contribute to them. Complaining that they don&apos;t make sense
              won&apos;t get you anywhere.
            </li>
            <li>
              Breaking laws won&apos;t necessarily get you banned, the nation
              you are in will take measures and punish you for your actions as
              they see fit.
            </li>
          </ul>
        </li>

        <li>
          <strong>
            Do not attempt to make nations where the territory is already owned
            by another nation.
          </strong>
          <ul>
            <li>
              You can make it near the borders of a nation but never inside one,
              you can&apos;t just take existing territory as your own.
            </li>
            <li>
              Other nations are free to claim more territory whenever they feel
              like it, as long as it doesn&apos;t take other nations&apos;
              territory with it.
            </li>
          </ul>
        </li>
      </ol>
    </>
  );
}
