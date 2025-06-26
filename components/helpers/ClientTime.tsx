'use client';

import moment from 'moment';

/**
 * A client rendered date for showing timezone accurate dates for the end user.
 *
 * @param timestamp A js Date() acceptable timestamp format.
 * @param locale Locale if not using relative.
 * @param relative Show relative time.
 * @returns string
 */
export default function ClientTime({
  timestamp,
  locale,
  relative = false
}: {
  timestamp: number | Date;
  locale: string;
  relative: boolean;
}) {
  if (!relative) return new Date(timestamp).toLocaleString(locale);
  else return moment(new Date(timestamp)).fromNow();
}
