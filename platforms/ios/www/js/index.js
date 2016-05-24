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

jQuery(document).ready(function($) {

	FastClick.attach(document.body);
	
	//console.log('docready');

	//document.addEventListener("deviceready", onDeviceReady);
    });

//function onDeviceReady() {

jQuery(document).ready(function($){

homePage = $("#homepage"),
    currentPage = homePage,
    pageHistory = [],
    pageInitHistory = [];

currentPage.css('display','block');

currentPage.trigger({
	type: "pagebeforeshow"
	    });

currentPage.trigger({
	type: "pageshow"
	    });

currentPage.trigger({
	type: "pageinit"
	    });

pageInitHistory.push(currentPage.attr('id'));

// set transition navigation flag that locks buttons until the page transition is finished
transitionNavigationFlag = false;
    
$('.navigate').click(function(e) {
	e.preventDefault();
	
	if (!transitionNavigationFlag) {
	    if ($(this).attr('href') != '#' && $(this).attr('href') != '#back') {
		
		if ($(this).attr('href') != $(currentPage).attr('id')) {
		    pageHistory.push('#' + currentPage.attr('id'));
		}
		
		if ($(this).attr('href') != '#homepage') {
		    slidePageFrom($(this).attr('href'), 'right'); 
		} else {
		    slidePageFrom($(this).attr('href'), 'left'); 
		}
		
	    } else if ($(this).attr('href') == '#back') {
		
		slidePageFrom(pageHistory[pageHistory.length - 1], 'left'); 
		
		if (pageHistory[pageHistory.length - 1] != $(currentPage).attr('id')) {
		    pageHistory.pop();
		}
	    }
	}
    });

    });

function slidePageFrom(page, from) {

    //never transition to yourself
    if ($(page).attr('id') != $(currentPage).attr('id')) {

	transitionNavigationFlag = true;
	    
	// new page show event
	$(page).trigger({
		type: "pagebeforeshow"
		    });
	
	// Position the page at the starting position of the animation
	$(page).removeClass('left right');
	$(page).addClass(from);
	$(page).css('display','block');
	    
	// Position the new page and the current page at the ending position of their animation with a transition class indicating the duration of the animation
	//this timeout is needed, not exactly sure why
	window.setTimeout(function() {
		
		$(page).addClass('transition center').removeClass(from);
		window.setTimeout(function() {
			$(page).removeClass('transition');
		    }, 250);
		        
		// current page hiding event
		currentPage.trigger({
			type: "pagebeforehide"
			    });
		currentPage.addClass('transition').addClass(from === "left" ? "right" : "left").removeClass('center');
		currentPageDelay = currentPage;
		window.setTimeout(function() {
			currentPageDelay.removeClass('transition').removeClass(from);
			currentPageDelay.css('display','none');
		    }, 250);
		//console.log('currentPage = ' + currentPage.attr('id');
		//console.log('nextpage = ' + $(page).attr('id'));
		currentPage = $(page);
		        
		// send init and show events, only send init once
		if (pageInitHistory.indexOf(currentPage.attr('id')) == '-1') {
		    currentPage.trigger({
			    type: "pageinit"
				});
		    pageInitHistory.push(currentPage.attr('id'));
		}
		        
		currentPage.trigger({
			type: "pageshow"
			    });
		
		transitionNavigationFlag = false;
	    }, 1);
    }
}

    
