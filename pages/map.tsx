import Footer from '@/components/Footer';
import Meta from '@/components/Meta';
import NavBar from '@/components/NavBar';

import PageContent from '@/components/PageContent';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function Map() {
  return (
    <>
      <Meta page={{ title: 'Map' }} />
      <NavBar currentPage="map" />

      <PageContent>
        <h1>Map</h1>

        <p>
          The orginal map&apos;s v2 version will be coming eventually. Till then enjoy the BlueMap:
        </p>

        <iframe src="https://map.crss.cc" width="100%" style={{ aspectRatio: '16/9' }} />

        <p>
          <Link href="https://map.crss.cc" target="_blank">
            Open in New Tab

            <ExternalLink />
          </Link>
        </p>
      </PageContent>

      <Footer />
    </>
  );
}
