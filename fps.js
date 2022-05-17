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

const cash = document.getElementById("Cash");
const ShortInvestments = document.getElementById("ShortInvestments");
const AccountsReceivable = document.getElementById("AccountsReceivable");
const PrepaidRent = document.getElementById("PrepaidRent");
const Inventory = document.getElementById("Inventory");
const TotalCurrentAssets = document.getElementById("TotalCurrentAssets");
const AccountsPayable = document.getElementById("AccountsPayable");
const ShortTermLoans = document.getElementById("ShortTermLoans");
const AccruedExpenses = document.getElementById("AccruedExpenses");
const TotalCurrentLiabilities = document.getElementById("TotalCurrentLiabilities");
const LongTermLoans = document.getElementById("LongTermLoans");
const BondsLoans = document.getElementById("BondsLoans");
const DeferredTax = document.getElementById("DeferredTax");
const TotalNonCurrentLiabilities = document.getElementById("TotalNonCurrentLiabilities");
const TotalLiabilities = document.getElementById("TotalLiabilities");
const Land = document.getElementById("Land");
const Property = document.getElementById("Property");
const Allowance = document.getElementById("Allowance");
const Value = document.getElementById("Value");
const OtherReceivables = document.getElementById("OtherReceivables");
const Goodwill = document.getElementById("Goodwill");
const WebsiteAndDomains = document.getElementById("WebsiteAndDomains");
const OtherIntangibleAssets = document.getElementById("OtherIntangibleAssets");
const TotalNonCurrentAssets = document.getElementById("TotalNonCurrentAssets");
const Equity = document.getElementById("Equity");
// const shareCapital = document.getElementById("ShareCapital");
const netProfit = document.getElementById("netProfit");
const Reserves = document.getElementById("equity2");
const TotalEquity = document.getElementById("TotalEquity");
const TotalAssets = document.getElementById("TotalAssets");
const TotalLiabilitiesAndEquity = document.getElementById("TotalLiabilitiesAndEquity");

let records = [];
let accruals = [];
let prepayments = [];
let receivables = [];
let advance = [];
let debts = [];
let total2 = 0;
let NetProfitFB ;

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
    getData().then(r =>{
        cash_set();
        sht_trm_set();
        acc_recei_set();
        pre_rent_set();
        inve_set();
        tot_c_asst_set();
        total2=0;
        land_set();
        ppe_set();
        // afd_set();
        or_set();
        gw_set();
        wad_set();
        oia_set();
        tot_nc_asst_set();
        total2 = 0;
        ap_set();
        stl_set();
        ae_set();
        tot_c_liab_set();
        total2 = 0;
        ltl_set();
        bp_set();
        dt_set();
        tot_nc_liab_set();
        tot_liab_set();
        total2 = 0;
        np_set();
        eq_set();
        tot_oe_set();

        totals_set();
    }).catch((e)=>{
        console.log(e);
    })


})

async function getData() {
    await db.collection("accrual").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let obj = {
                ID: doc.id,
                description: doc.data().title,
                Amount: doc.data().amount
            };
            accruals.push(obj);
        });
    }).catch((e) => {
        console.log(e);
    })
    await db.collection("payments").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let obj = {
                ID: doc.id,
                description: doc.data().title,
                Amount: doc.data().amount
            };
            prepayments.push(obj);
        });
    }).catch((e) => {
        console.log(e);
    })
    await db.collection("receivables").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let obj = {
                ID: doc.id,
                description: doc.data().title,
                Amount: doc.data().amount
            };
            receivables.push(obj);
        });
    }).catch((e) => {
        console.log(e);
    })
    await db.collection("debts").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let obj = {
                ID: doc.id,
                description: doc.data().title,
                Amount: doc.data().amount
            };
            debts.push(obj);
        });
    }).catch((e) => {
        console.log(e);
    })
    await db.collection("advance").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let obj = {
                ID: doc.id,
                description: doc.data().title,
                Amount: doc.data().amount
            };
            advance.push(obj);
        });
    }).catch((e) => {
        console.log(e);
    })
    await db.collection("homepage").doc("dashboard").get().then((q) => {
        if (q.exists){
            NetProfitFB = q.data().Net_Profit;
        }

    }).catch((e) => {
        console.log(e);
    })
}


function cash_set(){
    let total = 0;
    const filtered = records.filter(w => {return ((w.description.toLowerCase() === 'cash'))})
    filtered.forEach((f)=>{
        total+=f.Amount;
    })
    total2+=total;
    cash.innerHTML = total;
}

function sht_trm_set(){
    let total = 0;
    const filtered = records.filter(w => {return ((w.description.toLowerCase() === 'short term investment'))})
    console.log(records)
    filtered.forEach((f)=>{
        total+=f.Amount;
    })
    total2 += total;
    console.log(total2)
    ShortInvestments.innerHTML = total;
}
function acc_recei_set(){
    let total = 0;
    const filtered = records.filter(w => {return ((w.description.toLowerCase() === 'accounts receivable'))})
    filtered.forEach((f)=>{
        total+=f.Amount;
    })
    total2 += total;
    console.log(total2)
    AccountsReceivable.innerHTML = total;
}
function pre_rent_set(){
    let total = 0;
    const filtered = records.filter(w => {return ((w.description.toLowerCase() === 'prepaid rent'))})
    filtered.forEach((f)=>{
        total+=f.Amount;
    })
    total2 += total;
    console.log(total2)
    PrepaidRent.innerHTML = total;
}
function inve_set(){
    let total = 0;
    const filtered = records.filter(w => {return ((w.description.toLowerCase() === 'inventory'))})
    filtered.forEach((f)=>{
        total+=f.Amount;
    })
    total2 += total;
    console.log(total2)
    Inventory.innerHTML = total;
}

