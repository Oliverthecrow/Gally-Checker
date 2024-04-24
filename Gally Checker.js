let apiKey = 'd95853023d6143c89b5dd62c4c0ebdf9';

async function getUserFromName(name) {
    let headers = new Headers();
    headers.append('X-API-KEY', apiKey);
    headers.append('Authorization', '46542');
    let opts = {
        method: 'POST',
        body: JSON.stringify({
            displayName: name.split('#')[0],
            displayNameCode: name.split('#')[1],
        }),
        headers: headers,
        redirect: 'follow',
    };

    user = await fetch(
        `https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayerByBungieName/-1`,
        opts
    ).then((response) => response.json().then());
    return user.Response;
}

async function ExoticChecker(name) {
    let myHeaders = new Headers();
    myHeaders.append('X-API-KEY', apiKey);
    myHeaders.append('Authorization', '46542');
    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };
    let user = await getUserFromName(name);
    if (!user[0]) {
        return `user '${name}' does not exist.`;
    }
    let firstMembership = user[0];
    let membershipType = firstMembership.membershipType;
    let membershipId = firstMembership.membershipId;
    return fetch(
        `https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=800`,
        requestOptions
    ).then((response) =>
        response.json().then((result) => {
            // every item that the player owns
            /* GallyId '4027219968' IziId = '3211806999' LuminaId = '3512014804' WithoardID = '2522817335' TractorId = '3580904581'
            Verity's Brow = '2897117448' Cenotaph = '2374129871'
            */
            let Exotics = ['4027219968', '3211806999', '3512014804', '2522817335', '3580904581', '2897117448', '2374129871'];

            for (let i = 0; i < Exotics.length; i++) {
                if (collectibles[Exotics[i]].state === 0) {
                    console.log('${name} has ' + Exotics[i]);
                }
                else { console.log('${name} does not have ' + Exotics[i]); }
            };
        })
    );
}
ExoticChecker('Oliver the crow').then(console.log);
ExoticChecker('Oliver the crow#3439').then(console.log);
ExoticChecker('Unstable Light 0:01#9056').then(console.log);
ExoticChecker('very real username').then(console.log);
ExoticChecker('mixed wrestling#8577').then(console.log);
