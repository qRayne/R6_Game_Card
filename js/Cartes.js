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


    static createElement(className, element, idCarte) {
        let mainDiv = document.createElement("div");
        mainDiv.id = idCarte;

        let costDiv = document.createElement("div");
        let costNode = document.createTextNode("Cost " + element["cost"]);
        costDiv.id = idCarte;

        let hpDiv = document.createElement("div");
        let hpNode = document.createTextNode("Hp " + element["hp"]);
        hpDiv.id = idCarte;

        let atkDiv = document.createElement("div");
        let atkNode = document.createTextNode("Atk " + element["atk"]);
        atkDiv.id = idCarte;

        let mecDiv = document.createElement("div");
        let mecNode = document.createTextNode(element["mechanics"][0]);
        mecDiv.id = idCarte;

        costDiv.append(costNode);
        hpDiv.append(hpNode);
        atkDiv.append(atkNode);
        mecDiv.append(mecNode);

        mainDiv.append(costDiv);
        mainDiv.append(hpDiv);
        mainDiv.append(atkDiv);
        mainDiv.append(mecDiv);

        mainDiv.style.height = "160px";
        mainDiv.style.width = "100px";
        mainDiv.style.textAlign = "center";
        mainDiv.style.backgroundColor = "#0e1111";
        mainDiv.style.border = "#05807b 5px solid";
        mainDiv.style.opacity = "0.8";
        mainDiv.style.margin = "20px";
        mainDiv.style.marginTop = "10px";
        mainDiv.style.color = "white";

        document.querySelector(className).append(mainDiv);
    }

}