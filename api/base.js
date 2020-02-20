import 'isomorphic-fetch';

export async function api(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    return data;
  }
  catch (err) {
    throw err;
  }
}