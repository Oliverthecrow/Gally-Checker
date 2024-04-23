const apiKey = "d95853023d6143c89b5dd62c4c0ebdf9";

const myHeaders = new Headers();
myHeaders.append("X-API-KEY", apiKey);

const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
};

fetch("https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/-1/Oliver%20the%20crow%233439/", requestOptions)
    .then(response => response.json())
    .then(result => {
        const player = result.Response[0];
        const membershipType = player.membershipType;
        const membershipId = player.membershipId
        console.log("Membership Type:", membershipType);

        const url = `https://bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=800`;
    })
    .catch(error => console.error(error));