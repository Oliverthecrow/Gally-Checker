const myHeaders = new Headers();
myHeaders.append("X-API-KEY", "d95853023d6143c89b5dd62c4c0ebdf9");

const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
};

fetch("https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/-1/Oliver%20the%20crow%233439/", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));