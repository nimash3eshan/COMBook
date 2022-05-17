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

const sales = document.getElementById("sales");
const returnInwards = document.getElementById("returnInwards");
const SalesTotal = document.getElementById("salesTotal");
const wagesSalaries = document.getElementById("wagesSalaries");
const rent = document.getElementById("rent");
const rate = document.getElementById("rate");
const TotalAdminstrativeExpenses = document.getElementById("TotalAdminstrativeExpenses");
const deliveryVan = document.getElementById("deliveryVan");
const advertisement = document.getElementById("advertisement");
const badDebts = document.getElementById("badDebts");
const CarrageOutwards = document.getElementById("CarrageOutwards");
const TotalDistributingExpenses = document.getElementById("TotalDistributingExpenses");
const bankCharges = document.getElementById("BankCharges");
const Overdraft = document.getElementById("Overdraft");
const financialTotal = document.getElementById("FinancialTotal");
const Sundry = document.getElementById("Sundry");
const Donation = document.getElementById("Donation");
const TotalOthers = document.getElementById("TotalOthers");
const TotalExpenses = document.getElementById("TotalExpenses");
const OpenStock = document.getElementById("OpenStock");
const Purchase = document.getElementById("Purchase");
const CarryInwards = document.getElementById("CarryInwards");
const ReturnOutwards = document.getElementById("ReturnOutwards");
const CloseInventory = document.getElementById("CloseInventory");
const TotalCostOfSales = document.getElementById("TotalCostOfSales");
const discountrecived = document.getElementById("discountrecived");
const rentincome = document.getElementById("rentincome");
const profit = document.getElementById("profit");
const TotalIncome = document.getElementById("TotalIncome");
const TotalGrossProfit = document.getElementById("TotalGrossProfit");
const netprofit = document.getElementById("netprofit");


let records  = [];
let accruals  = [];
let prepayments  = [];
let receivables  = [];
let advance  = [];
let debts  = [];

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
    });
}).catch((e)=>{
    console.log(e);
})
db.collection("accrual").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        let obj = {
            ID : doc.id ,
            description: doc.data().title ,
            Amount: doc.data().amount
        };
        accruals.push(obj);
    });
}).catch((e)=>{
    console.log(e);
})
db.collection("payments").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        let obj = {
            ID : doc.id ,
            description: doc.data().title ,
            Amount: doc.data().amount
        };
        prepayments.push(obj);
    });
}).catch((e)=>{
    console.log(e);
})
db.collection("receivables").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        let obj = {
            ID : doc.id ,
            description: doc.data().title ,
            Amount: doc.data().amount
        };
        receivables.push(obj);
    });
}).catch((e)=>{
    console.log(e);
})
db.collection("debts").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        let obj = {
            ID : doc.id ,
            description: doc.data().title ,
            Amount: doc.data().amount
        };
        debts.push(obj);
    });
}).catch((e)=>{
    console.log(e);
})
db.collection("advance").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        let obj = {
            ID : doc.id ,
            description: doc.data().title ,
            Amount: doc.data().amount
        };
        advance.push(obj);
    });
}).catch((e)=>{
    console.log(e);
})

console.log(records, accruals, prepayments,
receivables,
advance,
debts)