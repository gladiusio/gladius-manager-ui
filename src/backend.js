export async function getJSON(url) {
  const res = await window.fetch(url);
  return res.json();
}

export async function postData(url, data, headers = {}, method = 'POST') {
  const res = await window.fetch(url, {
    body: JSON.stringify(data),
    headers,
    method,
  });

  try {
    return res.json();
  } catch(e) {
    return res;
  }
}

export async function delayed(cb, time = 100) {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      let res;

      try {
        res = await cb();
      } catch (e) {
        return reject(e);
      }

      return resolve(res);
    }, time);
  });
}
