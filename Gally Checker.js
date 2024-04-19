function checkGjallarhorn() {
    const apiKey = "d95853023d6143c89b5dd62c4c0ebdf9";
    const clientId = "46542";
    const userName = document.getElementById("userNameInput").value;

    const encodedUserName = encodeURIComponent(userName);

    fetch(`https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/-1/${encodedUserName}/`, {
        headers: {
            "X-API-Key": apiKey,
            "Authorization": `Bearer ${clientId}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.ErrorStatus === "Success") {
            const membershipId = data.Response[0].membershipId;
            const platform = data.Response[0].membershipType;

            fetch(`https://www.bungie.net/Platform/Destiny2/${platform}/Profile/${membershipId}/?components=102`, {
                headers: {
                    "X-API-Key": apiKey,
                    "Authorization": `Bearer ${clientId}`
                }
            })
            .then(response => response.json())
            .then(data => {
                const collections = data.Response.profileCollectibles.data.collectibles;
                const hasGjallarhorn = collections.hasOwnProperty("1274330687");

                if (hasGjallarhorn) {
                    document.getElementById("result").innerText = "The user has Gjallarhorn in their collections!";
                } else {
                    document.getElementById("result").innerText = "The user does not have Gjallarhorn in their collections.";
                }
            })
            .catch(error => {
                console.error("Error fetching Destiny 2 collections:", error);
            });
        } else {
            console.error("Error fetching Destiny 2 player:", data.Message);
        }
    })
    .catch(error => {
        console.error("Error fetching Destiny 2 player:", error);
    });
}
