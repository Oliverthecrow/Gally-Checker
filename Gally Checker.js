let username = ''; // Initialize username variable
let discriminator = ''; // Initialize discriminator variable

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

    const apiKey = 'd95853023d6143c89b5dd62c4c0ebdf9';


    // Function to fetch data from Bungie API
    async function fetchGjallarhornInfo(username, discriminator) {
        const membershipResponse = await fetch(`https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/-1/${username}/`, {
            headers: {
                'X-API-Key': apiKey
            }
        });
        const membershipData = await membershipResponse.json();
        console.log('Membership response:', membershipData);

        try {
            // Get membership ID for the given username
            const membershipResponse = await fetch(`https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/-1/${username}/`, {
                headers: {
                    'X-API-Key': apiKey
                }
            });
            const { Response } = await membershipResponse.json();

            // Find the correct user by matching the discriminator
            const user = Response.find(player => player.displayName === `${username}#${discriminator}`);
            if (!user) {
                console.error('User not found');
                return false;
            }

            const membershipId = user.membershipId;

            // Get profile information including collections
            const profileResponse = await fetch(`https://www.bungie.net/Platform/Destiny2/-1/Profile/${membershipId}/?components=102`, {
                headers: {
                    'X-API-Key': apiKey
                }
            });
            const { Response: { profile: { data: { profileCollectibles } } } } = await profileResponse.json();

            // Check if the Gjallarhorn rocket launcher is in the collections
            const gjallarhorn = profileCollectibles.collectibles.find(collectible => collectible.itemHash === 1274330687);

            return gjallarhorn !== undefined;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    window.addEventListener('keydown', function (e) {
        if (e.keyCode == 13) {
            fetchGjallarhornInfo(username).then(hasGjallarhorn => {
                console.log(`${username} ${hasGjallarhorn ? 'has' : 'does not have'} the Gjallarhorn rocket launcher.`);
            });
        }
    })
}



