"use strict";
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    //
    pages: [], // used to store all our screens/pages
    links: [], // used to store all our navigation links
    localData: [],
    key: "stra0165",
    //
    // Application Constructor
    initialize: function() {
        if( document.deviceready){
            document.addEventListener('deviceready', this.onDeviceReady, false);
            console.log("deviceReady");
        }else{
            document.addEventListener('DOMContentLoaded', this.onDeviceReady, false);
            console.log("contentLoaded");
        }
    },
    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        app.pages = document.querySelectorAll('[data-role="page"]');

        app.links = document.querySelectorAll('[data-role="nav"] a');

        for(let i=0; i<app.links.length; i++) {
            app.links[i].addEventListener("click", app.navigate);
        }
        document.querySelector(".reset-data").addEventListener("click",app.refreshData);
        console.log("initializing");
        app.retriveData();
        app.setStandingsPage();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        console.log("test");
    },
    navigate: function (ev) {
        ev.preventDefault();

        let link = ev.currentTarget;
        // console.log(link);
        // split a string into an array of substrings using # as the seperator
        let id = link.href.split("#")[1]; // get the href page name
        // console.log(id);
        //update what is shown in the location bar
        history.replaceState({}, "", link.href);

        for(let i=0; i<app.pages.length; i++) {
            if(app.pages[i].id == id){
                app.pages[i].classList.add("active");
                var container = document.getElementById(id);
                var content = container.innerHTML;
                container.innerHTML= content;
            } else {
                app.pages[i].classList.remove("active");
            }
        }
    },
    refreshData: function (ev) {
        ev.preventDefault()
        localStorage.removeItem(app.key);
        app.retriveData("new");
    },
    setStandingsPage: function () {
        let tbody = document.querySelector("#teamStandings tbody");
        tbody.innerHTML = "";
        let standings = UTILITIES.getLocalStorage(app.key).teams;
        standings = standings.sort(UTILITIES.sortCompare).reverse();
        // console.log(standings);
        standings.forEach(function (team) {
            //Sample Tables stuff here:
            let sName = UTILITIES.createNewDOM("span","st-team-name","",team.name);
            let tr  = UTILITIES.createNewDOM("tr","","","");
            let tdn = UTILITIES.createNewDOM("td","","","");
            let tdt = UTILITIES.createNewDOM("td","","",team.draws.toString());
            let tdw = UTILITIES.createNewDOM("td","","",team.wins.toString());
            let tdl = UTILITIES.createNewDOM("td","","",team.losses.toString());
            let tdp = UTILITIES.createNewDOM("td","","",team.points.toString());
            //
            // let tdi = document.createElement("td");
            let logo = UTILITIES.createNewDOM("object","rounded float-md-left logo","svgObject","");
            logo.data = "./img/svg/logos_v1.svg#".concat(team.name.split(' ').join('_'));
            logo.type = "image/svg+xml";
            logo.width = "96";
            logo.height = "96";
            //
            tdn.appendChild(logo);
            tdn.appendChild(sName);
            tr.appendChild(tdn);
            tr.appendChild(tdw);
            tr.appendChild(tdl);
            tr.appendChild(tdt);
            tr.appendChild(tdp);
            tbody.appendChild(tr);
        })
    },
    setResultsPage: function () {
        //
        let scores = UTILITIES.getLocalStorage(app.key).scores;
        console.log(scores);
        // let teams = UTILITIES.getLocalStorage(app.key).teams;
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        //
        let results = document.getElementById("results");
        results.innerHTML = "";
        let fragment = document.createDocumentFragment();
        // let h2 = UTILITIES.createNewDOM("h2","text-xs-center","","Results");
        // fragment.appendChild(h2);
        scores.forEach(function (item) {
            let date = new Date(item.date);
            date = date.toLocaleDateString('en-US',options);
            let card = UTILITIES.createNewDOM("div","card text-xs-center col-xs-12","","");
            let header = UTILITIES.createNewDOM("div","card-header card-success game-date lead","",date);
            card.appendChild(header);
            item.games.forEach(function (game) {
                //
                let block = UTILITIES.createNewDOM("div","card-block scores-block","","");
                let tHome = UTILITIES.createNewDOM("span","team home","",game.home_name);
                let tAway = UTILITIES.createNewDOM("span","team away","",game.away_name);
                let sHome = UTILITIES.createNewDOM("span","score home","","".concat("\u00A0",game.home_score,"\u00A0"));
                let sAway = UTILITIES.createNewDOM("span","score away","","".concat("\u00A0",game.away_score,"\u00A0"));
                let span  = UTILITIES.createNewDOM("span","separator","","\u00A0X\u00A0");
                let text1 = UTILITIES.createNewDOM("div","card-text scores","","");
                //
                // <!--<object id="svgObject" data="./img/svg/logos_v1.svg" type="image/svg+xml" height="512" width="512"><img src="http://placehold.it/96x96"></object>-->
                let pHome = UTILITIES.createNewDOM("object","rounded float-xs-left logo home","svgObject","");
                pHome.data = "./img/svg/logos_v1.svg#".concat(game.home_name.split(' ').join('_'));
                pHome.type = "image/svg+xml";
                pHome.width = "96";
                pHome.height = "96";
                // pHome.src = "./img/svg/logos_v1.svg";
                let pAway = UTILITIES.createNewDOM("object","rounded float-xs-right logo away","svgObject","");
                pAway.data = "./img/svg/logos_v1.svg#".concat(game.away_name.split(' ').join('_'));
                pAway.type = "image/svg+xml";
                pAway.width = "96";
                pAway.height = "96";
                //
                text1.appendChild(tHome);
                block.appendChild(pAway);
                text1.appendChild(sHome);
                text1.appendChild(span);
                text1.appendChild(sAway);
                text1.appendChild(tAway);
                block.appendChild(pHome);
                block.appendChild(text1);
                card.appendChild(block);
                //
            });
            //
            fragment.appendChild(card);
        });
        results.appendChild(fragment);
        // loadingPage = setTimeout('setResultsPage()',5000);
        //
    },
    //
    retriveData: function (mode) {
        //
        // starting a URL with "//" means use http or https --> whichever the HTML page used.
        // var url = "//griffis.edumedia.ca/test.json";
        //check if the browser supports fetch
        //
        var url = "https://griffis.edumedia.ca/mad9014/sports/soccer.php";
        app.localData = localStorage.getItem(app.key) != null ? UTILITIES.getLocalStorage(app.key) : mode = "new";
        // console.log(app.localData);
        let localDataLength = 0,
            ONE_HOUR = 60 * 60 * 1000,
            timeStamp = Date.now(),
            lastStamp = Date.now();
        if (mode != "new"){
            localDataLength = app.localData.teams.length;
            lastStamp = UTILITIES.getLocalStorage(app.key).time;
        }
        //
        console.log(mode);
        // console.log(localDataLength);
        // console.log(timeStamp);
        // console.log(lastStamp);
        // console.log(ONE_HOUR);
        // console.log((timeStamp - lastStamp));
        if ((mode != undefined && mode == "new") ||
            (localDataLength == 0) ||
            (timeStamp - lastStamp) >= ONE_HOUR){
            //
            console.log("newData");
            // try {
                let teams = [];
                let scores= [];
                //use fetch
                // var url = "./db/template.json";
                //
                let headers = new Headers();
                headers.append("Content-Type", "text/plain");
                headers.append("Accept", "application/json; charset=utf-8");
                //
                let params = {
                    method: 'GET',
                    mode: 'cors',
                    headers: headers
                };
                let req = new Request(url, params);
                //
                fetch(req).then(function (response) {   // fetch("./db/test.json").then(function(response){
                    //
                    return response.json();
                    //
                }).then(function (jData) {
                    //
                    // output.innerHTML += JSON.stringify(jData) + "<br/>";
                    teams = jData.teams;
                    teams.forEach(function (team) {
                        team.wins = 0;
                        team.losses = 0;
                        team.draws = 0;
                        team.points = 0;
                    });
                    scores = jData.scores;
                    //
                    scores.forEach(function (item) {
                        item.games.forEach(function (game) {
                            let draw = (game.home_score == game.away_score ? 1 : 0),
                                iHome = 0,
                                iAway = 0;
                            //
                            for (var i = 0; i < teams.length; i++) {
                                //
                                if (teams[i].id == game.home) {
                                    iHome = i;
                                };
                                if (teams[i].id == game.away) {
                                    iAway = i;
                                };
                                if (iHome && iAway) {
                                    break;
                                }
                            };
                            //
                            game.home_name = teams[iHome].name;
                            game.away_name = teams[iAway].name;
                            // console.log(iHome + "  " + iAway);
                            //
                            if (!draw) {
                                //
                                if (game.home_score > game.away_score){
                                    //
                                    teams[iHome].wins++;
                                    teams[iHome].points += 3;
                                    teams[iAway].losses++;
                                    //
                                }else{
                                    //
                                    teams[iAway].wins++;
                                    teams[iAway].points += 3;
                                    teams[iHome].losses++;
                                    //
                                }
                                //
                            }else {
                                teams[iHome].draws++;
                                teams[iHome].points++
                                teams[iAway].draws++;
                                teams[iAway].points++
                            };
                        })
                    });
                    //
                    var timeInMs = Date.now();
                    UTILITIES.setLocalStorage(app.key,{time:timeInMs, teams:teams, scores:scores});
                    //
                    // var a = document.getElementById("svgObject");
                    // // Get the SVG document inside the Object tag
                    // var svgDoc = a.contentDocument.childNodes;
                    // // Get one of the SVG items by ID;
                    // var svgItem = svgDoc.getElementById("Arsenal_FC");
                    // console.log(a);
                    // console.log(svgDoc);
                    // console.log(svgItem);
                    // Set the colour to something else
                    // svgItem.setAttribute("style", "display:block");
                    //
                }).catch(function (err) {
                    //
                    // output.innerHTML += "Failed to get the url.<br/>"
                    alert("MESSAGE: " + err.message)
                });
        //     } catch (e) {
        //         //use XMLHttpRequest
        //         var xhr = new XMLHttpRequest();
        //         xhr.open("GET", url, true);
        //         xhr.addEventListener("load", function (ev) {
        //             output.innerHTML += "HTTP Status: " + xhr.status + "<br/>";
        //             output.innerHTML += xhr.responseText + "<br/>";
        //         });
        //         xhr.addEventListener("error", function (ev) {
        //             output.innerHTML += "Failed to get the data.<br/>";
        //         });
        //         xhr.send(null);
        //     };
        //     //
        }
        app.setResultsPage();
    }
};

app.initialize();



// document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
// var delay=5000;
// setTimeout(function() {
//     let logos = document.querySelectorAll("#svgObject");
//     logos.forEach(function (logo) {
//         logo.style.display = "block";
//     })
// }, delay);
