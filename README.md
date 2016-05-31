# MobileControl
an LCD-like touch screen interface for OctoPrint

# Custom Settings
## settings.js

Parameters

* `xyFeedrate` & `zFeedrate` - feedrate used for the XYZ axes when in the jog menu
* `hotendMax` - max temperature the hotend temperature slider will go
* `bedMax` - max temperature the bed temperature slider will go


There are two easy ways to host a customized settings.js file. You can fork this repository and edit it (hosted on github pages), then your url will be `your-username.github.io/MobileControl`. You can also download this repository and host it locally.

# Installation

##iOS

* Open Safari
* Go to your OctoPrint instance
* Enable the API and CORS
* Copy the API key
* Go to where you are hosting a customized version or  `quillford.github.io/MobileControl` for the stock version
* Enter your OctoPrint instance's IP and api key
* Connect
* Add to Home screen