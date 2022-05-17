// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCXzTLjIinpg0n-eVpjJzYG2s66Gkv1jIY",
    authDomain: "combook-676c6.firebaseapp.com",
    projectId: "combook-676c6",
    storageBucket: "combook-676c6.appspot.com",
    messagingSenderId: "346024508214",
    appId: "1:346024508214:web:10360bd811f89eaa741197"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
let collection = db.collection("records");

let totDebit = 0;
let totCredit = 0;

loadRecords().then(r => addTotalRow());



async function loadRecords(){
   await collection.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            addRecord(
                doc.data().creditDebit,
                doc.data().title,
                doc.data().amount);
        });
    })
}

function addRecord( type, description, amount){

    let table = getElementById("tbTable");

    let row = table.insertRow();

    row.insertCell().appendChild(document.createTextNode(description));
    console.log(type)
    if (type=="debit"){
        let cell = row.insertCell();
        cell.appendChild(document.createTextNode(parseFloat(amount).toFixed(2)));
        console.log(cell)
        cell.classList.add("align_right");
        totDebit += parseInt(amount);
    }
    else
        row.insertCell().appendChild(document.createTextNode(" "));

    if (type=="credit") {
        let cell = row.insertCell();
        cell.appendChild(document.createTextNode(parseFloat(amount).toFixed(2)));
        console.log(cell)
        cell.classList.add("align_right");
        totCredit += parseInt(amount);
    }
    else
        row.insertCell().appendChild(document.createTextNode(" "));


}

function getElementById(id){
    return document.getElementById(id);
}

function addTotalRow(){
    let table = getElementById("tbTable");
    let row = table.insertRow();
    row.innerHTML = '<tr class="lastrow"> <td></td> <td class="bold align_right">'+parseFloat(totDebit).toFixed(2)+'</td> <td class="bold align_right">'+parseFloat(totCredit).toFixed(2)+'</td> </tr>'
}