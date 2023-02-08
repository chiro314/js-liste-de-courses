/**
 * Created by sstienface on 16/10/2018.
 * 
ajouter
masquer 
supprimer

** Ajouter une image ou un lien à côté de l'élément de la liste
** Déplacer
 */
//DEBOGAGE :

    //console.log(variable);

    function alertTab(titre,tableau){
        var chaine = titre.toUpperCase() + " :";
        if(tableau.length==0) chaine+=" tableau.length == 0"
        else{
            chaine+=" tableau.length == "+tableau.length;
            for (i=0; i<tableau.length; i++){
                if (tableau[i] == null) chaine+="\ntableau["+i+"] : null";
                else chaine+="\ntableau["+i+"] : " + tableau[i].innerHTML;
        }
        }
        alert(chaine);
        return chaine;
    }

const maListe = document.getElementById("listecommissions"); //ul
var mesLignes = maListe.getElementsByTagName("li"); //li(s)

//INITIALISATION HTML :

        // Ajout d'un form pour saisie :
        const newForm = document.createElement("form");
        document.getElementsByTagName("body")[0].appendChild(newForm); //ou document.body.appendChild(newForm);
        
        // Ajout d'une zone de saisie dans le form :
        const newZone = document.createElement("input");
        newZone.setAttribute("type", "text");
        newZone.style.marginLeft="3em";
        newForm.appendChild(newZone);
    
        // Ajout d'un bouton AJOUTER dans le form :
        const newButton1 = document.createElement("button");
        newButton1.setAttribute("type", "button");
        newButton1.setAttribute("onclick", "ajout()");
        newButton1.innerHTML="Ajouter à la liste";
        newButton1.style.marginLeft="1em";
        newForm.appendChild(newButton1);

        function newBr(dansMonParent){ //new <br> dans le parent
            var newBr = document.createElement("br");
            dansMonParent.appendChild(newBr);
        }
        // Ajout de 2 br :
        newBr(newForm); newBr(newForm); 

        // Ajout d'un bouton SUPPRIMER dans le form :
        const newButton2 = document.createElement("button");
        newButton2.setAttribute("type", "button");
        newButton2.setAttribute("onclick", "suppression()");
        newButton2.innerHTML="Supprimer l'élément sélectionné";
        newButton2.style.marginLeft="3em";
        newButton2.style.backgroundColor="white";
        newForm.appendChild(newButton2);

        // Ajout de 2 br :
        newBr(newForm); newBr(newForm); 

        // Ajout d'un bouton MASQUER dans le form :
        const newButton3 = document.createElement("button");
        newButton3.setAttribute("type", "button");
        newButton3.setAttribute("onclick", "masquer()");
        newButton3.innerHTML="Masquer l'élément sélectionné";
        newButton3.style.marginLeft="3em";
        newButton3.style.backgroundColor="white";
        newForm.appendChild(newButton3);

        // Ajout d'un bouton DEMASQUER dans le form :
        const newButton4 = document.createElement("button");
        newButton4.setAttribute("type", "button");
        newButton4.setAttribute("onclick", "demasquer()");
        newButton4.innerHTML="Démasquer les éléments masqués";
        newButton4.style.marginLeft="0.8em";
        newButton4.style.backgroundColor="white";
        newForm.appendChild(newButton4);

        // Ajout de 2 br :
        newBr(newForm); newBr(newForm); 

        // Ajout d'un bouton DEPLACER non cliquable dans le form :
        const newButton5 = document.createElement("button");
        newButton5.setAttribute("type", "button");
        //newButton4.setAttribute("onclick", "demasquer()");
        newButton5.innerHTML="Uitliser les flèches 'Up' et 'Down' pour déplacer une ligne sélectionnée";
        newButton5.style.marginLeft="3em";
        newButton5.style.backgroundColor="white";
        newForm.appendChild(newButton5);


// !! Ajouter les données du tableau à la liste et afficher la page :
    var tabArticles = ["Orangina", "Creme Fraiche", "Tartiflette", "Emmental", "Bananes", "Chips", "Bieres", "Pizza"];
    for(i=0; i<tabArticles.length; i++) maListe.innerHTML+="<li>"+ tabArticles[i] +"</li>";

