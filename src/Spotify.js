const clientId = '7ef1e2f8aca8490e987ac82b2204d84d';

const redirectUri = 'http://127.0.0.1:5173/jammming/';

const scope =
  'playlist-modify-private playlist-modify-public user-read-private';

const generateRandomString = (length) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  const values = window.crypto.getRandomValues(new Uint8Array(length));

  return Array.from(
    values,
    (value) => characters[value % characters.length]
  ).join('');
};

const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);

  return window.crypto.subtle.digest('SHA-256', data);
};

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

const clearAuthCallback = () => {
  localStorage.removeItem('code_verifier');
  localStorage.removeItem('spotify_state');

  window.history.replaceState(
    {},
    document.title,
    window.location.pathname
  );
};

const Spotify = {
  async login() {
    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);
    const state = generateRandomString(32);

    localStorage.setItem('code_verifier', codeVerifier);
    localStorage.setItem('spotify_state', state);

    const authUrl = new URL(
      'https://accounts.spotify.com/authorize'
    );

    authUrl.search = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      scope,
      redirect_uri: redirectUri,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      state
    }).toString();

    window.location.href = authUrl.toString();
  },

  async getAccessToken() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const spotifyError = params.get('error');

    if (spotifyError) {
      clearAuthCallback();
      throw new Error(`Spotify login failed: ${spotifyError}`);
    }

    if (!code) {
      const savedToken = localStorage.getItem('access_token');
      const expiry = Number(localStorage.getItem('token_expiry'));

      if (savedToken && expiry > Date.now()) {
        return savedToken;
      }

      localStorage.removeItem('access_token');
      localStorage.removeItem('token_expiry');

      return null;
    }

    const returnedState = params.get('state');
    const savedState = localStorage.getItem('spotify_state');

    if (!returnedState || returnedState !== savedState) {
      clearAuthCallback();

      throw new Error(
        'Spotify authentication state did not match. Please open Jammming using http://127.0.0.1:5176/jammming/ and log in again.'
      );
    }

    const codeVerifier = localStorage.getItem('code_verifier');

    if (!codeVerifier) {
      clearAuthCallback();

      throw new Error(
        'Spotify login session has expired. Please log in again.'
      );
    }

    const response = await fetch(
      'https://accounts.spotify.com/api/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          client_id: clientId,
          grant_type: 'authorization_code',
          code,
          redirect_uri: redirectUri,
          code_verifier: codeVerifier
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      clearAuthCallback();

      throw new Error(
        data.error_description || 'Unable to get Spotify token. Please log in again.'
      );
    }

    localStorage.setItem('access_token', data.access_token);

    localStorage.setItem(
      'token_expiry',
      String(Date.now() + data.expires_in * 1000)
    );

    localStorage.removeItem('code_verifier');
    localStorage.removeItem('spotify_state');

    window.history.replaceState(
      {},
      document.title,
      window.location.pathname
    );

    return data.access_token;
  },

  async search(term, accessToken) {
    if (!term.trim()) {
      return [];
    }

    const endpoint = new URL(
      'https://api.spotify.com/v1/search'
    );

    endpoint.search = new URLSearchParams({
      q: term,
      type: 'track',
      limit: '10'
    }).toString();

    const response = await fetch(endpoint.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error(
        `Spotify search failed: ${response.status}`
      );
    }

    const data = await response.json();

    return data.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists.map((artist) => artist.name).join(', '),
      album: track.album.name,
      uri: track.uri
    }));
  }
};

export default Spotify;