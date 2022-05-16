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


const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');



allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})

const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})


if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})



const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
		document.getElementById("switch-mode").checked = true;
		document.querySelector(".switch-mode").classList.add("test");
		window.localStorage.setItem("state","dark")
	} else {
		document.body.classList.remove('dark');
		document.getElementById("switch-mode").checked = false;
		document.querySelector(".switch-mode").classList.remove("test");
		window.localStorage.removeItem("state");
	}
})


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