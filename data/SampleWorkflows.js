// Array containing serial workflow items
var sampleWorkflow1 = [
  {
    "id": 11,
    "name": "Item11",
    "description": "Description11",
    "sequence": 1
  },
  {
    "id": 21,
    "name": "Item21",
    "description": "Description21",
    "sequence": 2
  },
  {
    "id": 31,
    "name": "Item31",
    "description": "Description31",
    "sequence": 3
  },
  {
    "id": 41,
    "name": "Item41",
    "description": "Description41",
    "sequence": 4
  }
];

// Array containing simple parallel workflow items
var sampleWorkflow2 = [
  {
    "id": 11,
    "name": "Item11",
    "description": "Description11",
    "sequence": 1
  },
  {
    "id": 21,
    "name": "Item21",
    "description": "Description21",
    "sequence": 2
  },
  {
    "id": 22,
    "name": "Item22",
    "description": "Description22",
    "sequence": 2
  },
  {
    "id": 23,
    "name": "Item23",
    "description": "Description23",
    "sequence": 2
  },
  {
    "id": 31,
    "name": "Item31",
    "description": "Description31",
    "sequence": 3
  },
  {
    "id": 41,
    "name": "Item41",
    "description": "Description41",
    "sequence": 4
  },
  {
    "id": 42,
    "name": "Item42",
    "description": "Description42",
    "sequence": 4
  }
];

// Array containing starting parallel workflow items
var sampleWorkflow3 = [
  {
    "id": 11,
    "name": "Item11",
    "description": "Description11",
    "sequence": 1
  },
  {
    "id": 12,
    "name": "Item12",
    "description": "Description12",
    "sequence": 1
  },
  {
    "id": 21,
    "name": "Item21",
    "description": "Description21",
    "sequence": 2
  },
  {
    "id": 31,
    "name": "Item31",
    "description": "Description31",
    "sequence": 3
  },
  {
    "id": 32,
    "name": "Item32",
    "description": "Description32",
    "sequence": 3
  },
  {
    "id": 33,
    "name": "Item33",
    "description": "Description33",
    "sequence": 3
  },
  {
    "id": 41,
    "name": "Item41",
    "description": "Description41",
    "sequence": 4
  }
];

// Array containing adjacent parallel workflow items
var sampleWorkflow4 = [
  {
    "id": 11,
    "name": "Item11",
    "description": "Description11",
    "sequence": 1
  },
  {
    "id": 12,
    "name": "Item12",
    "description": "Description12",
    "sequence": 1
  },
  {
    "id": 21,
    "name": "Item21",
    "description": "Description21",
    "sequence": 2
  },
  {
    "id": 22,
    "name": "Item22",
    "description": "Description22",
    "sequence": 2
  },
  {
    "id": 23,
    "name": "Item23",
    "description": "Description23",
    "sequence": 2
  },
  {
    "id": 31,
    "name": "Item31",
    "description": "Description31",
    "sequence": 3
  }
];

// Array containing complex parallel workflow items
var sampleWorkflow5 = [
  {
    "id": 11,
    "name": "Item11",
    "description": "Description11",
    "sequence": 1
  },
  {
    "id": 12,
    "name": "Item12",
    "description": "Description12",
    "sequence": 1
  },
  {
    "id": 21,
    "name": "Item21",
    "description": "Description21",
    "sequence": 2
  },
  {
    "id": 22,
    "name": "Item22",
    "description": "Description22",
    "sequence": 2
  },
  {
    "id": 31,
    "name": "Item31",
    "description": "Description31",
    "sequence": 3
  },
  {
    "id": 32,
    "name": "Item32",
    "description": "Description32",
    "sequence": 3
  },
  {
    "id": 33,
    "name": "Item33",
    "description": "Description33",
    "sequence": 3
  },
  {
    "id": 41,
    "name": "Item41",
    "description": "Description41",
    "sequence": 4
  },
  {
    "id": 42,
    "name": "Item42",
    "description": "Description42",
    "sequence": 4
  },
  {
    "id": 43,
    "name": "Item43",
    "description": "Description43",
    "sequence": 4
  }
];

// Array containing complex parallel workflow items with unsorted and non continuous sequence
var sampleWorkflow6 = [
  {
    "id": 42,
    "name": "Item42",
    "description": "Description42",
    "sequence": 10
  },
  {
    "id": 21,
    "name": "Item21",
    "description": "Description21",
    "sequence": 5
  },
  {
    "id": 11,
    "name": "Item11",
    "description": "Description11",
    "sequence": 2
  },
  {
    "id": 22,
    "name": "Item22",
    "description": "Description22",
    "sequence": 5
  },
  {
    "id": 31,
    "name": "Item31",
    "description": "Description31",
    "sequence": 6
  },
  {
    "id": 23,
    "name": "Item23",
    "description": "Description23",
    "sequence": 5
  },
  {
    "id": 12,
    "name": "Item12",
    "description": "Description12",
    "sequence": 2
  },
  {
    "id": 41,
    "name": "Item41",
    "description": "Description41",
    "sequence": 10
  },
  {
    "id": 43,
    "name": "Item43",
    "description": "Description43",
    "sequence": 10
  },
  {
    "id": 32,
    "name": "Item32",
    "description": "Description32",
    "sequence": 6
  }
];

// Array containing invalid workflow items
var invalidWorkflow = [
  {
      "abc": 100,
      "xyz": "xyz"
  },
  {}
];