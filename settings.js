var settings = {
    "jog": {
        "xyFeedrate": 3000,
        "zFeedrate": 200
    },
    "temperature": {
        "hotendMax": 260, // max hotend temperature
        "bedMax": 120 // max bed temperature
    },
    "custom": [
        {
            "title": "Fan On",
            "command": "M106" 
        },
        {
            "title": "Fan Off",
            "command": "M107" 
        },
        {
            "title": "Hotend Fan On",
            "command": "M42" 
        },
        {
            "title": "Hotend Fan Off",
            "command": "M43" 
        },
        {
            "title": "Extrude 10mm",
            "commands": ["G91", "G1 E10", "G90"]
        },
        {
            "title": "Retract 10mm",
            "commands": ["G91", "G1 E-10", "G90"]
        }
    ]
};