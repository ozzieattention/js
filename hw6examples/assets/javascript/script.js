var calculator = {
    result: 0,
    operations: "",
    
    calculate: function() {
        try {
            this.result = eval(this.operations);
            if (!(Number.isInteger(this.result)))
                this.result = this.result.toFixed(10);
            if (this.result == null || this.result == undefined)
                this.result = '0';
        } catch (error) {
            console.log(error);
            this.result = "NaN";
            this.clear();
        }

    },
   
    clear: function() {
        this.operations = "";
    },
   
    addOperator: function(operator) {

        this.operations = "".concat(this.operations, operator.trim());
        this.operations.trim();
    },


};


function updateUI() {

    display.value = calculator.operations;
  
}


function displayResult() {
    display.value = calculator.result;
}


var display = document.getElementById("screen");
var allButtons = document.getElementsByTagName("button");

[...allButtons].forEach(element => {

    element.addEventListener('click', function() {
        if (element.id == "clear") {
            calculator.clear();
            updateUI();
        } else if (element.id == "equals") {
            calculator.calculate();
            calculator.clear();
            updateUI();
            displayResult();
        } else {
            calculator.addOperator(element.value);
            updateUI();
        }
    });
});