// ==UserScript==
// @name         Steam Currency Converter
// @namespace    none
// @version      1.0
// @description  Convert EUR on steam to USD
// @author       /u/FreezyflameMC on reddit
// @match        http://steamcommunity.com/market/listings/*
// @grant        none
// @updateURL    https://github.com/freezyflamemc/steamcurrencyconverter/raw/master/script.user.js
// ==/UserScript==
/* jshint -W097 */
'use strict';

//Change the currency in LINE 63 if you need to!!!
//I'm annoyed by Steam forcing currency changes so I made a little script to convert currency on market to your own currency!
//Steam profile: http://steamcommunity.com/id/freezyflame/ 
//Add me if you can help me out!Or you have any questions
var $ = window.jQuery;
$.ajax({
  url: "http://api.fixer.io/latest?callback=?",
  type: "GET",
  dataType: "json",
  success: function(Jdata) {
    alert("SUCCESS!!!");
  },
  
  error: function() {
    alert("ERROR!!!");
  }
});
var exchangerates = {"AUD":1.4251,"BGN":1.7963,"BRL":4.0215,"CAD":1.4085,"CHF":0.9977,"CNY":6.5718,"CZK":24.817,"DKK":6.8519,"GBP":0.68612,"HKD":7.7582,"HRK":7.022,"HUF":291.44,"IDR":13847.0,"ILS":3.9334,"INR":66.809,"JPY":117.86,"KRW":1202.4,"MXN":17.834,"MYR":4.3768,"NOK":8.8878,"NZD":1.5225,"PHP":47.14,"PLN":4.0086,"RON":4.161,"RUB":75.31,"SEK":8.5158,"SGD":1.4334,"THB":36.27,"TRY":3.0191,"ZAR":16.575,"EUR":0.91844};
var oriprice = $('.market_table_value').find('.market_listing_price_with_fee').text().split("HK$ ").join('');
var specprice = oriprice.replace(/\s/g, '').replace(/,/g,'').trim();
var counter = 0;
var wordarray = [];
var pricearray = [];
var countertwo = 1;
var tempcout = 0;
var mainfunction = function(){
//main logic for common items
    oriprice = $('.market_table_value').find('.market_listing_price_with_fee').text().split("HK$ ").join('');
    specprice = oriprice.replace(/\s/g, '').replace(/,/g,'').trim();
    counter = 0;
    tempcout = 0;
    countertwo = 1;
    wordarray = [];
    pricearray = [];
while(counter<specprice.length){
    var storeword = specprice.substring(counter-1,counter);
    if(storeword === "."){
        var testword = specprice.substring(tempcount,counter+2);
        var tempcount = counter+2;
        wordarray.push(testword);
    }if(storeword === '！'){
        var nanword = specprice.substring(tempcount,counter);
        var tempcount = counter;
        wordarray.push(nanword);
    }
    ++counter;
}
$.each(wordarray,function(index,val){
    var converted;
    converted = parseFloat(wordarray[index]);
            //Change the currency below! vvv
    converted = (converted/exchangerates.EUR).toFixed(2);
    pricearray.push(converted);
    $('.market_listing_row:eq('+countertwo+')').find('.market_listing_price_with_fee').append("<br>US$ "+converted);
    countertwo++;
});
}
//looping the functions
mainfunction();
setInterval(function(){
$('.market_paging_pagelink').click(
    function(){
        setTimeout(function(){mainfunction()},1000);
});
},2000);
