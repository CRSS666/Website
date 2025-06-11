'use client';

export default function ClientTime({
  timestamp,
  locale
}: {
  timestamp: number | Date;
  locale: string;
}) {
  return new Date(timestamp).toLocaleString(locale);
}
