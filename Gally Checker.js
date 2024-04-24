let apiKey = 'd95853023d6143c89b5dd62c4c0ebdf9';
let OwnedExotics = [false, false, false, false, false, false, false]
let Images = [];

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
            let collectibles = result.Response.profileCollectibles.data.collectibles;
            let Exotics = ['4027219968', '3211806999', '3512014804', '2522817335', '3580904581', '2897117448', '2374129871'];

            for (let i = 0; i < Exotics.length; i++) {
                if (collectibles[Exotics[i]].state === 0) {
                    console.log('${name} has ' + Exotics[i]);
                    OwnedExotics.splice(i, 1, true)
                }
                else { console.log(name + ' does not have ' + Exotics[i]); }
            };
        })
    );
}
ExoticChecker('Oliver the crow').then(console.log);
ExoticChecker('Oliver the crow#3439').then(console.log);
ExoticChecker('Unstable Light 0:01#9056').then(console.log);
ExoticChecker('very real username').then(console.log);
ExoticChecker('mixed wrestling#8577').then(console.log);

function preload() {
    Images = [
        Gjally = loadImage('Gjally.jpg'),
        Izi = loadImage("Izanagis Burden.jpg"),
        Lumina = loadImage('Lumina.jpg'),
        Tractor = loadImage('Tractor Canon.jpg'),
        Witherhoard = loadImage('Witherhoard.jpg'),
        Verity = loadImage("Veritys Brow.jpg"),
        Cenotaph = loadImage('Cenotaph.jpg')
    ];
}
function setup() {
    let WIW = window.innerWidth;
    let WIH = window.innerHeight;
    let canvas = createCanvas(WIW, WIH)
    canvas.parent('GallyCheckerCanvas')
}
function draw() {
    for (let i = 0; i < Image.length; i++) {
        image(Images[i], WIW * 0.15 + (WIW * 0.15 * i), WIH * 0.75)
    }
}
function setname() {
    let name = document.getElementById('usernameinput').value;
    console.log("Variable name is:", name);
    return name;
}
