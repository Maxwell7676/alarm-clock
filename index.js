
console.log("JavaScript file loaded");



//current time

let displayTime = ()=>{
	let option = { timeZone : 'Asia/Kolkata'};
	let currentTime = new Date().toLocaleTimeString('en-US', option);
	let time = document.querySelector("#Time");
	time.innerHTML = currentTime;
};
setInterval(displayTime, 1000);

var audio = new Audio('alarm_tone.mp3');
audio.loop = true;


//part-2;
let alarmSetTime = "";
let alarmList = [];

let hourDropdown = document.getElementById('hour');
    let minuteDropdown = document.getElementById('min');
    let secondDropdown = document.getElementById('sec');
    let ampmDropdown = document.getElementById('ampm');

    // Populate hour dropdown with options 0-12
    for (let i = 0; i <= 12; i++) {
      let option = document.createElement('option');
      option.value = i < 10 ? '0' + i : i;
      option.text = i < 10 ? '0' + i : i;
      hourDropdown.appendChild(option);
    }


    // Populate minute and second dropdowns with options 00-59
    for (let i = 0; i <= 59; i++) {
      let option = document.createElement('option');
      option.value = i < 10 ? '0' + i : i;
      option.text = i < 10 ? '0' + i : i;
      minuteDropdown.appendChild(option);
      secondDropdown.appendChild(option.cloneNode(true));
    }


    // Populate AM/PM dropdown with options AM and PM
    let amOption = document.createElement('option');
    amOption.value = 'AM';
    amOption.text = 'AM';
    let pmOption = document.createElement('option');
    pmOption.value = 'PM';
    pmOption.text = 'PM';
    ampmDropdown.appendChild(amOption);
    ampmDropdown.appendChild(pmOption);



function setAlarm(event) {
	event.preventDefault();

     // Convert hour to 12-hour format
     let selectedHour = hourDropdown.options[hourDropdown.selectedIndex].value;
     let formattedHour = selectedHour % 12 || 12;
     formattedHour = formattedHour < 10 ? '0' + formattedHour : formattedHour;

     let alarmSetTime = `${formattedHour} : ${minuteDropdown.value} : ${secondDropdown.value} : ${ampmDropdown.value}`;

  let list = document.querySelector(".list-group");

  let list_item  = "";

  list_item += `<li class="list-group-item list-group-item-action list-group-item-info d-flex justify-content-between">
                  <span>${alarmSetTime}</span>
                  <button class="btn btn-danger"><i class="bi bi-trash"></i> Delete</button>
                </li>`;

  if (alarmList.length == 0) {
  	alarmList.push(alarmSetTime);
  	list.innerHTML = list_item;
  }
  else{
  	if (alarmList.includes(alarmSetTime)) {
  		alert("Alarm Already Existed");
  	}
  	else{
  		alarmList.push(alarmSetTime);
  		list.innerHTML += list_item;
  	}
  }

}

const setAlarm_btn = document.getElementById("set-alarm");

setAlarm_btn.addEventListener('click', setAlarm);



//part-3 remove and delete alarm list

let list_groupElm = document.querySelector(".list-group");

 list_groupElm.addEventListener('click', function(event){
 	let targetList = event.target;
 	if(targetList.classList.contains('btn')) {

 		let actualEl = targetList.parentElement.firstElementChild.innerText;
 		let removeAlarmList = targetList.parentElement;

 		//remove delete button
 		for(let i = 0; i<alarmList.length; i++){
 			if(alarmList[i] === actualEl){
 				alarmList.splice(i, 1);
 			}
 		}

 		removeAlarmList.remove();
 		
 	}

 });



 	//part-4 function
  setInterval(function() {
  let option = { timeZone: 'Asia/Kolkata' };
  let time = new Date().toLocaleTimeString('en-US', option);

  let hour = new Date().getHours();
  let minute = new Date().getMinutes();
  let second = new Date().getSeconds();
  let ampm = hour >= 12 ? 'PM' : 'AM';
  
  hour = hour % 12;
  hour = hour ? hour : 12; // Convert 0 to 12
  
  hour = hour < 10 ? '0' + hour : hour;
  minute = minute < 10 ? '0' + minute : minute;
  second = second < 10 ? '0' + second : second;
  
  let timeString = `${hour} : ${minute} : ${second} : ${ampm}`;

  console.log(timeString);

  if(alarmList.includes(timeString)){
  	console.log("hello");
  	alert("Hey Shall Ring");
  	audio.play();
  }

}, 1000);


  //part-5 stop alarm
  let stopAlarm = document.querySelector("#stop-alarm");

  stopAlarm.addEventListener('click', function(event){
  	event.preventDefault();
  	audio.pause();
  })




