export const getExternalPic = (path: string, type = 'tmdb') => {
  const requestURL = useRequestURL();
  const origin = `${requestURL.protocol}//${requestURL.host}`;
  return `${origin}/ipx/${type}${path}`;
};

export const formatRate = (rate: number) => {
  if (!rate) return '--';
  const r = ~~(rate * 10) / 10;
  return r;
};

export const setStars = (rate: number): number => {
  if (typeof rate !== 'number') return 0;
  return rate * 10;
};

export const formatRunTime = (time: number) => {
  if (!time) return '--';
  const hours = ~~(time / 60);
  const minutes = time % 60;
  return `${hours}h ${minutes}min`;
};

export const formatMoney = (money: number) => {
  if (!money) return '--';
  return new Intl.NumberFormat().format(money);
};

export const getLanguage = (iso: string) => {
  const fullLang = LANGUAGES.find((lang) => lang.iso_639_1 === iso);
  if (fullLang) return fullLang.english_name;
  return iso;
};

export function getVideoLink(key: string) {
  if (!key) return '';
  return `https://www.youtube.com/embed/${key}?rel=0&showinfo=0&autoplay=0`;
}

export const filterBlocked = <T extends { id: number }>(list: T[]) => {
  return list.filter((itm: T) => {
    if (!itm.id) return false;
    return !BLOCKED_LIST.has(String(itm.id));
  });
};

export const encodeQuery = (query: string) => {
  if (process.env.NODE_ENV === 'development') return query;
  return encodeURIComponent(query);
};
