var machine = {
    ip: localStorage.getItem("ip"),
    apikey: localStorage.getItem("apikey"),
    getIp: function(){
        return ip;
    },
    connect: function(){
        this.socket = new WebSocket("ws:///"+this.ip+"/sockjs/websocket");
        
        this.socket.onopen = function(){
            console.log("socket opened");  
        };
        
        this.socket.onmessage = function(){
            console.log("you have mail");
        };
        
        this.socket.onclose = function(){
            window.location.href = "reconnect.html"; 
        };
    },
    setIp: function(ip){
        this.ip = ip;
        localStorage.setItem("ip", this.ip);
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
        this.sendCommand("G28" + axis);
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
    }
};