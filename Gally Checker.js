const apiKey = "d95853023d6143c89b5dd62c4c0ebdf9";
const THINGS_TO_CHECK = {
    "Gjallarhorn": "4027219968",
    "Izanagi's Burden": "24541428",
    "Lumina": "2924632392",
    "Tractor Cannon": "2094776121",
    "Witherhoard": "1250332035",
    "Verity's Brow": "846189250",
    "Cenotaph Mask": "2940602493",
};

/* let names = [
    "Oliver the crow",
    "Oliver the crow#3439",
    "Unstable Light 0:01#9056",
    "very real username",
    "mixed wrestling#8577",
    "Ourple Gourd#5833",
];*/

let ownedExotics = [false, false, false, false, false, false, false];
let broke = false;
let userDoesNotExist = false;
let Images = [];
let WIW = window.innerWidth;
let WIH = window.innerHeight;

function parseDestinyCollectibleState(state) {
    return {
        none: state === 0,
        notAcquired: (state & 1) !== 0,
        obscured: (state & 2) !== 0,
        invisible: (state & 4) !== 0,
        cannotAffordMaterialRequirements: (state & 8) !== 0,
        inventorySpaceUnavailable: (state & 16) !== 0,
        uniquenessViolation: (state & 32) !== 0,
        purchaseDisabled: (state & 64) !== 0,
    };
}

async function checkForItemOwnership(name) {
    let myHeaders = new Headers();
    myHeaders.append("X-API-KEY", apiKey);
    myHeaders.append("Authorization", "46542");
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };
    let user = await getUserFromName(name);
    if (!user[0]) {
        console.log(RED + `user "${name}" does not exist.` + WHITE);
        return false;
    }
    let firstMembership = user[0];
    const membershipType = firstMembership.membershipType;
    const membershipId = firstMembership.membershipId;
    return fetch(
        `https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=800`,
        requestOptions
    ).then((response) =>
        response.json().then((result) => {
            let itemStates = [];
            for (const [itemName, itemID] of Object.entries(THINGS_TO_CHECK)) {
                let profileCollectibles =
                    result.Response.profileCollectibles.data.collectibles;
                let characters = result.Response.characterCollectibles.data;

                let allStates = {
                    statesPerCharacter: [],
                    profileCollectibles: {},
                };

                // check the characters for item state, if it exists
                for (let character in characters) {
                    let item = characters[character].collectibles[itemID];
                    if (item) {
                        let state = parseDestinyCollectibleState(item.state);
                        allStates.statesPerCharacter[character] = state;
                    }
                }

                // grab profile wide state for item, if it exists.
                if (profileCollectibles[itemID]) {
                    allStates.profileCollectibles = parseDestinyCollectibleState(
                        profileCollectibles[itemID].state
                    );
                }
                itemStates.push({ name: itemName, state: allStates });
            }
            return itemStates;
        })
    );
}

async function getUserFromName(name) {
    let headers = new Headers();
    headers.append("X-API-KEY", apiKey);
    headers.append("Authorization", "46542");
    const opts = {
        method: "POST",
        body: JSON.stringify({
            displayName: name.split("#")[0],
            displayNameCode: name.split("#")[1],
        }),
        headers: headers,
        redirect: "follow",
    };

    let user = await fetch(
        //-1 is the "i dont care about membership type" option.
        `https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayerByBungieName/-1`,
        opts
    ).then((response) => response.json().then());
    return user.Response;
}
function handleCollectibleState(state) {
    broke = state.cannotAffordMaterialRequirements;
    return !state.notAcquired;
}
checkForItemOwnership(names[4]).then((items) => {
    for (let i = 0; i < items.length; i++) {
        let current = items[i].state;
        // if armor piece, and therefore character data
        if (Object.keys(current.statesPerCharacter).length !== 0) {
            let found = false;
            for (let character of Object.values(current.statesPerCharacter)) {
                if (handleCollectibleState(character)) {
                    found = true;
                    break;
                }
            }
            if (found) {
                ownedExotics[i] = true;
            }
        }
        // if profile data
        else {
            ownedExotics[i] = handleCollectibleState(current.profileCollectibles);
        }
    }
}).then(() => {
    if (broke) {
        text("THIS GUY NEEDS TO GET HIS MONEY UP!!!!", WIW * 0.8, WIH * 0.8);
    }
    /* for (let i = 0; i < ownedExotics.length; i++) {
            console.log(`${Object.keys(THINGS_TO_CHECK)[i]}: ${ownedExotics[i]}`);
        } */
});

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
    let canvas = createCanvas(WIW, WIH);
    canvas.parent('GallyCheckerCanvas');
    textAlign(CENTER);
}
function draw() {
    for (let i = 0; i < Images.length; i++) {
        image(Images[i], WIW * 0.10 + WIW * 0.13 * i, WIH * 0.4);
        if (OwnedExotics[i]) {
            image(Checkmark, WIW * 0.10 + WIW * 0.13 * i, WIH * 0.4, 96, 96);
        }
        else {
            image(X, WIW * 0.10 + WIW * 0.13 * i, WIH * 0.4, 96, 96);
        }
    }
    textAlign(CENTER);
    textSize(18);
    if (broke) { text("THIS USER IS SO BROKE HOLY", WIW * 0.8, WIH * 0.8); }
    if (doesnotexist) { text("This user does not seem to exist", WIW * 0.5, WIH * 0.5); }
}

function setname() {
    let name = document.getElementById('userNameInput').value;
    console.log("Variable name is:", name);
    OwnedExotics = [false, false, false, false, false, false, false];
    broke = false;
    doesnotexist = false;
    ExoticChecker(name).then(console.log);
}
