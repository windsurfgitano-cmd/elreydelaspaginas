"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type Props = {
  ga4MeasurementId?: string;
};

export default function TrackingClient({ ga4MeasurementId }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  useEffect(() => {
    const w = window as any;
    const url = search ? `${pathname}?${search}` : pathname;

    if (ga4MeasurementId && typeof w.gtag === "function") {
      w.gtag("config", ga4MeasurementId, {
        page_path: url,
      });
    }

    if (typeof w.fbq === "function") {
      w.fbq("track", "PageView");
    }

    if (typeof w.ttq?.page === "function") {
      w.ttq.page();
    }
  }, [ga4MeasurementId, pathname, search]);

  return null;
}
