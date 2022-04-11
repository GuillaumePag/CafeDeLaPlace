// Récupération du formulaire
let formQuery = document.querySelector("#productForm");

// Récupération de la div pour afficher le stock
var myTable = document.querySelector("#table");

// Création de mon tableau produit à vide
let productArray = [];

// Crétion du tableau stock
let table = document.createElement("table");
let headerRow = document.createElement("tr");
let headers = [
  "nom",
  "quantite",
  "typeProduit",
  "paHT",
  "marge",
  "pvHT",
  "pvTTC",
  "degresAlcool",
];
headers.forEach((headerText) => {
  let header = document.createElement("th");
  let textNode = document.createTextNode(headerText);
  header.appendChild(textNode);
  headerRow.appendChild(header);
});
table.appendChild(headerRow);
myTable.appendChild(table);

// Création de l'addEventListener du formulaire
formQuery.addEventListener("submit", function (e) {
  // Blocage du rechargement de la page
  e.preventDefault();

  // Récupération des données du formulaire
  let data = new FormData(formQuery);

  // Calcul du prix de vente HT et TTC
  let calculpvHT = Number(data.get("prixAchatHT")) * Number(data.get("marge"));
  console.log(calculpvHT);
  let calculpvTTC = calculpvHT + calculpvHT * 0.1;
  console.log(calculpvTTC);

  // Variable de mon formulaire
  let objetProduit = {
    nom: data.get("nom"),
    quantite: Number(data.get("quantite")),
    typeProduit: document.querySelector("#typeProduit").value,
    degresAlcool: Number(data.get("degresAlcool")),
    paHT: Number(data.get("prixAchatHT")),
    marge: Number(data.get("marge")),
    pvHT: calculpvHT,
    pvTTC: calculpvTTC,
  };
  console.log(objetProduit);

  if (
    !objetProduit.nom ||
    !objetProduit.quantite ||
    !objetProduit.typeProduit ||
    !objetProduit.paHT ||
    !objetProduit.marge
  ) {
    alert("Veuillez remplir tous les champs");
  } else {
    // Création variable qui va appeler la fonction prototype
    let product;
    if (
      objetProduit.typeProduit == "bna" ||
      objetProduit.typeProduit == "autres"
    ) {
      product = new ProductProto(
        objetProduit.nom,
        objetProduit.quantite,
        objetProduit.typeProduit,
        objetProduit.paHT,
        objetProduit.marge,
        objetProduit.pvHT,
        objetProduit.pvTTC
      );
    } else {
      product = new BoissonAlcoolisee(
        objetProduit.degresAlcool,
        objetProduit.nom,
        objetProduit.quantite,
        objetProduit.typeProduit,
        objetProduit.paHT,
        objetProduit.marge,
        objetProduit.pvHT,
        objetProduit.pvTTC
      );
    }
    console.log(product);

    // Ajouter dans le tableau productArray
    productArray.push(product);

    // Effacer les valeurs des INPUT du formulaire
    formQuery.reset();

    // ****************** Afficher les produits en ligne ************************//
    let row = document.createElement("tr");

    Object.values(product).forEach((text) => {
      let cell = document.createElement("td");
      let textNode = document.createTextNode(text);
      cell.appendChild(textNode);
      row.appendChild(cell);
    });

    // ****************** Création du button supprimer ************************//

    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Supprimer";
    deleteButton.className = "btnClose";
    row.appendChild(deleteButton);

    deleteButton.addEventListener("click", (index) => {
      row.remove();
      productArray.splice(index, 1);
      localStorage.setItem("@productArray", JSON.stringify(productArray));
    });

    table.appendChild(row);
    localStorage.setItem("@productArray", JSON.stringify(productArray));

    // ---------------------------------------------------------------------

    let modal = document.querySelector(".modal");

    let popUp = document.querySelector(".btn");
    popUp.addEventListener("click", () => {
      modal.innerHTML = `<!-- Création Pop up de modification -->
  
    <!-- Button "Modifier" à supprimer pour relier à NOTRE boutton crée par le JS -->
  
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <!-- Titre du pop up -->
            <h5 class="modal-title" id="exampleModalLabel">Modification du stock</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
  
          <!-- Création du formulaire dans la pop up de modification -->
          <div class="modal-body">
            <form>
  
                <!-- Création de l'input "Nom du produit" dans la pop up de modification -->
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Nom du produit: </label>
                <input type="text" class="form-control" id="recipient-name">
              </div>
  
              <!-- Création du Select dans la pop up de modification -->
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Type de produit:</label>
                  <select name="typeProduit" id="typeProduit">
                      <option value="">Type de produit </option>
                      <option value="ba">Boisson Alcoolisée</option>
                      <option value="bna">Boisson non alcoolisé</option>
                      <option value="autres">autres</option>
                </select>
                  </div>
                  
              <!-- Création de l'input "Degrès d'alcool" dans la pop up de modification -->
              <div class="form-group">
                  <label for="recipient-name" class="col-form-label">Degrès d'alcool:</label>
                  <input type= "number" class="form-control" id="message-text">
                </div>
  
                <!-- Création de l'input "Prix d'achat HT" dans la pop up de modification -->
              <div class="form-group">
                  <label for="recipient-name" class="col-form-label">Prix d'achat HT:</label>
                  <input type= "number" class="form-control" id="message-text">
                </div>
  
                <!-- Création de l'input "Marge" dans la pop up de modification -->
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">Marge:</label>
                  <input type= "number" class="form-control" id="message-text">
                </div>
  
                <!-- Création de l'input "Degrès d'alcool" dans la pop up de modification -->
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">Prix de vente HT:</label>
                </div>
  
                <!-- Création de l'input "Prix de vente TTC" dans la pop up de modification -->
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">Prix de vente TTC:</label>
                </div>
  
                <!-- Création de l'input "Quantitée" dans la pop up de modification -->
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">Quantitée:</label>
                  <input type="number" class="form-control" id="message-text">
                </div>
                
            </form>
          </div>
  
          <!-- Création des boutton " Validation" et "Annuler" dans la pop up de modification -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
            <button type="submit" class="btn btn-primary">Validation</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Fin pop up -->`;
    });
  }
});

/******************************************************************************************
 *********************** CREATION DE MES FONCTIONS CONSTRUCTRICE  *************************
 ******************************************************************************************/

// Création de ma fonction constructeur
class ProductProto {
  constructor(nom, quantite, typeProduit, paHT, marge, pvHT, pvTTC) {
    this.nom = nom;
    this.quantite = quantite;
    this.typeProduit = typeProduit;
    this.paHT = paHT;
    this.marge = marge;
    this.pvHT = pvHT;
    this.pvTTC = pvTTC;
    this.degresAlcool = "";
  }
}

// Création de notre function boisson alcoolisée
class BoissonAlcoolisee extends ProductProto {
  constructor(
    degresAlcool,
    nom,
    quantite,
    typeProduit,
    paHT,
    marge,
    pvHT,
    pvTTC
  ) {
    super(nom, quantite, typeProduit, paHT, marge, pvHT, pvTTC);
    this.degresAlcool = degresAlcool;
  }
}
