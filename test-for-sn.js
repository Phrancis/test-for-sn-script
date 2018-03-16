// ==UserScript==
// @name         test-for-sn
// @namespace    http://localhost/
// @version      0.1
// @description  try to take over the world!
// @author       Francis Veilleux-Gaboury
// @include      file:///C:/Scripts/service-now-automation-test/sn-iframe.html
// @match        file:///C:/Scripts/service-now-automation-test/sn-iframe.html
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const zip = function(rows) {
        return rows[0].map((_, i) => rows.map(row => row[i]))
    }

    const INCIDENT_NAMES = [
        'Incident',
        'company',
        'caller',
        'user_id',
        'phone_input',
        'location'
    ];

    const INCIDENT_VALUES = [
        'id',
        'company',
        'caller_id',
        'caller_id.user_id',
        'u_alternate_phone',
        'location'
    ]
        .map(v => 'sys_display.incident.' + v)
        .map(v => document.getElementById(v));

    /*
    Entry point of the user script. 
    Sets up the local values in the browser from the DOM 
    and starts other functions. 
    */
    const main = function() {

        /* 
        uncomment for sanity check to make sure script is loaded,
        background should appear pink in the frame: 
        */
        //document.body.style.background = "#FFDDDD";

        prepareInputFields();
        refreshCallerValues();
        buttonShowCallerValues();
    };

    /* 
    Alias function to shorten `document.getElementById` calls 
    */
    const getElemById = function(elemId) {
        return document.getElementById(elemId);
    };

    /* 
    Alias function to shorten `addEventListener("change", refreshCallerValues)` calls 
    */
    const addRefreshListener = function(elemId) {
        getElemById(elemId).addEventListener("change", refreshCallerValues);
    };

    /* 
    Adds listeners to the input fields 
    */
    const prepareInputFields = function() {
        addRefreshListener(FIELD_IDS.COMPANY_INPUT);
        addRefreshListener(FIELD_IDS.CALLER_NAME_INPUT);
        addRefreshListener(FIELD_IDS.USER_ID_INPUT);
        addRefreshListener(FIELD_IDS.PHONE_INPUT);
        addRefreshListener(FIELD_IDS.LOCATION_INPUT);
    };

    /* 
    Get values from the input fields, to be used primarily by event listeners.
    */
    const refreshCallerValues = function() {
        incidentData.incidentId = getElemById(FIELD_IDS.INCIDENT_ID).value;
        const caller = incidentData.caller;
        caller.company = getElemById(FIELD_IDS.COMPANY_INPUT).value;
        caller.callerName = getElemById(FIELD_IDS.CALLER_NAME_INPUT).value;
        caller.userId = getElemById(FIELD_IDS.USER_ID_INPUT).value;
        caller.phone = getElemById(FIELD_IDS.PHONE_INPUT).value;
        caller.location = getElemById(FIELD_IDS.LOCATION_INPUT).value;
    };

    /*
    Debugging routine to show an alert that displays the current values in memory.
    */
    const buttonShowCallerValues = function() {
        const button = document.createElement("button");
        button.innerHTML = "Show Caller Values";
        button.style.backgroundColor = "#AAFFAA";
        document.getElementById("incident.form_header").appendChild(button);

        button.onclick = function() {
            let text = zip([INCIDENT_NAMES, INCIDENT_VALUES.map(o => o.value)])
                .map(([key, value]) => key + ": " + value + "\n")
                .join('\n');
            alert(text);
        };
    };

    main();

})();
