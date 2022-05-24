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
            Exp_Type: (doc.data().exp_type === "")? "-":doc.data().exp_type ,
            Ass_Type: (doc.data().ass_type === "")? "-":doc.data().ass_type ,
            Liab_Type: (doc.data().liab_type === "")? "-":doc.data().liab_type ,
            Amount: doc.data().amount
        };
        records.push(obj);
        console.log(records);
    });
    func();
    dashboard_update();
})


function func() {
    records.forEach((record) => {
        let variable ;
        console.log(record.Exp_Type);
        if( record.Exp_Type !=="-")
            variable = record.Exp_Type;
        else if(record.Ass_Type!=="-")
            variable = record.Ass_Type;
        else if(record.Liab_Type!=="-")
            variable = record.Liab_Type;
        else
            variable = "-";
        console.log(variable);


        document.getElementById("tbody").innerHTML += '<td>' + record.ID + '</td>' +
            '<td>' + record.Date.slice(0,10) + '</td>' +
            '<td>' + record.description + '</td>' +
            '<td><span class="status '+ record.Type +'x">' + record.Type + '</span></td>' +
            '<td>' + variable + '</td>' +
            '<td>' + record.Amount + '</td>';
    });
}

function dashboard_update() {
    console.log("dashboard updated");
    db.collection("homepage").doc("dashboard").get().then((r)=>{
        if (r.exists){
            console.log(r)

            document.getElementById('netprofit').innerHTML = 'Rs.'+r.data().Net_Profit;
            document.getElementById('grossprofit').innerHTML = 'Rs.'+r.data().Gross_Profit;
        }
    }).catch((e)=>{
        console.log(e);
    })
}