function tot_c_asst_set(){
    TotalCurrentAssets.innerHTML = total2;
}



function land_set(){
    let total = 0;
    const filtered = records.filter(w => {return ((w.description.toLowerCase() === 'land'))})
    filtered.forEach((f)=>{
        total+=f.Amount;
    })
    total2+=total;
    Land.innerHTML = total;
}

function ppe_set(){
    let total = 0;
    const filtered = records.filter(w => {return ((w.description.toLowerCase() === 'property')||(w.description.toLowerCase() === 'plant')||(w.description.toLowerCase() === 'equipment'))})
    console.log(records)
    filtered.forEach((f)=>{
        total+=f.Amount;
    })
    total2 += total;
    console.log(total2)
    Property.innerHTML = total;
}
// function afd_set(){
//     let total = 0;
//     const filtered = records.filter(w => {return ((w.description.toLowerCase() === 'allowance for depreciation'))})
//     filtered.forEach((f)=>{
//         total+=f.Amount;
//     })
//     total2 += total;
//     console.log(total2)
//     Allowance.innerHTML = total;
// }
function or_set(){
    let total = 0;
    const filtered = records.filter(w => {return ((w.description.toLowerCase() === 'other receivable'))})
    filtered.forEach((f)=>{
        total+=f.Amount;
    })
    total2 += total;
    console.log(total2)
    OtherReceivables.innerHTML = total;
}
function gw_set(){
    let total = 0;
    const filtered = records.filter(w => {return ((w.description.toLowerCase() === 'goodwill'))})
    filtered.forEach((f)=>{
        total+=f.Amount;
    })
    total2 += total;
    console.log(total2)
    Goodwill.innerHTML = total;
}
function wad_set(){
    let total = 0;
    const filtered = records.filter(w => {return ((w.description.toLowerCase() === 'website')||(w.description.toLowerCase() === 'domain'))})
    filtered.forEach((f)=>{
        total+=f.Amount;
    })
    total2 += total;
    console.log(total2)
    WebsiteAndDomains.innerHTML = total;
}
function oia_set(){
    let total = 0;
    const filtered = records.filter(w => {return ((w.description.toLowerCase() === 'other intangible assets'))})
    filtered.forEach((f)=>{
        total+=f.Amount;
    })
    total2 += total;
    console.log(total2)
    OtherIntangibleAssets.innerHTML = total;
}

function tot_nc_asst_set(){
    TotalNonCurrentAssets.innerHTML = total2;
}

function ap_set(){
    let total = 0;
    const filtered = records.filter(w => {return ((w.description.toLowerCase() === 'accounts payable'))})
    filtered.forEach((f)=>{
        total+=f.Amount;
    })
    total2 += total;
    console.log(total2)
    AccountsPayable.innerHTML = total;
}
function stl_set(){
    let total = 0;
    const filtered = records.filter(w => {return ((w.description.toLowerCase() === 'short term loan'))})
    filtered.forEach((f)=>{
        total+=f.Amount;
    })
    total2 += total;
    console.log(total2)
    ShortTermLoans.innerHTML = total;
}
function ae_set(){
    let total = 0;
    const filtered = records.filter(w => {return ((w.description.toLowerCase() === 'accrued expenses'))})
    filtered.forEach((f)=>{
        total+=f.Amount;
    })
    total2 += total;
    console.log(total2)
    AccruedExpenses.innerHTML = total;
}

function tot_c_liab_set(){
    TotalCurrentLiabilities.innerHTML = total2;
}

function ltl_set(){
    let total = 0;
    const filtered = records.filter(w => {return ((w.description.toLowerCase() === 'long term loan'))})
    filtered.forEach((f)=>{
        total+=f.Amount;
    })
    total2 += total;
    console.log(total2)
    LongTermLoans.innerHTML = total;
}
function bp_set(){
    let total = 0;
    const filtered = records.filter(w => {return ((w.description.toLowerCase() === 'bond payable'))})
    filtered.forEach((f)=>{
        total+=f.Amount;
    })
    total2 += total;
    console.log(total2)
    BondsLoans.innerHTML = total;
}
function dt_set(){
    let total = 0;
    const filtered = records.filter(w => {return ((w.description.toLowerCase() === 'deferred tax'))})
    filtered.forEach((f)=>{
        total+=f.Amount;
    })
    total2 += total;
    console.log(total2)
    DeferredTax.innerHTML = total;
}

function tot_nc_liab_set(){
    TotalNonCurrentLiabilities.innerHTML = total2;
}
function tot_liab_set(){
    TotalLiabilities.innerHTML = (parseInt(TotalNonCurrentLiabilities.innerHTML)+parseInt(TotalCurrentLiabilities.innerHTML)).toString();
}


function np_set(){
    total2 += parseInt(NetProfitFB);
    console.log(NetProfitFB)
    netProfit.innerHTML = NetProfitFB;
}
function eq_set(){
    let total = 0;
    const filtered = records.filter(w => {return ((w.description.toLowerCase() === 'equity'))})
    filtered.forEach((f)=>{
        total+=f.Amount;
    })
    total2 += total;
    console.log(total2)
    Equity.innerHTML = total;
}

function tot_oe_set(){
    TotalEquity.innerHTML = total2;
}


function totals_set(){
    TotalAssets.innerHTML = (parseInt(TotalCurrentAssets.innerHTML)+parseInt(TotalNonCurrentAssets.innerHTML)).toString();
    TotalLiabilitiesAndEquity.innerHTML = (parseInt(TotalLiabilities.innerHTML)+parseInt(TotalEquity.innerHTML)).toString();
}

