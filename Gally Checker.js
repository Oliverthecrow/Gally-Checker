const axios = require('axios');

// Function to get Destiny 2 profile information
async function getDestinyProfile(memberId, membershipType) {
    const apiKey = 'd95853023d6143c89b5dd62c4c0ebdf9';
    const url = `https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${memberId}/?components=100,200`;

    try {
        const response = await axios.get(url, {
            headers: {
                'X-API-Key': apiKey
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching Destiny 2 profile:', error);
        return null;
    }
}

// Function to check if Gjallarhorn is in the collections
function hasGjallarhorn(collections) {
    const gjallarhornHash = 1363886209; // Gjallarhorn's item hash
    return collections.some(item => item.itemHash === gjallarhornHash);
}

// Main function to check Gjallarhorn in collections
async function checkForGjallarhorn(username, discriminator) {
    const apiKey = 'd95853023d6143c89b5dd62c4c0ebdf9';
    const membershipType = 3; // Platform code for PC, change if needed
    let memberId;

    // Get the membership ID using the displayName and discriminator
    try {
        const response = await axios.get(`https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/${membershipType}/${username}%23${discriminator}/`, {
            headers: {
                'X-API-Key': apiKey
            }
        });

        if (response.data.Response.length > 0) {
            memberId = response.data.Response[0].membershipId;
        } else {
            console.error('Player not found');
            return;
        }
    } catch (error) {
        console.error('Error fetching membership ID:', error);
        return;
    }

    // Get Destiny profile information
    const profile = await getDestinyProfile(memberId, membershipType);

    if (profile && profile.Response && profile.Response.profileInventory && profile.Response.profileInventory.data) {
        const collections = Object.values(profile.Response.profileInventory.data.items);

        // Check if Gjallarhorn is in collections
        const hasGjallarhornInCollections = hasGjallarhorn(collections);
        
        if (hasGjallarhornInCollections) {
            console.log(`${username}#${discriminator} has Gjallarhorn in their collections!`);
        } else {
            console.log(`${username}#${discriminator} does not have Gjallarhorn in their collections.`);
        }
    } else {
        console.error('Error fetching profile information');
    }
}

// Example usage
checkForGjallarhorn('Oliver the crow', '3439');