/*TEST1 suppression :
alert("test supp li");
var longueur = mesLignes.length;
for(i = longueur-1 ; i>=0 ; i--) maListe.removeChild(mesLignes[i]);
*/
/*TEST2 suppression :
alert("test supp li");
for(i =0 ; i<mesLignes.length ; i++) mesLignes[i].style.display = "none";
for(i =0 ; i<mesLignes.length ; i++) {mesLignes[i].style.display = "block"; mesLignes[i].style="cilcle"}
*/

    // Ajouter un onclick sur toutes les li :
    for(j = 0 ; j<mesLignes.length ; j++) mesLignes[j].setAttribute ( "onclick", "selection(\"" + mesLignes[j].innerHTML + "\")" );

//AJOUTER

	function ajout()
	{   if(!maSelection){  //maSelection est vide
            var dejaDansLaListe = false;
            for(i=0; i<tabArticles.length; i++){ //!!tabArticles remplace mesLignes
                if(tabArticles[i]==newZone.value) dejaDansLaListe = true;
            }
            if(dejaDansLaListe){
                alert("cet élément est déjà dans la liste");
                newZone.value = null;
            }   
            else if (newZone.value != ""){
                //!! ajouter la saisie au tableau et afficher la dernière valeur du tableau, puis ajouter onclick (ça évite de tout réafficher et tout reparamétrer):
                maListe.innerHTML+="<li>"+tabArticles[tabArticles.push(newZone.value) -1]+"</li>";
                mesLignes[mesLignes.length-1].setAttribute("onclick", "selection(\""+tabArticles[tabArticles.length-1]+"\")");

                /* maListe.innerHTML+="<li>"+newZone.value+"</li>";
                mesLignes[mesLignes.length-1].setAttribute("onclick", "selection(\""+mesLignes[mesLignes.length-1].innerHTML+"\")");
                */
                newZone.value = null;
            }
        }
	}

    var maSelection=null;
    var tabSelection=null; // !! pour cibler l'élément du tableau sélectionné
    //console.log(tabSelection);
	//alert("var / tabSelection : " +tabSelection );
    function selection(chaine){
             
        if(maSelection==null){ //mettre chaine en rouge
            for(i=0; i<mesLignes.length; i++){
                if(mesLignes[i].innerHTML==chaine){
                    mesLignes[i].style.background = "red";
                    newButton2.style.backgroundColor="red";
                    newButton3.style.backgroundColor="red";//!!masquer
                    newButton5.style.backgroundColor="red";//!!déplacer
                    maSelection=mesLignes[i];
                    tabSelection=i;//!!
                }
            }
        }
        else{ //ligne déjà sélectionnée
            
            if (maSelection.innerHTML==chaine)  // == chaine => désélectionner 
            {
                maSelection.style.background = "none";
                newButton2.style.backgroundColor="white";
                newButton3.style.backgroundColor="white";//!!masquer
                newButton5.style.backgroundColor="white";//!!déplacer
                maSelection=null;
                tabSelection=null;//!!
            }
            else{ // retirer le rouge de la précédente sélection et le transférer sur chaine
                
                maSelection.style.background = "none";

                for(i=0; i<mesLignes.length; i++){
                    if(mesLignes[i].innerHTML==chaine){
                        mesLignes[i].style.background = "red";
                        maSelection=mesLignes[i];
                        tabSelection=i;//!!
                    }
                }
            }            
        }        
    }

    function suppression(){
        // !! supprimer l'élément du tableau
        if(maSelection!==null){
            //alert ("maSelection!==null");   

            tabArticles.splice(tabSelection,1);//!!
            tabSelection=null;//!!

            maSelection.parentElement.removeChild(maSelection);
            maSelection=null;
            newButton2.style.backgroundColor="white";//supprimer
            newButton3.style.backgroundColor="white";//!! masquer
            newButton5.style.backgroundColor="white";//!!déplacer
        }
        else alert ("Pas de selection");
    }

    var tabEltsMasques = []; //length == 0

    function masquer(){
        if(tabSelection==null)  alert ("Pas de selection");
        else{
            tabEltsMasques+=tabSelection;
            
            afficherTableauMasque();

            tabSelection=null;    
            maSelection=null;

            newButton2.style.backgroundColor="white";// supprimer
            newButton3.style.backgroundColor="white";//!! masquer
            newButton5.style.backgroundColor="white";//!!déplacer
            newButton4.style.backgroundColor="red";//!! démasquer
        }
    }

    function demasquer(){

        if(tabEltsMasques.length!=0){
            for(i =0 ; i<mesLignes.length ; i++) {
                mesLignes[i].style.display = "block";
                mesLignes[i].style="cilcle";
            }
                    
            tabEltsMasques = [];
            //alert("demasquer / tabEltsMasques = [] : tabEltsMasques[0] : "+tabEltsMasques[0]+"  [1] : "+tabEltsMasques[1]);
            newButton4.style.backgroundColor="white";//!! démasquer
        }
        else alert ("Pas d'élément masqué");
    }

    function afficherTableauMasque(){
        //RAZ de l'affichage :
        for(i =0 ; i<mesLignes.length ; i++) mesLignes[i].style.display = "none";
        
        //AFFICHER :
        for(i=0; i<tabArticles.length; i++){
            //contrôler :
            var afficher = true;
            for(j=0; j<tabEltsMasques.length; j++) if (tabEltsMasques[j]==i) afficher = false;
            //afficher si nécessaire :
            if (afficher) {
                mesLignes[i].style.display = "block";
                mesLignes[i].style="cilcle";
            } 
        }
    }

    window.addEventListener("keydown", (event) => {
        switch (event.code){
            case "ArrowUp" : eventUp(); break;
            case "ArrowDown" : eventDown(); break;
        }
    }, true);

    function eventUp(){
        if(tabSelection==null)  alert ("Pas de selection");
        else{     
            var cible = chercherCibleAvant(tabSelection);
            if(cible==null) alert ("Pas d'échange possible en montant"); 
            else{
                echanger(tabSelection,cible);

                //Nouvelle sélection :
                tabSelection=cible;    
                maSelection.style.background = "none";
                maSelection=mesLignes[cible]; //a priori nécessaire ??
                maSelection.style.background = "red";              
            }
        }
    }

    function eventDown(){
        if(tabSelection==null)  alert ("Pas de selection");
        else{     
            var cible = chercherCibleApres(tabSelection);
            if(cible==null) alert ("Pas d'échange possible en descendant"); 
            else{
                echanger(tabSelection,cible);

                //Nouvelle sélection :
                tabSelection=cible;    
                maSelection.style.background = "none";
                maSelection=mesLignes[cible]; //a priori nécessaire ??
                maSelection.style.background = "red";              
            }
        }
    }

    function echanger(indA,indB){
        var transitTabArticle = tabArticles[indA];
        tabArticles[indA] = tabArticles[indB];
        tabArticles[indB] = transitTabArticle;

        var transitLi = mesLignes[indA].innerHTML;   
        mesLignes[indA].innerHTML = mesLignes[indB].innerHTML;
        mesLignes[indB].innerHTML = transitLi;

        mesLignes[indA].setAttribute("onclick", "selection(\""+tabArticles[indA]+"\")");
        mesLignes[indB].setAttribute("onclick", "selection(\""+tabArticles[indB]+"\")");
    }

    function chercherCibleApres(indDepart){
        var trouve = false;
        for (i=indDepart+1; i<tabArticles.length; i++){
            var idMasque = false;
            for(j=0; j<tabEltsMasques.length; j++){
                if (tabEltsMasques[j] == i) idMasque = true;
            }
            if (idMasque == false) return i;
        }
        return null;
    }

    function chercherCibleAvant(indDepart){
        var trouve = false;
        for (i=indDepart-1; i>=0; i--){
            var idMasque = false;
            for(j=0; j<tabEltsMasques.length; j++){
                if (tabEltsMasques[j] == i) idMasque = true;
            }
            if (idMasque == false) return i;
        }
        return null;
    }
    




