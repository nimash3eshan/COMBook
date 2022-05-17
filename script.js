const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

// color();

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

//
// function color(){
// 	let state = window.localStorage.getItem("state");
// 	const ele = document.getElementById("switch-label")
// 	if(state==null) return
// 	console.log(state, ele);
// 	(state === "dark")? ele.classList.add("test"):ele.classList.remove("test");
// }