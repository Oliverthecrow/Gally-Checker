let apiKey = 'd95853023d6143c89b5dd62c4c0ebdf9';
let OwnedExotics = [false, false, false, false, false, false, false]
let Images = [];
let WIW = window.innerWidth;
let WIH = window.innerHeight;
let broke = false
let doesnotexist = false

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
        doesnotexist = true;
        return `user '${name}' does not exist.`;
    }
    let firstMembership = user[0];
    let membershipType = firstMembership.membershipType;
    let membershipId = firstMembership.membershipId;
    console.log("membershipID " + membershipId);
    console.log("membershipType " + membershipType);
    return fetch(
        `https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=800`,
        requestOptions
    ).then((response) =>
        response.json().then((result) => {
            // every item that the player owns
            /* GallyId '4027219968' IziId = '24541428' LuminaId = '2924632392' WithoardID = '1250332035' TractorId = '2094776121'
            Verity's Brow = '846189250' Cenotaph = '2940602493'
            */
            let collectibles = result.Response.profileCollectibles.data.collectibles;
            let charCollectibles = result.Response.characterCollectibles.data;
            let Exotics = ['4027219968', '24541428', '2924632392', '1250332035', '2094776121', '846189250', '2940602493'];

            for (let i = 0; i < Exotics.length; i++) {
                if (collectibles[Exotics[i]].state === 0 || charCollectibles[Exotics[i]].state % 2 === 0 && charCollectibles[Exotics[i]].state != 0) {
                    console.log(name + ' has ' + Exotics[i]);
                    OwnedExotics.splice(i, 1, true)
                    if(collectibles[Exotics[i]].state === 8 || collectibles[Exotics[i]].state === 9) {
                        broke = true;
                    }
                }
                else { console.log(name + ' does not have ' + Exotics[i]); }
            };
        })
    );
}
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
    Checkmark = loadImage('checkmark.png');
    X = loadImage('x.png');
}
function setup() {
    let canvas = createCanvas(WIW, WIH)
    canvas.parent('GallyCheckerCanvas')
}
function draw() {
    for (let i = 0; i < Images.length; i++) {
        image(Images[i], WIW * 0.10 + WIW * 0.13 * i, WIH * 0.4);
        if (OwnedExotics[i]) {
            image(Checkmark,WIW * 0.10 + WIW * 0.13 * i, WIH * 0.4,96,96);
        }
        else {
            image(X,WIW * 0.10 + WIW * 0.13 * i, WIH * 0.4,96,96);
        }
    }
    textAlign(CENTER);
    textSize(18);
    if(broke) {text("THIS USER IS SO BROKE HOLY",WIW*0.8,WIH*0.8);}
    if(doesnotexist) {text("This user does not seem to exist",WIW*0.5,WIH*0.5);}
}
//runs all the code when clicking button and resets variables from previous searches
function setname() {
    let name = document.getElementById('userNameInput').value;
    console.log("Variable name is:", name);
    OwnedExotics = [false, false, false, false, false, false, false];
    broke = false;
    doesnotexist = false;
    ExoticChecker(name).then(console.log);
}
