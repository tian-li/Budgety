var budgetController = (function() {

  // Data Model
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };

  return {
    addItem: function (type, des, val) {
      var newItem, ID;

      // [1, 2, 3, 4, 5] nextID = 6,
      // [1, 2, 4, 6, 8] nextID = 9
      // ID = lastID + 1
      if(data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }
      
      // Create new item based on 'inc' or 'exp' type
      if(type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if(type === 'inc') {
        newItem = new Income(ID, des, val);
      }

      // Push it into our data structure
      data.allItems[type].push(newItem);

      // return the new item
      return newItem;
    }
  };
})();

var UIController = (function() {

  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue:'.add__value',
    inputBtn: '.add__btn'
  }

  return {
    getinput: function () {
      return {
        type : document.querySelector(DOMstrings.inputType).value, // will be inc or exp
        description : document.querySelector(DOMstrings.inputDescription).value,
        value : document.querySelector(DOMstrings.inputValue).value
      };
    },
    getDOMstrings: function() {
      return DOMstrings;
    }
  }

})();

var controller = (function(budegtCtrl, UICtrl) {

  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings();
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', function(event) {
      if(event.keycode === 13 || event.which === 13) { // Enter is pressed, which is for older browser
        ctrlAddItem();
      }
    });
  }


  var ctrlAddItem = function() {
    var input, newItem;

    // 1. Get input date
    input = UICtrl.getinput();
    console.log(input);

    // 2. Add item to bueget controller
    newItem = budegtCtrl.addItem(input.type, input.description, input.value);

    // 3. Add item to UI

    // 4. Cal bueget

    // 5. display bueget to UI
  };

  return {
    init: function() {
      setupEventListeners();
    }
  }

})(budgetController, UIController);

controller.init();