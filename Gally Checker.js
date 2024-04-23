let apiKey = "d95853023d6143c89b5dd62c4c0ebdf9";

let myHeaders = new Headers();
myHeaders.append("X-API-KEY", apiKey);

let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
};

fetch("https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/-1/Oliver%20the%20crow%233439/", requestOptions)
    .then(response => response.json())
    .then(result => {
        let player = result.Response[0];
        let membershipType = player.membershipType;
        let membershipId = player.membershipId;
        console.log("Membership Type:", membershipType);
        console.log("MembershipID", membershipId);

        let url = `https://bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=800`;
    })

let GallyId = '1363886209';
let itemComponent = data.Response.itemComponents.collectibles.data;

// Check if the player has the Gjallarhorn
if (itemComponent[GallyId]) {
    console.log('Player has Gjallarhorn');
}
else {console.log('Player does not have Gjallarhorn')}