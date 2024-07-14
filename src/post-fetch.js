export const postFetch = (apiToken, method, body) => {
  return fetch(`https://www.deezer.com/ajax/gw-light.php?method=${method}&input=3&api_version=1.0&api_token=${apiToken}`, {
    "body": JSON.stringify(body),
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
  }).then((res) => res.json()).then(res => {
    console.log(method, res)

    return res
  })
}