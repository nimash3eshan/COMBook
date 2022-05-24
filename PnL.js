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

// const sales = document.getElementById("sales");
// const returnInwards = document.getElementById("returnInwards");
// const SalesTotal = document.getElementById("salesTotal");
// const wagesSalaries = document.getElementById("wagesSalaries");
// const rent = document.getElementById("rent");
// const rate = document.getElementById("rate");
// const TotalAdminstrativeExpenses = document.getElementById("TotalAdminstrativeExpenses");
// const deliveryVan = document.getElementById("deliveryVan");
// const advertisement = document.getElementById("advertisement");
// const badDebts = document.getElementById("badDebts");
// const CarrageOutwards = document.getElementById("CarrageOutwards");
// const TotalDistributingExpenses = document.getElementById("TotalDistributingExpenses");
// const bankCharges = document.getElementById("BankCharges");
// const Overdraft = document.getElementById("Overdraft");
// const financialTotal = document.getElementById("FinancialTotal");
// const Sundry = document.getElementById("Sundry");
// const Donation = document.getElementById("Donation");
// const TotalOthers = document.getElementById("TotalOthers");
// const TotalExpenses = document.getElementById("TotalExpenses");
// const OpenStock = document.getElementById("OpenStock");
// const Purchase = document.getElementById("Purchase");
// const CarryInwards = document.getElementById("CarryInwards");
// const ReturnOutwards = document.getElementById("ReturnOutwards");
// const CloseInventory = document.getElementById("CloseInventory");
// const TotalCostOfSales = document.getElementById("TotalCostOfSales");
// const discountrecived = document.getElementById("discountrecived");
// const rentincome = document.getElementById("rentincome");
// const profit = document.getElementById("profit");
// const TotalIncome = document.getElementById("TotalIncome");
// const TotalGrossProfit = document.getElementById("TotalGrossProfit");
// const netprofit = document.getElementById("netprofit");


let records = [];
let accruals = [];
let prepayments = [];
let receivables = [];
let advance = [];
let debts = [];
let total2 = 0;

