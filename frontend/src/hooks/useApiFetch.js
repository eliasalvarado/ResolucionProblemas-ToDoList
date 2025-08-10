function useApiFetch() {
  const apiFetch = async ({
    uri, method = 'GET', body, headers, signal,
  }) => {
    let reply = await fetch(uri, {
      method,
      body,
      headers,
      signal,
    });

    console.log('API Fetch:', uri);

    if (!reply.ok) {
      throw reply;
    }
    return reply; // retorno exitoso
  };
  return { apiFetch };
}

export default useApiFetch;