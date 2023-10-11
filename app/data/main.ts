export async function getData(url: string, body: string) {
  /* await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("OK");
    }, 300000);
  }); */

  return fetch(`http://localhost:4000${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
    cache: 'no-store'
  }).then((res) => res.json());
}
