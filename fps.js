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
// const shareCapital = document.getElementById("ShareCapital");
const netProfit = document.getElementById("netProfit");
const Equity = document.getElementById("equity2");
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
            CrDb: doc.data().creditDebit ,
            Exp_Type: (doc.data().exp_type == "")? "-":doc.data().exp_type ,
            Ass_Type: (doc.data().ass_type == "")? "-":doc.data().ass_type ,
            Liab_Type: (doc.data().liab_type == "")? "-":doc.data().liab_type ,
            Amount: doc.data().amount
        };
        records.push(obj);
    });
    getData().then(r =>{
        set_current_asset();
        tot_c_asst_set();
        total2=0;
        set_non_current_asset();
        tot_nc_asst_set();
        total2 = 0;
        set_current_liabilities();
        tot_c_liab_set();
        total2 = 0;
        set_non_current_liabilities();
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






function set_current_asset(){
    const tbody = document.getElementById('current assets');
    const filtered = records.filter(w => {return ((w.Type === 'asset')&(w.Ass_Type === 'c-as'))});
    filtered.forEach((rec)=>{
        total2 += rec.Amount;
        tbody.insertRow().innerHTML += '<tr>'+
            '<td>'+rec.description+'</td>'+
            '<td class="even" id="Cash">'+rec.Amount+'</td>'+
        '</tr>'
    })
    if (prepayments.length !== 0) {
        let prep = 0;
        prepayments.forEach((rec) => {
            prep += rec.Amount;
            console.log(rec);
        })
        tbody.insertRow().innerHTML += '<tr>' +
            '<td>Prepayments</td>' +
            '<td class="even" id="Cash">' + prep + '</td>' +
            '</tr>'
        total2+=prep;
    }
    if (receivables.length !== 0) {
        let prep = 0;
        receivables.forEach((rec) => {
            prep += rec.Amount;
            console.log(rec);
        })
        tbody.insertRow().innerHTML += '<tr>' +
            '<td>Income Receivable</td>' +
            '<td class="even" id="Cash">' + prep + '</td>' +
            '</tr>'
        total2+=prep;
    }
}

function tot_c_asst_set(){
    TotalCurrentAssets.innerHTML = total2;
}


function set_non_current_asset(){
    const tbody = document.getElementById('non current assets');
    const filtered = records.filter(w => {return ((w.Type === 'asset')&(w.Ass_Type === 'nc-as'))});
    filtered.forEach((rec)=>{
        total2 += rec.Amount;
        tbody.insertRow().innerHTML += '<tr>'+
            '<td>'+rec.description+'</td>'+
            '<td class="even" id="Cash">'+rec.Amount+'</td>'+
        '</tr>'
    })
}

function tot_nc_asst_set(){
    TotalNonCurrentAssets.innerHTML = total2;
}

function set_current_liabilities(){
    const tbody = document.getElementById('current liabilities');
    const filtered = records.filter(w => {return ((w.Type === 'liability')&(w.Liab_Type === 'c-lia'))});
    filtered.forEach((rec)=>{
        total2 += rec.Amount;
        tbody.insertRow().innerHTML += '<tr>'+
            '<td>'+rec.description+'</td>'+
            '<td class="even" id="Cash">'+rec.Amount+'</td>'+
            '</tr>'
    })
    if (accruals.length !== 0) {
        let accr = 0;
        accruals.forEach((rec) => {
            accr += rec.Amount;
            console.log(rec);
        })
        tbody.insertRow().innerHTML += '<tr>' +
            '<td>Accrued Expenses</td>' +
            '<td class="even" id="Cash">' + accr + '</td>' +
            '</tr>'
        total2+=accr;
    }
    if (accruals.length !== 0) {
        let accr = 0;
        advance.forEach((rec) => {
            accr += rec.Amount;
            console.log(rec);
        })
        tbody.insertRow().innerHTML += '<tr>' +
            '<td>Income received in Advance</td><td' +
            ' class="even" id="Cash">' + accr + '</td>' +
            '</tr>'
        total2+=accr;
    }
}

function tot_c_liab_set(){
    TotalCurrentLiabilities.innerHTML = total2;
}

function set_non_current_liabilities(){
    const tbody = document.getElementById('non current liabilities');
    const filtered = records.filter(w => {return ((w.Type === 'liability')&(w.Liab_Type === 'nc-lia'))});
    filtered.forEach((rec)=>{
        total2 += rec.Amount;
        tbody.insertRow().innerHTML += '<tr>'+
            '<td>'+rec.description+'</td>'+
            '<td class="even" id="Cash">'+rec.Amount+'</td>'+
            '</tr>'
    })
}

function tot_nc_liab_set(){
    TotalNonCurrentLiabilities.innerHTML = total2;
}
function tot_liab_set(){
    TotalLiabilities.innerHTML = (parseInt(TotalNonCurrentLiabilities.innerHTML)+parseInt(TotalCurrentLiabilities.innerHTML)).toString();
}

function np_set(){
    total2 += parseInt(NetProfitFB);
    netProfit.innerHTML = NetProfitFB;
}
function eq_set(){
    let total = 0;
    const filtered = records.filter(w => {return ((w.Type.toLowerCase() === 'capital'))})
    filtered.forEach((f)=>{
        (f.CrDb =='credit')? total+=f.Amount: total-= f.Amount;
    })
    total2 += total;
    Equity.innerHTML = total;
}

function tot_oe_set(){
    TotalEquity.innerHTML = total2;
}
function totals_set(){
    TotalAssets.innerHTML = (parseInt(TotalCurrentAssets.innerHTML)+parseInt(TotalNonCurrentAssets.innerHTML)).toString();
    TotalLiabilitiesAndEquity.innerHTML = (parseInt(TotalLiabilities.innerHTML)+parseInt(TotalEquity.innerHTML)).toString();
}






