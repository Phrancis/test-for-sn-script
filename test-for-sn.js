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

    const main = function() {
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

    // Run main program
    main();

})();
