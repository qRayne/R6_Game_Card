export default class Cartes {
    constructor(id, cost, hp, atk, mechanics, uid, baseHp) {
        this.id = id;
        this.cost = cost;
        this.hp = hp;
        this.atk = atk;
        this.mechanics = mechanics;
        this.uid = uid;
        this.baseHp = baseHp;
    }


    static createElement(className, element, idCarte, state) {
        let mainDiv = document.createElement("div");
        mainDiv.id = idCarte;

        let costDiv = document.createElement("div");
        let costNode = document.createTextNode("COST : " + element["cost"]);
        costDiv.id = idCarte;

        let hpDiv = document.createElement("div");
        let hpNode = document.createTextNode("HP : " + element["hp"]);;
        hpDiv.id = idCarte;

        let atkDiv = document.createElement("div");
        let atkNode = document.createTextNode("ATK : " + element["atk"]);
        atkDiv.id = idCarte;

        let mecDiv = document.createElement("div");
        let mecNode = "";

        if (element["mechanics"][0] == null) {
            mecNode = document.createTextNode("Minion");
        } else {
            mecNode = document.createTextNode(element["mechanics"][0]);
        }

        mecDiv.id = idCarte;

        costDiv.append(costNode);
        hpDiv.append(hpNode);
        atkDiv.append(atkNode);
        mecDiv.append(mecNode);

        mainDiv.append(costDiv);
        mainDiv.append(hpDiv);
        mainDiv.append(atkDiv);
        mainDiv.append(mecDiv);

        if (state != undefined) {
            let stateDiv = document.createElement("div");
            let stateNode = document.createTextNode(element["state"]);
            stateDiv.append(stateNode);
            mainDiv.append(stateDiv);
        }

        mainDiv.style.height = "180px";
        mainDiv.style.width = "130px";
        mainDiv.style.textAlign = "center";
        mainDiv.style.backgroundColor = "#0e1111";
        mainDiv.style.backgroundImage = "url(images/logo.png)";
        mainDiv.style.backgroundSize = "contain";
        mainDiv.style.backgroundRepeat = "no-repeat";
        mainDiv.style.border = "#05807b 5px solid";
        mainDiv.style.opacity = "0.8";
        mainDiv.style.margin = "10px 20px";
        mainDiv.style.color = "white";
        mainDiv.style.fontWeight = "500";

        document.querySelector(className).append(mainDiv);
    }

}