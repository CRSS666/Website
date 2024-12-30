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
          Welcome to Clyde&apos;s Real Survival SMP, CRSS for short. We are a small SMP server that updates to every version starting from b1.0 on the 1st of every month. We have a small community of players that are mostly very friendly and welcoming to new players. We have a few rules that you should follow to make the server a better place for everyone, you can find them at the rules tab.
        </p>
        <p>
          As of 30/12/2024, the server has reached the latest version of Minecraft, which kind of kills its twist. The server will remain open until Clash or Oracle decide to nuke it, and there is a secondary server called CRSS2, which will stop updating at b1.7.3 if you&apos;re into it. CRSS2 info will be added to the website sometime in the future.
        </p>
        <p>
          The server is built on the idea of nations, featuring { nations.length } nations so far, with the oldest being the Republic of Panorama. These nations are scattered around the map, with some being more active than others. You can be sure to find a nation that fits your playstyle, if not you can just start your own!
        </p>
      </PageContent>

      <Footer />
    </>
  );
}
