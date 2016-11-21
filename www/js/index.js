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
        document.getElementById('buttonCamera').addEventListener('click', this.buttonClickedCamera, false);
        document.getElementById('buttonScannerQrCode').addEventListener('click', this.buttonClickedScannerQrCode, false);
        document.getElementById('buttonScannerBarcode').addEventListener('click', this.buttonClickedScannerBarcode, false);

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    buttonClickedCamera: function() {
      navigator.customCamera.getPicture(function success(base64) {
            document.getElementById('photo').src = "data:image/jpeg;base64,"+base64;
        }, function failure(error) {
            alert(error);
        }, {
            quality: 100,
            targetWidth: 100,
            targetHeight:100,
            title:'Title to camera',
            buttonDone:'OK',
            buttonRestart:'Take another picture',
            buttonCancel:'Cancel',
            toggleCamera: true
        });
    },
    buttonClickedScannerQrCode: function() {
      cordova.plugins.barcodeScanner.scan(
         function (result) {
             alert("We got a barcode\n" +
                   "Result: " + result.text + "\n" +
                   "Format: " + result.format + "\n" +
                   "Cancelled: " + result.cancelled);
         },
         function (error) {
            if(error.cancelled!=1){
              alert("Scanning failed: " + error);
            }
         },
         {
             "preferFrontCamera" : true, //  Android Only
             "showFlipCameraButton" : true, //  Android Only
             "prompt" : "Place a barcode inside the scan area", // supported on Android only
             "formats" : "QR_CODE,PDF_417", // Android Only
             "orientation" : "portrait" //  default portrait
         }
      );
    },
    buttonClickedScannerBarcode: function() {
      cordova.plugins.barcodeScanner.scan(
         function (result) {
             alert("We got a barcode\n" +
                   "Result: " + result.text + "\n" +
                   "Format: " + result.format + "\n" +
                   "Cancelled: " + result.cancelled);
         },
         function (error) {
             if(error.cancelled!=1){
               alert("Scanning failed: " + error);
             }
         },
         {
             "preferFrontCamera" : true, //  Android Only
             "showFlipCameraButton" : true, //  Android Only
             "prompt" : "Place a barcode inside the scan area", // supported on Android only
             "formats" : "QR_CODE,PDF_417", // Android Only
             "orientation" : "landscape", //  default portrait
             "flash" : "auto" // iOS only
         }
      );
    }
    ,
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

app.initialize();
