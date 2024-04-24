let apiKey = 'd95853023d6143c89b5dd62c4c0ebdf9';
let username = '';
let membershipId = '';
let membershipType = '';
let SearchUrl = 'https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/${membershipType}/${username}/';

let myHeaders = new Headers();
myHeaders.append('X-API-Key', apiKey);
myHeaders.append('Authorization', '46542');

let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};
function findPlayer(Url) {
    fetch(Url, requestOptions)
        .then(response => response.json().then(result => {
            let player = result.Response[0];
            membershipType = player.membershipType;
            membershipId = player.membershipId;
            console.log('Membership Type:', membershipType);
            console.log('MembershipID', membershipId);
        }))
}
function ExoticChecker(type, name) {
    fetch(`https://www.bungie.net/Platform/Destiny2/${type}/Profile/${name}/?components=800`, requestOptions)
        .then((response) => response.json().then((result) => {
            // every item that the player owns
            let collectibles = result.Response.profileCollectibles.data.collectibles;
            /* GallyId '4027219968' IziId = '3211806999' LuminaId = '3512014804' WithoardID = '2522817335' TractorId = '3580904581'
            Verity's Brow = '2897117448' Cenotaph = '2374129871'
            */
            let Exotics = ['4027219968', '3211806999', '3512014804', '2522817335', '3580904581', '2897117448', '2374129871'];

            for (let i = 0; i <= Exotics.length; i++) {
                if (collectibles[Exotics[i]]) {
                    console.log('Player has ' + Exotics[i]);
                }
                else { console.log('Player does not have' + Exotics[i]); }
            };
        }));
}
findPlayer('https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/-1/Oliver%20the%20crow%233439/');
ExoticChecker(membershipType, membershipId);