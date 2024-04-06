
var apiKey = "d95853023d6143c89b5dd62c4c0ebdf9";

var xhr = new XMLHttpRequest();
xhr.open("GET", "https://www.bungie.net/en/OAuth/Authorize", true);
xhr.setRequestHeader("X-API-KEY", apiKey);
xhr.setRequestHeader("Authorization", "Bearer 46542");

xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        var json = JSON.parse(this.responseText);
        console.log(json.Response.data.inventoryItem.itemName); //Gjallarhorn
    }
}
xhr.send();


