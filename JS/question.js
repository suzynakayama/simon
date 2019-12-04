//(function () {

const endless = document.getElementById("endless");
const leveled = document.getElementById("leveled");
const levelInput = document.getElementById("levelInput");

let level = findLevel();

function findLevel() {
    if (endless.checked) {
        return 6;
        //just push random number into computer array every turn
    } else if (leveled.checked) {
        return levelInput.value;
    }
}

//})
