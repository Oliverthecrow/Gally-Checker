let APIkey = 'd95853023d6143c89b5dd62c4c0ebdf9'
let ClientID = '46542'

function axiosGet(url, apiKey, clientId) {
    const headers = {
        'X-API-Key': APIkey,
        'X-ClientId': clientId
    };

    return fetch(url, {
        headers: headers
    }).then(response => response.json())
    .catch(error => {
        console.error('Error fetching data:', error);
        return null;
    });
}

// Function to get Destiny 2 profile information
function getDestinyProfile(memberId, membershipType, apiKey, clientId) {
    const url = `https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${memberId}/?components=100,200`;

    return axiosGet(url, apiKey, clientId);
}

// Function to check if Gjallarhorn is in the collections
function hasGjallarhorn(collections) {
    const gjallarhornHash = 1363886209; // Gjallarhorn's item hash
    return collections.some(item => item.itemHash === gjallarhornHash);
}

// Main function to check Gjallarhorn in collections
async function checkForGjallarhorn(username, discriminator, apiKey, clientId) {
    const membershipType = -1;

    // Get the membership ID using the displayName and discriminator
    const searchUrl = `https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/${membershipType}/${username}%23${discriminator}/`;

    const searchResponse = await axiosGet(searchUrl, apiKey, clientId);

    if (searchResponse && searchResponse.Response && searchResponse.Response.length > 0) {
        const memberId = searchResponse.Response[0].membershipId;

        // Get Destiny profile information
        const profile = await getDestinyProfile(memberId, membershipType, apiKey, clientId);

        if (profile && profile.Response && profile.Response.profileInventory && profile.Response.profileInventory.data) {
            const collections = Object.values(profile.Response.profileInventory.data.items);

            // Check if Gjallarhorn is in collection
            const hasGjallarhornInCollections = hasGjallarhorn(collections);

            if (hasGjallarhornInCollections) {
                console.log(`${username}#${discriminator} has Gjallarhorn in their collections!`);
            } else {
                console.log(`${username}#${discriminator} does not have Gjallarhorn in their collections.`);
            }
        } else {
            console.error('Error fetching profile information');
        }
    } else {
        console.error('Player not found');
    }
}

// Example usage
checkForGjallarhorn('Oliver the crow', '3439', 'YOUR_BUNGIE_API_KEY', 'YOUR_BUNGIE_CLIENT_ID');
