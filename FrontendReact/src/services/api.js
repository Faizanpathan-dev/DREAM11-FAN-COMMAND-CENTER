const BASE_URL = '/api/match';


async function apiFetch(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Backend error " + response.status + " at " + url);
  }
  return response;
}

export async function fetchLiveBall() {
  const res = await apiFetch(BASE_URL + '/live');
  return res.json();
}

export async function fetchMatchState() {
  const res = await apiFetch(BASE_URL + '/state');
  return res.json();
}

export async function fetchMomentumData() {
  const res = await apiFetch(BASE_URL + '/momentum');
  return res.json();
}

export async function fetchCommentary(persona) {
  const res = await apiFetch(BASE_URL + '/commentary?persona=' + persona);
  return res.text();
}

export async function fetchCatchUp(over) {
  const res = await apiFetch(BASE_URL + '/catchup/' + over);
  return res.text();
}

export async function fetchPlayers() {
  const res = await apiFetch(BASE_URL + '/players');
  return res.json();
}

export async function verifyClaim(claim) {
  const res = await apiFetch(BASE_URL + '/liedetector', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(claim)
  });
  return res.text();
}