colRecords.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        let obj = {
            ID: doc.id,
            Date: doc.data().dateAndTime,
            description: doc.data().title,
            Type: doc.data().assetType,
            CrDb: doc.data().creditDebit,
            Exp_Type: (doc.data().exp_type == "") ? "-" : doc.data().exp_type,
            Ass_Type: (doc.data().ass_type == "") ? "-" : doc.data().ass_type,
            Liab_Type: (doc.data().liab_type == "") ? "-" : doc.data().liab_type,
            Amount: doc.data().amount
        };
        records.push(obj);

    });
    getData().then(r => {
        administrative();
        distributing();
        financialExpenses();
        other();
        document.getElementById('TotalExpenses').innerHTML = total2.toString();
        total2 = 0;
        sales_set();
        ret_inw_set();
        sales_tot_set();
        total2 = 0;
        set_cost_of_sales();
        cos_of_sales_set();
        total2 = 0;
        set_income();
        TotalIncome();
        set_profits();

    });

}).catch((e) => {
    console.log(e);
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
}

function administrative() {
    let total = 0;
    let filtered = records.filter(e => {
        return ((e.Type === "expense") && (e.Exp_Type === "ad-ex"))
    })
    filtered.forEach((r, idx, array) => {
        let rec = accruals.filter(e => {
            return ((e.ID === r.ID))
        })
        if (rec.length !== 0) {
            rec.forEach((f) => {
                r.Amount += f.Amount;
            })
        }
        let rec2 = prepayments.filter(e => {
            return ((e.ID === r.ID))
        })
        if (rec2.length !== 0) {
            rec2.forEach((f) => {
                r.Amount -= f.Amount;
            })
        }
        total += r.Amount;
        if (Object.is(array.length - 1, idx)) {
            document.getElementById("administrative").innerHTML += '<tr>\n' +
                '                            <td>' + r.description + '</td>\n' +
                '                            <td class="even" id="wagesSalaries">' + r.Amount + '</td>\n' +
                '                            <td class="even" id="TotalAdminstrativeExpenses"> ' + total + ' </td>' +
                '                        </tr>';
            total2 += total;
        } else {

            document.getElementById("administrative").innerHTML += '<tr>\n' +
                '                            <td>' + r.description + '</td>\n' +
                '                            <td class="even" id="wagesSalaries">' + r.Amount + '</td>\n' +
                '                        </tr>';
        }
    });
}

function distributing() {
    let total = 0;
    let filtered = records.filter(e => {
        return ((e.Type === "expense") && (e.Exp_Type === "dns-ex"))
    })
    filtered.forEach((r, idx, array) => {
        let rec = accruals.filter(e => {
            return ((e.ID === r.ID))
        })
        if (rec.length !== 0) {
            rec.forEach((f) => {
                r.Amount += f.Amount;
            })
        }
        let rec2 = prepayments.filter(e => {
            return ((e.ID === r.ID))
        })
        if (rec2.length !== 0) {
            rec2.forEach((f) => {
                r.Amount -= f.Amount;
            })
        }
        total += r.Amount;
        if (Object.is(array.length - 1, idx)) {
            document.getElementById("distributing").innerHTML += '<tr>\n' +
                '                            <td>' + r.description + '</td>\n' +
                '                            <td class="even" id="wagesSalaries">' + r.Amount + '</td>\n' +
                '                            <td class="even" id="TotalAdminstrativeExpenses"> ' + total + ' </td>' +
                '                        </tr>';
            total2 += total;
        } else {

            document.getElementById("distributing").innerHTML += '<tr>\n' +
                '                            <td>' + r.description + '</td>\n' +
                '                            <td class="even" id="wagesSalaries">' + r.Amount + '</td>\n' +
                '                        </tr>';
        }
    });
}

function financialExpenses() {
    let total = 0;
    let filtered = records.filter(e => {
        return ((e.Type === "expense") && (e.Exp_Type === "f-ex"))
    })
    filtered.forEach((r, idx, array) => {
        let rec = accruals.filter(e => {
            return ((e.ID === r.ID))
        })
        if (rec.length !== 0) {
            rec.forEach((f) => {
                r.Amount += f.Amount;
            })
        }
        let rec2 = prepayments.filter(e => {
            return ((e.ID === r.ID))
        })
        if (rec2.length !== 0) {
            rec2.forEach((f) => {
                r.Amount -= f.Amount;
            })
        }
        total += r.Amount;
        if (Object.is(array.length - 1, idx)) {
            document.getElementById("financialExpenses").innerHTML += '<tr>\n' +
                '                            <td>' + r.description + '</td>\n' +
                '                            <td class="even" id="wagesSalaries">' + r.Amount + '</td>\n' +
                '                            <td class="even" id="TotalDistributingExpenses"> ' + total + ' </td>' +
                '                        </tr>';
            total2 += total;

        } else {

            document.getElementById("financialExpenses").innerHTML += '<tr>\n' +
                '                            <td>' + r.description + '</td>\n' +
                '                            <td class="even" id="wagesSalaries">' + r.Amount + '</td>\n' +
                '                        </tr>';
        }
    });
}

function other() {
    let total = 0;
    let filtered = records.filter(e => {
        return ((e.Type === "expense") && (e.Exp_Type === "f-ex"))
    })
    filtered.forEach((r, idx, array) => {
        let rec = accruals.filter(e => {
            return ((e.ID === r.ID))
        })
        if (rec.length !== 0) {
            rec.forEach((f) => {
                r.Amount += f.Amount;
            })
        }
        let rec2 = prepayments.filter(e => {
            return ((e.ID === r.ID))
        })
        if (rec2.length !== 0) {
            rec2.forEach((f) => {
                r.Amount -= f.Amount;
            })
        }
        total += r.Amount;
        if (Object.is(array.length - 1, idx)) {
            document.getElementById("other").innerHTML += '<tr>\n' +
                '                            <td>' + r.description + '</td>\n' +
                '                            <td class="even" id="wagesSalaries">' + r.Amount + '</td>\n' +
                '                            <td class="even" id="TotalDistributingExpenses"> ' + total + ' </td>' +
                '                        </tr>';
            total2 += total;

        } else {

            document.getElementById("other").innerHTML += '<tr>\n' +
                '                            <td>' + r.description + '</td>\n' +
                '                            <td class="even" id="wagesSalaries">' + r.Amount + '</td>\n' +
                '                        </tr>';
        }
    });
}

function sales_set() {
    let total = 0;
    const filtered = records.filter(w => {
        return ((w.description.toLowerCase() === 'sales') || (w.description.toLowerCase() === 'sale'))
    })
    filtered.forEach((f) => {
        total += f.Amount;
    })
    total2 += total;
    document.getElementById('sales').innerHTML = total;
}

function ret_inw_set() {
    let total = 0;
    const filtered = records.filter(w => {
        return ((w.description.toLowerCase() === 'return inward') || (w.description.toLowerCase() === 'return inwards') || (w.description.toLowerCase() === 'sales return'))
    })
    filtered.forEach((f) => {
        total += f.Amount;
    })
    total2 -= total;
    document.getElementById('returnInwards').innerHTML = total;
}

function sales_tot_set() {
    document.getElementById('SalesTotal').innerHTML = total2;
}

// function opn_stk_set(){
//     let total = 0;
//     const filtered = records.filter(w => {return ((w.description.toLowerCase() === 'opening stock'))})
//     filtered.forEach((f)=>{
//         total+=f.Amount;
//     })
//     total2+=total;
//     document.getElementById('OpenStock').innerHTML = total;
// }
//
// function purch_set(){
//     let total = 0;
//     const filtered = records.filter(w => {return ((w.description.toLowerCase() === 'purchase')||(w.description.toLowerCase() === 'purchases'))})
//     filtered.forEach((f)=>{
//         total+=f.Amount;
//     })
//     total2 += total;
//     document.getElementById('Purchase').innerHTML = total;
// }
// function c_inw_set(){
//     let total = 0;
//     const filtered = records.filter(w => {return ((w.description.toLowerCase() === 'carry inward')||(w.description.toLowerCase() === 'carry inwards'))})
//     filtered.forEach((f)=>{
//         total+=f.Amount;
//     })
//     total2 += total;
//     console.log(total2)
//     document.getElementById('CarryInwards').innerHTML = total;
// }
// function r_inw_set(){
//     let total = 0;
//     const filtered = records.filter(w => {return ((w.description.toLowerCase() === 'return outward')||(w.description.toLowerCase() === 'return outwards')||(w.description.toLowerCase() === 'purchase return'))})
//     filtered.forEach((f)=>{
//         total+=f.Amount;
//     })
//     total2 += total;
//     console.log(total2)
//     document.getElementById('ReturnOutwards').innerHTML = total;
// }
// function clo_inv_set(){
//     let total = 0;
//     const filtered = records.filter(w => {return ((w.description.toLowerCase() === 'closing inventory'))})
//     filtered.forEach((f)=>{
//         total+=f.Amount;
//     })
//     total2 -= total;
//     console.log(total2)
//     document.getElementById('CloseInventory').innerHTML = total;
// }

function set_cost_of_sales() {
    const tbody = document.getElementById('costofsales');
    const filtered = records.filter(w => {
        return ((w.Type === 'expense') && (w.Exp_Type == 'cos-ex'))
    })
    filtered.forEach((f) => {
        total2 += f.Amount;
        tbody.insertRow().innerHTML += '<tr>' +
            '<td>' + f.description + '</td>' +
            '<td class="even" id="Cash">' + f.Amount + '</td>' +
            '</tr>'
    })
}

function cos_of_sales_set() {
    document.getElementById('TotalCostOfSales').innerHTML = total2;
}

// function discountrecived(){
//     let total = 0;
//     const filtered = records.filter(w => {return ((w.description.toLowerCase() === 'discount received'))})
//     filtered.forEach((f)=>{
//         total+=f.Amount;
//     })
//     total2 += total;
//     document.getElementById('discountrecived').innerHTML = total;
// }
// function rentincome(){
//     let total = 0;
//     const filtered = records.filter(w => {return ((w.description.toLowerCase() === 'rent income'))})
//     filtered.forEach((f)=>{
//         total+=f.Amount;
//     })
//     total2 += total;
//     console.log(total2)
//     document.getElementById('rentincome').innerHTML = total;
// }

function set_income() {
    const tbody = document.getElementById('income');
    const filtered = records.filter(w => {
        return ((w.Type === 'income'))
    })
    filtered.forEach((f) => {
        total2 += f.Amount;
        tbody.insertRow().innerHTML += '<tr>' +
            '<td>' + f.description + '</td>' +
            '<td class="even" id="Cash">' + f.Amount + '</td>' +
            '</tr>'
    })
}

function TotalIncome() {
    document.getElementById('TotalIncome').innerHTML = total2;
}

function set_profits() {
    document.getElementById('TotalGrossProfit').innerHTML = (parseInt(document.getElementById('SalesTotal').textContent) - parseInt(document.getElementById('TotalCostOfSales').textContent)).toString();
    document.getElementById('netprofit').innerHTML = (parseInt(document.getElementById('TotalGrossProfit').textContent) + parseInt(document.getElementById('TotalIncome').textContent) - parseInt(document.getElementById('TotalExpenses').textContent)).toString();
    db.collection("homepage").doc("dashboard").set({
        Net_Profit: document.getElementById('netprofit').textContent,
        Gross_Profit: document.getElementById('TotalGrossProfit').textContent
    }).catch((e) => {
        console.log(e);
    })
}