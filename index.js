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
let colRecords = db.collection("records");

let records  = [];

colRecords.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        let obj = {
            ID : doc.id ,
            Date: doc.data().dateAndTime ,
            description: doc.data().title ,
            Type: doc.data().assetType ,
            Exp_Type: (doc.data().exp_type == "")? "-":doc.data().exp_type ,
            Amount: doc.data().amount
        };
        records.push(obj);
        console.log(records);
    });
    func();
})


function func() {
    records.forEach((record) => {
        console.log(record);
        document.getElementById("tbody").innerHTML += '<td>' + record.ID + '</td>' +
            '<td>' + record.Date.slice(0,10) + '</td>' +
            '<td>' + record.description + '</td>' +
            '<td><span class="status '+record.Type+'x">' + record.Type + '</span></td>' +
            '<td>' + record.Exp_Type + '</td>' +
            '<td>' + record.Amount + '</td>'
    });
}