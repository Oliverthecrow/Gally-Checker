let apiKey = "d95853023d6143c89b5dd62c4c0ebdf9";
let username = '';
let membershipType = '1';
let membershipId = '4611686018439914143';
let SearchUrl = "https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/${membershipType}/${username}/";

let myHeaders = new Headers();
myHeaders.append("X-API-Key", apiKey);
myHeaders.append("Authorization", "46542");

let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
};
fetch("https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/-1/Oliver%20the%20crow%233439/", requestOptions)
    .then(response => response.json() .then(result => {
        let player = result.Response[0];
        membershipType = player.membershipType;
        membershipId = player.membershipId;
        console.log("Membership Type:", membershipType);
        console.log("MembershipID", membershipId);
    }))

fetch(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=800`, requestOptions)
    .then(response => response.json().then(result => {
        // every item that the character has
        let itemComponent = result.Response.playerCollectibles
        let GallyId = '4027219968';

        // Check if the player has the Gjallarhorn.
        if (itemComponent[GallyId]) {
            console.log('Player has Gjallarhorn');
        }
        else {
            console.log('Player does not have Gjallarhorn');
        }
    }));