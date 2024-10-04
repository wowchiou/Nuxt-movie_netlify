interface FetchError extends Error {
  response?: {
    status?: number;
  };
}

export default defineEventHandler(async (event) => {
  console.log('event: ', event);
  console.log('path: ', event.path);

  const query = getQuery(event);
  const config = useRuntimeConfig();
  const apiKey = config.tmdbApiKey;

  console.log('query: ', query);

  if (!apiKey) throw new Error('TMDB API key is not set');
  try {
    return await $fetch(event.context.params!.path, {
      baseURL: config.tmdbBaseUrl,
      headers: { Accept: 'application/json' },
      params: Object.assign({ api_key: apiKey }, query),
    });
  } catch (error) {
    const fetchError = error as FetchError;
    const status = fetchError.response?.status || 500;
    setResponseStatus(event, status);
    return { error: String(error)?.replace(apiKey, '***') };
  }
});
