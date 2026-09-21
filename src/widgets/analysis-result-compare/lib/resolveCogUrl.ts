export function resolveCogUrl(sourceUrl: string) {
  const url = new URL(sourceUrl, window.location.origin);

  // Yandex Object Storage does not expose CORS headers for the signed URL.
  if (import.meta.env.DEV && url.hostname === "storage.yandexcloud.net") {
    return new URL(`/__cog_bucket${url.pathname}${url.search}`, window.location.origin).href;
  }

  return url.href;
}
