let apiKey = "d95853023d6143c89b5dd62c4c0ebdf9";
let username = '';
let membershipType = '';
let membershipId = '';
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
    .then(response => response.json().then(result => {
        let player = result.Response[0];
        membershipType = player.membershipType;
        membershipId = player.membershipId;
        console.log("Membership Type:", membershipType);
        console.log("MembershipID", membershipId);
    }))
fetch(
    `https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=800`,
    requestOptions
).then((response) =>
    response.json().then((result) => {
        // every item that the player owns
        let collectibles = result.Response.profileCollectibles.data.collectibles;
        let GallyId = "4027219968";

        // Check if the player has the Gjallarhorn.
        if (collectibles[GallyId]) {
            console.log("Player has Gjallarhorn");
        } else {
            console.log("Player does not have Gjallarhorn");
        }
    })
);
function StrandDetector() {
    fetch(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=200`, requestOptions)
        .then((response) => response.json().then((result) => {
            if (data.Response) {
                const characters = data.Response.characters.data;
                return characters;
            }
            for (let characterId in characters) {
                let character = characters[characterId];
                let subclass = character.classType;
                for (let subclass of subclasses) {
                    if (subclass.classType === 10) { // Assuming 10 is the class type for Strand subclass
                        return true;
                    }
                }
            }
            return false;
        }))
}
if (StrandDetector) { console.log('Player has strand') }
else { console.log('Player does not have strand') }
