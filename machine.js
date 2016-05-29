var machine = {
    ip: localStorage.getItem("ip"),
    apikey: localStorage.getItem("apikey"),
    rawInfo: {},
    callbacks: {},
    setIp: function(ip){
        this.ip = ip;
        localStorage.setItem("ip", this.ip);
    },
    setApikey: function(apikey){
        this.apikey = apikey;
        localStorage.setItem("apikey", this.apikey);
    },
    connect: function(){
        this.socket = new WebSocket("ws://"+this.ip+"/sockjs/websocket");
        
        this.socket.onopen = function(){
            console.log("socket opened");  
        };
        
        this.socket.onmessage = function(e){
            console.log("you have mail");
            
            rawInfo = JSON.parse(e.data);
            
            for(callback in machine.callbacks){
                machine.callbacks[callback](rawInfo);
            }
        };
        
        this.socket.onclose = function(){
            switchPage("reconnect");
        };
    },
    addCallback: function(name, func){
        console.log(typeof(func));
        this.callbacks[name] = func;
    },
    testConenction: function(){
        console.log(this.ip)
        var i = this.ip;
        var ap = this.apikey;
        $.ajaxSetup({headers:{"X-Api-Key" : ap}, async: true});
        $.getJSON("http://"+i+"/api/version",function(json){
            
        }).error(function() {
            return "false";
        });
    },
    sendCommand: function(command){
        $.ajaxSetup({headers:{"X-Api-Key" : this.apikey}});
        $.ajax({
            url: "http://"+this.ip+"/api/printer/command",
            contentType: "application/json",
            data: JSON.stringify({"command": command}),
            method: "POST"
        });
    },
    sendCommands: function(commands){
        $.ajaxSetup({headers:{"X-Api-Key" : this.apikey}});
        $.ajax({
            url: "http://"+this.ip+"/api/printer/command",
            contentType: "application/json",
            data: JSON.stringify({"commands": commands}),
            method: "POST"
        });
    },
    jogAxis: function(axis, direction, amount, feedrate){
        this.sendCommands(["G91", "G1 " + axis + increment*direction + " F" + feedrate, "G90"]);
    },
    home: function(axis){
        this.sendCommand("G28 " + axis);
    },
    getFiles: function(){
        $.ajaxSetup({headers:{"X-Api-Key" : this.apikey}, async: false});
        $.getJSON("http://"+this.ip+"/api/files", function(e){
            console.log(e);
            return e.files;
        });
    },
    printFile: function(filename, local){
        $.ajaxSetup({headers:{"X-Api-Key" : this.apikey}});
        $.ajax({
            url: "http://"+this.ip+"/api/files/"+(local ? "local" : "sd")+"/"+filename,
            contentType: "application/json",
            data: JSON.stringify({"command": "select", "print": true}),
            method: "POST"
        });
    },
    jobOperation: function(operation){
        $.ajaxSetup({headers:{"X-Api-Key" : this.apikey}});
        $.ajax({
            url: "http://"+this.ip+"/api/job",
            contentType: "application/json",
            data: JSON.stringify({"command": operation}),
            method: "POST"
        });
    },
    getRawInfo: function(){
        return rawInfo;
    }
};