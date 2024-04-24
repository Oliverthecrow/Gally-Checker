let apiKey = 'd95853023d6143c89b5dd62c4c0ebdf9';
let membershipId = '';
let membershipType = '';
let SearchUrl = 'https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/${membershipType}/${username}/';
let ExoticsOwned = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]

let myHeaders = new Headers();
myHeaders.append('X-API-Key', apiKey);
myHeaders.append('Authorization', '46542');

let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

function getUserFromName(name) {
    let headers = new Headers();
    headers.append("X-API-KEY", apiKey);
    headers.append("Authorization", "46542");
    console.log("Membership type ${membershipType}");
    console.log("Membership Id ${membershipId}");
    let opts = {
        method: "POST",
        body: JSON.stringify({
            displayName: name.split("#")[0],
            displayNameCode: name.split("#")[1],
        }),
        headers: headers,
        redirect: "follow",
    };
    user = fetch(`https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayerByBungieName/-1`, opts).then((response) => response.json().then());
    return user.Response;
}

function ExoticChecker(name) {
    let user = getUserFromName(name);
    if (!user[0]) {
        return `user "${name}" does not exist.`;
    }
    let firstMembership = user[0];
    membershipType = firstMembership.membershipType;
    membershipId = firstMembership.membershipId;
    fetch('https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=800', requestOptions)
        .then((response) => response.json().then((result) => {
            // every item that the player owns
            let collectibles = result.Response.profileCollectibles.data.collectibles;
            /* GallyId '4027219968' IziId = '24541428' LuminaId = '2924632392' WitherhoardID = '1250332035' TractorId = '2094776121'
            Verity's Brow = '846189250' Cenotaph = '2940602493'
            */
            let Exotics = ['4027219968', '24541428', '2924632392', '1250332035', '2094776121', '846189250', '2940602493'];

            for (let i = 0; i < Exotics.length; i++) {
                if (collectibles[Exotics[i]]) {
                    console.log('${name} has ' + Exotics[i]);
                    ExoticsOwned.splice(i, 1, true);
                }
                else { console.log('${name} does not have ' + Exotics[i]); }
            };
        }));
}
function StrandDetection() {

}
getUserFromName('Oliver the crow#3439').then(console.log);
ExoticChecker();