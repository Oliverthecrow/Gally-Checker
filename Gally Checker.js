function checkGjallarhorn() {
    const apiKey = 'd95853023d6143c89b5dd62c4c0ebdf9';
    let displayName = document.getElementById('userNameInput').value.trim();
    let membershipType = 3; // Assuming Steam, change if needed

    const hashIndex = displayName.indexOf('#');
    if (hashIndex !== -1) {
        displayName = displayName.substring(0, hashIndex);
    }

    const url = `https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/${membershipType}/${displayName}/`;

    fetch(url, {
        headers: {
            'X-API-Key': apiKey,
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.Response && data.Response.length > 0) {
            const player = data.Response[0];
            const membershipId = player.membershipId;
            const membershipType = player.membershipType;
            console.log(`Membership ID: ${membershipId}, Membership Type: ${membershipType}`);

            // Now fetch the player's collection
            const collectionUrl = `https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=800`;

            fetch(collectionUrl, {
                headers: {
                    'X-API-Key': apiKey,
                },
            })
            .then(response => response.json())
            .then(collectionData => {
                // Check if Gjallarhorn is in the collection
                const collections = collectionData.Response.profileCollectibles.data.collectibles;
                const gjallarhorn = collections['1363886209']; // Gjallarhorn's item ID
                if (gjallarhorn) {
                    console.log('Gjallarhorn is in the collection');
                } else {
                    console.log('Gjallarhorn is NOT in the collection');
                }
            })
            .catch(error => {
                console.error('Error fetching collection:', error);
            });

        } else {
            console.log('Player not found');
        }
    })
    .catch(error => {
        console.error('Error fetching player:', error);
    });
}
