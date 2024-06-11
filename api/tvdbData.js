const apiKey = process.env.NEXT_PUBLIC_TVDB_API_KEY;
const apiUrl = process.env.NEXT_PUBLIC_TVDB_API_URL;

const getToken = async () => {
  let token = '';
  if (!token) {
    const response = await fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ apikey: apiKey }),
    });
    const { data } = await response.json();
    token = data.token;
  }
  return token;
};

const fetchFromTVDB = async (endpoint) => {
  const authToken = await getToken();
  const response = await fetch(`${apiUrl}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.json();
};

const getGenresFromTVDB = async () => {
  const authToken = await getToken();
  const response = await fetch(`${apiUrl}/genres`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  const { data } = await response.json();
  return data;
};

const getTypesFromTVDB = async () => {
  const authToken = await getToken();
  const response = await fetch(`${apiUrl}/entities`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  const { data } = await response.json();
  return [data[0], data[3]];
};

export { fetchFromTVDB, getGenresFromTVDB, getTypesFromTVDB };
