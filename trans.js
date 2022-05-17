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
let reload = false;


$(document).ready(() => {
    console.log("ready");
    //show adjustments
    $('.todo').hide();
    $('button.adj').on('click', () => {
        $('.todo').show("slow");
    });

    //hide adjustments
    $('button.adjhideall').on('click', () => {
        $('.todo').hide("slow");
    });


    //when user select a adjustment type :
    $('.adjhide').hide();
    $('select.tbtype').change(function(){
        var selectedAdj = $(this).children("option:selected").val();
        //alert(selectedAdj);
        if(selectedAdj == 'accu'){
            $('.adjhide').hide();
            $('.accu-area').slideDown();
        }
        else if(selectedAdj == 'prepay'){
            $('.adjhide').hide();
            $('.prepay-area').slideDown();
        }
        else if(selectedAdj == 'inrec'){
            $('.adjhide').hide();
            $('.inrec-area').slideDown();
        }
        else if(selectedAdj == 'accu'){
            $('.adjhide').hide();
            $('.accu-area').slideDown();
        }
        else if(selectedAdj == 'inad'){
            $('.adjhide').hide();
            $('.inad-area').slideDown();
        }
        else if(selectedAdj == 'baddebt'){
            $('.adjhide').hide();
            $('.baddebt-area').slideDown();
        }
        else if(selectedAdj == 'prodebt'){
            $('.adjhide').hide();
            $('.prodebt-area').slideDown();
        }
        else if(selectedAdj == 'deprec'){
            $('.adjhide').hide();
            $('.deprec-area').slideDown();
        }
        else{
            $('.adjhide').hide();
        }

    });

    $('.hide-for-exp').hide();
    $('select#ptbtype').change(function(){
        var selectedtype = $(this).children("option:selected").val();
        if(selectedtype == 'expense'){
            $('.hide-for-exp').slideDown();
        }else{
            $('.hide-for-exp').slideUp();
        }
    });

})

updateRecords();

document.getElementById('submit').addEventListener("click", () =>{
    console.log("Submit Clicked");

    let record = {
        dateAndTime: "",
        assetType: "",
        creditDebit: "",
        title: "",
        amount: "",
        exp_type: "",
        id: "",
    };

    record.dateAndTime = getElementById("pdate").value;
    record.assetType = getElementById("ptbtype").value;
    record.exp_type = getElementById("expense").value;
    record.creditDebit = getElementById("pcr").value;
    record.title = getElementById("pdesc").value;
    record.amount = getElementById("pqty").value;
    record.id = Date.now();
    console.log(record);

    if((record.dateAndTime === "")|| (record.title === "") || (record.amount === "") ||((record.assetType === "expense")&&(record.exp_type === "")) ){
        alert("All fields must filled!");
        return;
    }
    console.log("successfully filled");

    colRecords.doc(record.id.toString()).set({
        title : record.title,
        dateAndTime : record.dateAndTime,
        assetType : record.assetType,
        exp_type : record.exp_type,
        creditDebit : record.creditDebit,
        amount : parseInt(record.amount)
    }).then(()=>{
        console.log("record successfully uploaded");
        document.getElementById("updateForm").reset();
        updateRecords();
    }).catch((e)=>{
        console.log(" upload error", e);
    });
});

function updateRecords(){
    clearTable("recordTable");
    colRecords.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            addRecord(
                doc.id,
                doc.data().dateAndTime,
                doc.data().assetType,
                doc.data().creditDebit,
                doc.data().title,
                doc.data().amount);
        });
    })
}

function getElementById(id){
    return document.getElementById(id);
}

function addRecord(id, date, type, status, description, amount){

    let table = getElementById("recordTable");

    let row = table.tBodies[0].insertRow();

    row.insertCell().appendChild(document.createTextNode(id.toString()))
    row.insertCell().appendChild(document.createTextNode(date.toString()))
    row.insertCell().appendChild(document.createTextNode(type.toString()))
    row.insertCell().appendChild(document.createTextNode(status.toString()))
    row.insertCell().appendChild(document.createTextNode(description.toString()))
    row.insertCell().appendChild(document.createTextNode(amount.toString()))
    row.insertCell().innerHTML = '<td ><button id="'+ id.toString() +'"onclick="deleteRecord(this.id)" type="button">Delete</button></td>';

}
//ela
function clearTable(name){
    let table = getElementById(name);
    console.log(table.tBodies.length);

    if(table.tBodies.length>0)
        table.tBodies[0].innerHTML = '';
}

function  deleteRecord(id){
    colRecords.doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
        updateRecords();
    }).catch((error) => {
        console.error("Error removing document: ", error);
        alert(error);
    });
}

document.getElementById('accrual_btn').addEventListener(type='click',()=>{
    doAdjustment(
        document.getElementById('ID_accrual').value,
        document.getElementById('textarea_accrual').value,
        document.getElementById('Amount_accrual').value,
        document.getElementById('accrual'),
        "accrual");

})

function doAdjustment(id, title, amount, form, type){
    db.collection(type).doc(id).set({
        id: id,
        title: title,
        amount: amount
    }).then(() =>{
        form.reset();
    }).catch((error) =>{
        console.log(error);
    })
}