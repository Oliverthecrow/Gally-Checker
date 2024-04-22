const apiKey = 'd95853023d6143c89b5dd62c4c0ebdf9';
const playerName = 'Oliver the crow'; // Replace 'PLAYER_NAME' with the name of the player you want to search

// Function to make a request to the Bungie API
async function makeRequest(url) {
    try {
        const response = await fetch(url, {
            headers: {
                'X-API-Key': apiKey
            }
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.Message || 'Failed to fetch data from Bungie API');
        }
        return data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

// Function to search for a player by name
async function searchPlayer(playerName) {
    const searchUrl = `https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/-1/${encodeURIComponent(playerName)}/`;
    try {
        const searchResult = await makeRequest(searchUrl);
        if (searchResult.Response.length > 0) {
            return searchResult.Response[0].membershipId;
        } else {
            console.log('Player not found');
            return null;
        }
    } catch (error) {
        console.error('Error searching player:', error.message);
        throw error;
    }
}

// Function to check if the player has Gjallarhorn in their collections
async function checkGjallarhorn(playerId) {
    const collectionsUrl = `https://www.bungie.net/Platform/Destiny2/${playerId}/Profile/`;
    try {
        const profileData = await makeRequest(collectionsUrl);
        const characterIds = profileData.Response.profile.data.characterIds;
        const characterId = characterIds[0]; // Assuming we are checking the collections of the first character
        const characterEquipmentUrl = `https://www.bungie.net/Platform/Destiny2/${playerId}/Profile/${characterId}/?components=102,205`;
        const equipmentData = await makeRequest(characterEquipmentUrl);
        const equipment = equipmentData.Response.equipment.data.items;
        const gjallarhorn = equipment.find(item => item.itemHash === 1363886209); // Gjallarhorn's itemHash
        if (gjallarhorn) {
            console.log('Gjallarhorn found in collections!');
        } else {
            console.log('Gjallarhorn not found in collections');
        }
    } catch (error) {
        console.error('Error checking Gjallarhorn:', error.message);
        throw error;
    }
}

// Main function to initiate the search
async function main() {
    try {
        const playerId = await searchPlayer(playerName);
        if (playerId) {
            await checkGjallarhorn(playerId);
        }
    } catch (error) {
        console.error('Main error:', error.message);
    }
}

// Call the main function
main();