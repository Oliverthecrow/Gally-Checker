let apiKey = 'd95853023d6143c89b5dd62c4c0ebdf9';
let username = '';
let membershipType = '';
let membershipId = '';
let SearchUrl = "https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/${membershipType}/${username}/";

let myHeaders = new Headers();
myHeaders.append("X-API-Key", apiKey);
myHeaders.append("Authorization", "Bearer 46542");

let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
};

fetch("https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/-1/Oliver%20the%20crow%233439/", requestOptions)
    .then(response => response.json())
    .then(result => {
        let player = result.Response[0];
        membershipType = player.membershipType;
        membershipId = player.membershipId;
        console.log("Membership Type:", membershipType);
        console.log("MembershipID", membershipId);
    })

let myHeaders2 = new Headers();
myHeaders.append("X-API-Key", apiKey);
myHeaders.append("Authorization", "Bearer 46542");

let requestOptions2 = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
};

fetch("https://bungie.net/Platform/Destiny2/1/Profile/4611686018439914143/?components=800", requestOptions2)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));