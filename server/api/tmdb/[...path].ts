interface FetchError extends Error {
  response?: {
    status?: number;
  };
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const config = useRuntimeConfig();
  const apiKey = config.tmdbApiKey;

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
