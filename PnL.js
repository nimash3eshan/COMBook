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

var sales = document.getElementById("sales");
var returnInwards = document.getElementById("returnInwards");
var SalesTotal = document.getElementById("salesTotal");
var wagesSalaries = document.getElementById("wagesSalaries");
var rent = document.getElementById("rent");
var rate = document.getElementById("rate");
var TotalAdminstrativeExpenses = document.getElementById("TotalAdminstrativeExpenses");
var deliveryVan = document.getElementById("deliveryVan");
var advertisement = document.getElementById("advertisement");
var badDebts = document.getElementById("badDebts");
var CarrageOutwards = document.getElementById("CarrageOutwards");
var TotalDistributingExpenses = document.getElementById("TotalDistributingExpenses");
var bankCharges = document.getElementById("BankCharges");
var Overdraft = document.getElementById("Overdraft");
var financialTotal = document.getElementById("FinancialTotal");
var Sundry = document.getElementById("Sundry");
var Donation = document.getElementById("Donation");
var TotalOthers = document.getElementById("TotalOthers");
var TotalExpenses = document.getElementById("TotalExpenses");
var OpenStock = document.getElementById("OpenStock");
var Purchase = document.getElementById("Purchase");
var CarryInwards = document.getElementById("CarryInwards");
var ReturnOutwards = document.getElementById("ReturnOutwards");
var CloseInventory = document.getElementById("CloseInventory");
var TotalCostOfSales = document.getElementById("TotalCostOfSales");
var discountrecived = document.getElementById("discountrecived");
var rentincome = document.getElementById("rentincome");
var profit = document.getElementById("profit");
var TotalIncome = document.getElementById("TotalIncome");
var TotalGrossProfit = document.getElementById("TotalGrossProfit");
var netprofit = document.getElementById("netprofit");


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
    });
})
