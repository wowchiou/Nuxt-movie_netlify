interface FetchError extends Error {
  response?: {
    status?: number;
  };
}

function getHeaders(allowOrigin: string) {
  return {
    'Access-Control-Allow-Origin': allowOrigin, // 設定允許的來源
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // 允許的 HTTP 方法
    'Access-Control-Allow-Headers': 'Content-Type, Authorization', // 允許的標頭
  };
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const config = useRuntimeConfig();
  const apiKey = config.tmdbApiKey;

  // 允許的來源清單
  const allowedOrigins = ['https://ac-movies.netlify.app'];

  // 獲取請求的來源
  const origin =
    event.node.req.headers.origin || event.node.req.headers.referer || '';

  // CORS 驗證邏輯
  if (process.env.NODE_ENV === 'development') {
    setHeaders(event, getHeaders('*')); // 開發環境允許所有來源
  } else if (allowedOrigins.includes(origin)) {
    setHeaders(event, getHeaders(origin)); // 生產環境只允許清單中的來源
  } else {
    setResponseStatus(event, 403); // 禁止訪問
    return { error: 'Forbidden: Origin not allowed' };
  }

  if (!apiKey) throw new Error('TMDB API key is not set');
  try {
    const res = await $fetch(event.context.params!.path, {
      baseURL: config.tmdbBaseUrl,
      headers: { Accept: 'application/json' },
      params: Object.assign({ api_key: apiKey }, query),
    });
    return res;
  } catch (error) {
    const fetchError = error as FetchError;
    const status = fetchError.response?.status || 500;
    setResponseStatus(event, status);
    return { error: String(error)?.replace(apiKey, '***') };
  }
});
