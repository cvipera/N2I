let acid = document.getElementById("acid")
let textAcid = document.getElementById("textAcid")

acid.addEventListener("click",()=>{
    if(acid.innerText === "Pour un humain ?") {
        textAcid.innerText="Chez un humain, ce serait un peu comme avoir une osthéoporose, c'est une maladie qui empêche les os de se renouveler, les os se fragilisent et deviennent de plus en plus mince"
        acid.innerText="Pour un océan ?"
    }
    else {
        textAcid.innerText="L'acidification des océans empêche les organismes calcifiant tels que les huitres, les crabes ou encore les coraux à développer et entretenir leur coquille et leur squelette"
        acid.innerText="Pour un humain ?"
    }
    acid.classList.toggle("click-button");
})

let temperature = document.getElementById("temperature")
let textTemperature = document.getElementById("textTemperature")

temperature.addEventListener("click",()=>{
    if(temperature.innerText === "Pour un humain ?") {
        textTemperature.innerText="Cela a le même effet que chez un humain, cela entraîne une hypoxie, c'est-à-dire un apport d'oxygène trop faible par rapport au besoin cellulaire"
        temperature.innerText="Pour un océan ?"
    }
    else {
        textTemperature.innerText="L'oxygène est moins soluble dans l'eau chaude, il y a donc un manque d'oxygène pour les organismes" +
            "Le réchauffement des eaux perturbe également la migration de plusieurs espèces et affectent ainsi leur reproduction"
        temperature.innerText="Pour un humain ?"
    }
    temperature.classList.toggle("click-button");
})

let oil = document.getElementById("oil")
let textOil = document.getElementById("textOil")

oil.addEventListener("click",()=>{
    if(oil.innerText === "Pour un humain ?") {
        textOil.innerText="Pour un humain, cela revient à une paralysie des membres suivi d'un empoisonnement"
        oil.innerText="Pour un océan ?"
    }
    else {
        textOil.innerText="Les hydrocarbures de type lourd ont de multiples impacts liés à l’engluement physique qu’ils provoquent : la végétation recouverte est étouffée, les oiseaux mazoutés sont incapables de voler et ne peuvent plus s’alimenter, etc.\n" +
            "            Les hydrocarbures legers ont des effets toxiques pour les organismes"
        oil.innerText="Pour un humain ?"
    }
    oil.classList.toggle("click-button");
})