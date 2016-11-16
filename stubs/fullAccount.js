module.exports = {
  "account": {
    "amazonId": "999888777666"
  },
  "children": [
    {
      "name": "Winston",
      "chores": [
        {
          "title": "Clean your room",
          "details": "Please clean your room nice and neat. Vaccuum it too!",
          "date": "2016-12-24",
          "completed": false
        },
        {
          "title": "Wash the dishes",
          "details": "Use the blue sponge under the sink.",
          "date": "2016-12-24",
          "completed": true
        },
        {
          "title": "Wash the dishes",
          "details": "Use the blue sponge under the sink.",
          "date": "2016-12-24",
          "completed": false
        }
      ],
      "checkedIn": false,
      "schedule": {
        "default": [null, "18:30", "14:30", "17:00", "22:00", "17:00", null],
        "dateOfLastCurfew": "2016-11-14"
      }
    },
    {
      "name": "Wendy",
      "chores": [
        {
          "title": "Clean your room",
          "details": "Please clean your room nice and neat. Vaccuum it too!",
          "date": "2016-12-24",
          "completed": false
        }
      ],
      "checkedIn": true,
      "schedule": {
        "default": [null, "18:30", "14:30", "17:00", "22:00", "17:00", null],
        "dateOfLastCurfew": "2016-11-13"
      }
    },
    {
      "name": "Luis",
      "chores": [],
      "checkedIn": false,
      "schedule": {
        "default": [null, "18:30", "14:30", "17:00", "22:00", "17:00", null],
        "dateOfLastCurfew": "2016-11-13"
      }
    }
  ]
};
