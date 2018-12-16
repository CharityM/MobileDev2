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
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        startWatch();
        tryingFile();
        requestFileSystem();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    
    }
};
    //creating a function with time of 3000 milliseconds
    function shake(){
        navigator.vibrate(3000);
        }

        //creating an acceleration callback function
        function accCallback(acceleration){

            var element = document.getElementById('accelerometer');
            element.innerHTML = 'Acceleration X: ' + acceleration.x + '<br>' +
                                'Acceleration Y: ' + acceleration.y + '<br>' +
                                'Acceleration Z: ' + acceleration.z + '<br>' +
                                'Timestamp: ' + acceleration.timestamp + '<br>';

        }

        //creating onError message function
        function onError(message){
            console.log(message);
        }

        //creating a dictionary
        var options = {
            frequecy:3000
        };

        var watchID = null;
        function startWatch(){
        watchID = navigator.accelerometer.watchAcceleration(accCallback, onError, options);
        }

        function pics(){
            navigator.camera.getPicture(cameraCallback, onError);
        }

        //creating a cameraCallback function
        function cameraCallback(imageData){
            var image = document.getElementById('myImage');
            image.scr =  imageData;

        }
//################# (2) Currency Convertor USD TO EUR start #####################//
var text = "";
var result = "";

var http = new XMLHttpRequest();
http.onreadystatechange = (e) => {
    var getvalue = http.responseText
    var responseJSON = JSON.parse(getvalue);
    var data = responseJSON.quotes;
    var keys = Object.keys(data);
    var result = "";
   
    text=document.getElementById('amount').value;
    
    console.log(text);

    //Converting USD to EUR
    keys.forEach((element) =>{
        result = text+ " USD is equivalent to " + data['USDEUR']*text+"EUR"+ "<br>";
});
        
        document.getElementById('result').innerHTML = result ;

}
//API to Convert Currency 
const url =
'http://apilayer.net/api/live?access_key=411dd36f5a8a3df457e353d35db6b386&currencies=EUR,USD&source=USD&format=1';
http.open("GET", url);
http.send();
//######################### end currency #####################################
        
        
        
        //currency conversion
       



        //Create a new function called getLocation()
        function getLocation(){
            console.log("this is your location");
           navigator.geolocation.getCurrentPosition(geoCallback, onError);
        }

        //creating a geoCallback function 
        //It should take one attribute (position).
        //Print to the console the content of the position object.
        function geoCallback(geolocation){
          
            console.log(geolocation);

            var lat = position.coords.latitude;
            var lng = position.coords.longitude;

            var loc = 'Latitude' + position.coords.latitude + '<br>' +
            'Longitude' + position.coords.longitude + '<br>' +
            'Altitude' + position.coords.altitude + '<br>' +
            'Accuracy' + position.coords.accuracy + '<br>' +
            'AltitudeAccuracy' + position.coords.altitudeAccuracy + '<br>' +
            'Heading' + position.coords.heading + '<br>' +
            'Speed' + position.coords.speed + '<br>' +
            'Timestamp' + position.coords.timestamp + '<br>';
            
            document.getElementById('location').innerHTML = loc;
            initMap3(lat,lng);

        };


       function initMap(){
            var dublin = {lat: 53.349804, lng:-6.260310};
            var athlone = {lat: 53.425049, lng:-7.944620};
            var galway = {lat: 53.270668, lng:-9.056790};
            var map = new google.maps.Map(document.getElementById('map'), {

               zoom: 8,
               center: dublin,
               center: athlone,
               center: galway

            }
        );

        var marker = new google.maps.Marker({
            position: dublin,
            map: map
        });

        var marker2 = new google.maps.Marker({
            position: athlone,
            map: map
        });
       
        var marker3 = new google.maps.Marker({
            position: galway,
            map: map
        });
        
    }

    //call this function on the device ready above
    function tryingFile(){

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemCallback, onError);
       
    }
    
    function fileSystemCallback(fs){
        // Displaying result in the console
        console.log('file system open: ' + fs.name);
    
        // Displaying in front end
        //var toFronEnd = 'file system open: ' + fs.name;
        //document.getElementById('file').innerHTML = toFronEnd;
    
        // Name of the file I want to create
        var fileToCreate = "newPersistentFile.txt";
    
        // Opening/creating the file and calling the same functions over and over again
        fs.root.getFile(fileToCreate, fileSystemOptionals, getFileCallback, onError);
    }
    
    var fileSystemOptionals = { create: true, exclusive: false };
    
    function getFileCallback(fileEntry){
        // Display in the console
        console.log("fileEntry is file?" + fileEntry.isFile.toString());
    
        // Displaying in front end
        var toFrontEnd = document.getElementById('pics').innerHTML;
        toFrontEnd += "fileEntry is file?" + fileEntry.isFile.toString();
        document.getElementById('file').innerHTML = toFrontEnd;


        //this is a blob object means anything, in this case a binary blob for saving text files
        var dataObj = new Blob(['Hello'], { type: 'text/plain' });
        // Now decide what to do
        // Write to the file
        writeFile(fileEntry, dataObj);
    
        // Or read the file
        readFile(fileEntry);
    }
    
    // Let's write some files
    function writeFile(fileEntry, dataObj) {
    
        // Create a FileWriter object for our FileEntry (log.txt).
        fileEntry.createWriter(function (fileWriter) {
    
            // If data object is not passed in,
            // create a new Blob instead.
            if (!dataObj) {
                dataObj = new Blob(['Hello'], { type: 'text/plain' });
            }
    
            fileWriter.write(dataObj);
    
            fileWriter.onwriteend = function() {
                console.log("Successful file write...");
            };
    
            fileWriter.onerror = function (e) {
                console.log("Failed file write: " + e.toString());
            };
    
        });
    }
    
    // Let's read some files
    function readFile(fileEntry) {
    
        // Get the file from the file entry
        fileEntry.file(function (file) {
            
            // Create the reader
            var reader = new FileReader();
            reader.readAsText(file);
    
            reader.onloadend = function() {
    
                console.log("Successful file read: " + this.result);
                console.log("file path: " + fileEntry.fullPath);
    
            };
    
        }, onError);
    }