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

var cash = document.getElementById("Cash");
var ShortInvestments = document.getElementById("ShortInvestments");
var AccountsReceivable = document.getElementById("AccountsReceivable");
var PrepaidRent = document.getElementById("PrepaidRent");
var Inventory = document.getElementById("Inventory");
var TotalCurrentAssets = document.getElementById("TotalCurrentAssets");
var AccountsPayable = document.getElementById("AccountsPayable");
var ShortTermLoans = document.getElementById("ShortTermLoans");
var AccruedExpenses = document.getElementById("AccruedExpenses");
var TotalCurrentLiabilities = document.getElementById("TotalCurrentLiabilities");
var LongTermLoans = document.getElementById("LongTermLoans");
var BondsLoans = document.getElementById("BondsLoans");
var DeferredTax = document.getElementById("DeferredTax");
var TotalNonCurrentLiabilities = document.getElementById("TotalNonCurrentLiabilities");
var TotalLiabilities = document.getElementById("TotalLiabilities");
var Land = document.getElementById("Land");
var Property = document.getElementById("Property");
var Allowance = document.getElementById("Allowance");
var Value = document.getElementById("Value");
var OtherReceivables = document.getElementById("OtherReceivables");
var Goodwill = document.getElementById("Goodwill");
var WebsiteAndDomains = document.getElementById("WebsiteAndDomains");
var OtherIntangibleAssets = document.getElementById("OtherIntangibleAssets");
var TotalNonCurrentAssets = document.getElementById("TotalNonCurrentAssets");
var Equity = document.getElementById("Equity");
var shareCapital = document.getElementById("ShareCapital");
var netProfit = document.getElementById("netProfit");
var Reserves = document.getElementById("Reserves");
var TotalEquity = document.getElementById("TotalEquity");
var TotalAssets = document.getElementById("TotalAssets");
var TotalLiabilitiesAndEquity = document.getElementById("TotalLiabilitiesAndEquity");

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
