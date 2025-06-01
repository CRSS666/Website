import MainLayout from '@/components/Layout';

export default async function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainLayout>{children}</MainLayout>;
}
