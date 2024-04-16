let username = ''; // Initialize username variable
let discriminator = ''; // Initialize discriminator variable
let clientId = '46542'; // Replace 'YOUR_CLIENT_ID_HERE' with your actual client ID
let redirectUri = encodeURIComponent('https://oliverthecrow.github.io/Gally-Checker/');
let state = Math.random().toString(36).substring(2, 15);
let authUrl = `https://www.bungie.net/en/OAuth/Authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&state=${state}`;

function setup() {
    let input = select('.search'); // Select the input field
    input.input(updateUsername); // Listen for input changes
}

function updateUsername() {
    let input = select('.search'); // Select the input field
    let value = input.value(); // Get the input field's value

    // Extract username and discriminator
    let parts = value.split('#');
    if (parts.length === 2) {
        username = parts[0];
        discriminator = parts[1];
        console.log(`Username: ${username}, Discriminator: ${discriminator}`); // Log the extracted username and discriminator
    } else {
        console.error('Invalid username format');
        return;
    }

    let apiKey = 'd95853023d6143c89b5dd62c4c0ebdf9'

    // Function to fetch data from Bungie API
    async function fetchGjallarhornInfo(username, discriminator) {
        try {
            // Get membership ID for the given username
            let membershipResponse = await fetch(`https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/-1/${username}/`, {
                headers: {
                    'X-API-Key': apiKey
                }
            });
            let data = await membershipResponse.json();
            console.log('SearchDestinyPlayer response:', data); // Log the response data
            let players = data.Response || [];

            // Find the correct user by matching the discriminator
            let user = players.find(player => player.displayName === `${username}#${discriminator}`);
            if (!user) {
                console.error('User not found');
                return false;
            }

            let membershipId = user.membershipId;

            // Get profile information including collections
            let profileResponse = await fetch(`https://www.bungie.net/Platform/Destiny2/-1/Profile/${membershipId}/?components=102`, {
                headers: {
                    'X-API-Key': apiKey
                }
            });
            let { Response: profile } = await profileResponse.json();

            // Check if the Gjallarhorn rocket launcher is in the collections
            let gjallarhorn = profile.profileCollectibles.collectibles.find(collectible => collectible.itemHash === 1274330687);

            return gjallarhorn !== undefined;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    fetchGjallarhornInfo(username, discriminator).then(hasGjallarhorn => {
        console.log(`${username} ${hasGjallarhorn ? 'has' : 'does not have'} the Gjallarhorn rocket launcher.`);
    });
}

