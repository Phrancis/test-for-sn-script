// ==UserScript==
// @name         test-for-sn
// @namespace    http://localhost/
// @version      0.1
// @description  try to take over the world!
// @author       Francis Veilleux-Gaboury
// @include      file:///C:/Users/fv189884/Documents/sn-iframe.html
// @match        file:///C:/Users/fv189884/Documents/sn-iframe.html
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
	
	// Fetch input fields from the DOM
	const COMPANY_INPUT = document.getElementById("sys_display.incident.company");
	const CALLER_NAME_INPUT = document.getElementById("sys_display.incident.caller_id");
	const USER_ID_INPUT = document.getElementById("sys_display.incident.caller_id.user_id");
	const PHONE_INPUT = document.getElementById("sys_display.incident.u_alternate_phone");
	const LOCATION_INPUT = document.getElementById("sys_display.incident.location");
	
	// this object will be used to hold the values from the ticket
	let incidentData = { 
		incidentId : null,
		caller : {} 
	};
	
	
	function main() {
		// sanity check
		document.body.style.background = "#EEFFEE";
		prepareInputFields();
		refreshValues();

		let button = document.createElement("button");
		document.body.appendChild(button);
		button.innerHTML = "Show Caller Values";
		button.onclick = function() {
			const caller = incidentData.caller;
			let text = "";
			
			for (let val in caller) {
				if (caller.hasOwnProperty(val)) {
					text += val + ": " + caller[val] + "\n";
				}
			}		
			
			alert(text);
		};
	}
	
	// add listeners to the input fields
	function prepareInputFields() {
		COMPANY_INPUT.addEventListener("change", refreshCallerValues);
		CALLER_NAME_INPUT.addEventListener("change", refreshCallerValues);
		USER_ID_INPUT.addEventListener("change", refreshCallerValues);
		PHONE_INPUT.addEventListener("change", refreshCallerValues);
		LOCATION_INPUT.addEventListener("change", refreshCallerValues);
	}
	
	// get the values from the input fields, to be used primarily by event listeners
	function refreshCallerValues() {
        incidentData.caller.company = COMPANY_INPUT.value;
		incidentData.caller.callerName = CALLER_NAME_INPUT.value;
		incidentData.caller.userId = USER_ID_INPUT.value;
		incidentData.caller.phone = PHONE_INPUT.value;
		incidentData.caller.location = LOCATION_INPUT.value;
	}
	
	main();

})();
