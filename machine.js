var machine = {
    ip: localStorage.getItem("ip"),
    apikey: localStorage.getItem("apikey"),
    rawInfo: {},
    callbacks: {},
    lastMessage: 0,
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

            lastMessage = new Date().getTime();
            
            for(callback in machine.callbacks){
                machine.callbacks[callback](rawInfo);
            }
        };
        
        this.socket.onclose = function(){
            console.log("socket closed");
            switchPage("reconnect");
        };
    },
    addCallback: function(name, func){
        this.callbacks[name] = func;
    },
    socketTimeout: function(){
        console.log("checking for timeout");

        var currentTime = new Date().getTime();
        var timeout = 5000; // time in milliseconds to timeout websocket if no new messages are received within this time
        
        if((currentTime - this.lastMessage) > this.timeout){
            alert("socket timed out");
            this.socket.close();
        }
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

setInterval(machine.socketTimeout, 500);