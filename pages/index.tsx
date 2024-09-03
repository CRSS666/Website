import AdBanner from '@/components/AdBanner';
import Footer from '@/components/Footer';
import Meta from '@/components/Meta';
import NavBar from '@/components/NavBar';

import PageContent from '@/components/PageContent';

export default function Home() {
  const nations = [ ];

  return (
    <>
      <Meta page={{ title: 'Home' }} />
      <NavBar currentPage="home" />

      <PageContent>
        <h1>Home</h1>

        <p>
          Welcome to Clyde&apos;s Real Survival SMP, CRSS for short. We are a small SMP server that updates to every version starting from b1.0 on the 1st of every month. We have a small community of players that are very friendly and welcoming to new players. We have a few rules that you should follow to make the server a better place for everyone, you can find them at the bottom of the page.
        </p>

        <p>
          The server is built on the idea of nations, featuring { nations.length } nations so far, with the oldest being Panorama Socialist Federation, which was originally known as Republic of Panorama. These nations are scattered around the map, with some being more active than others. You can be sure to find a nation that fits your playstyle, if not you can just start your own!
        </p>

        <h2 id="modpacl">Modpack</h2>

        <p>
          We have a client-side modpack to make your experince on CRSS better, the mods included are intended to be small, simple, and follow the rules of CRSS.
        </p>

        <p>
          You can download it from Modrinth: <a href="https://modrinth.com/modpack/crsspack">https://modrinth.com/modpack/crsspack</a>.
        </p>
      </PageContent>

      <Footer />
    </>
  );
}
