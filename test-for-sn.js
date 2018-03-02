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

    const FIELD_IDS = {
        INCIDENT_ID : "sys_display.incident.id",
        COMPANY_INPUT : "sys_display.incident.company",
        CALLER_NAME_INPUT : "sys_display.incident.caller_id",
        USER_ID_INPUT : "sys_display.incident.caller_id.user_id",
        PHONE_INPUT : "sys_display.incident.u_alternate_phone",
        LOCATION_INPUT : "sys_display.incident.location"
    };

    // this global object will be used to hold the values
    // from the ticket as it is being updated
    const incidentData = {
        incidentId : "",
        caller : {}
    };

    const main = function() {
        // uncomment for sanity check to make sure script is loaded,
        // background should appear pink in the frame:
        //document.body.style.background = "#FFDDDD";

        prepareInputFields();
        refreshCallerValues();
        buttonShowCallerValues();
    };

    // alias to shorten document.getElementById calls
    const getElemById = function(elemId) {
        return document.getElementById(elemId);
    };

    // alias to shorten addEventListener("change", refreshCallerValues) calls
    const addRefreshListener = function(elemId) {
        getElemById(elemId).addEventListener("change", refreshCallerValues);
    };

    // add listeners to the input fields
    const prepareInputFields = function() {
        addRefreshListener(FIELD_IDS.COMPANY_INPUT);
        addRefreshListener(FIELD_IDS.CALLER_NAME_INPUT);
        addRefreshListener(FIELD_IDS.USER_ID_INPUT);
        addRefreshListener(FIELD_IDS.PHONE_INPUT);
        addRefreshListener(FIELD_IDS.LOCATION_INPUT);
    };

    // get the values from the input fields, to be used primarily by event listeners
    const refreshCallerValues = function() {
        incidentData.incidentId = getElemById(FIELD_IDS.INCIDENT_ID).value;
        const caller = incidentData.caller;
        caller.company = getElemById(FIELD_IDS.COMPANY_INPUT).value;
        caller.callerName = getElemById(FIELD_IDS.CALLER_NAME_INPUT).value;
        caller.userId = getElemById(FIELD_IDS.USER_ID_INPUT).value;
        caller.phone = getElemById(FIELD_IDS.PHONE_INPUT).value;
        caller.location = getElemById(FIELD_IDS.LOCATION_INPUT).value;
    };

    const buttonShowCallerValues = function() {
        const button = document.createElement("button");
        button.innerHTML = "Show Caller Values";
        button.style.backgroundColor = "#AAFFAA";
        getElemById("incident.form_header").appendChild(button);
        button.onclick = function() {
            const caller = incidentData.caller;
            let text = "Incident: " + incidentData.incidentId + "\n";
            // Concatenate caller fields and values for the output
            for (let val in caller) {
                text += val + ": " + caller[val] + "\n";
            }
            alert(text);
        };
    };

    // Run main program
    main();

})();
