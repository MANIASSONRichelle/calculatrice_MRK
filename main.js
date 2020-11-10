(function() {
    "use strict";


    var el = function(element) {
        if (element.charAt(0) === "#") {
            return document.querySelector(element);
        }

        return document.querySelectorAll(element);
    };


    var viewer = el("#viewer"),
        equals = el("#equals"),
        nums = el(".num"),
        ops = el(".ops"),
        theNum = "",
        oldNum = "",
        resultNum,
        operator;
    var setNum = function() {
        if (resultNum) {
            theNum = this.getAttribute("data-num");
            resultNum = "";
        } else {
            theNum += this.getAttribute("data-num");
        }

        viewer.innerHTML = theNum;

    };
    var moveNum = function() {
        oldNum = theNum;
        theNum = "";
        operator = this.getAttribute("data-ops");

        equals.setAttribute("data-result", "");
    };

    var displayNum = function() {

        oldNum = parseFloat(oldNum);
        theNum = parseFloat(theNum);

        switch (operator) {
            case "+":
                resultNum = oldNum + theNum;
                break;

            case "-":
                resultNum = oldNum - theNum;
                break;

            case "*":
                resultNum = oldNum * theNum;
                break;

            case "/":
                resultNum = oldNum / theNum;
                break;

            default:
                resultNum = theNum;
        }

        if (!isFinite(resultNum)) {
            if (isNaN(resultNum)) {
                resultNum = "Fail !";
                document.getElementById("wut").style.display = "block";
            } else {
                resultNum = "La division par 0 est impossible :/ <br> (en plus t'as cassé la calculette)";
                document.getElementById("explosion").style.display = "block";
            }
        }

        viewer.innerHTML = resultNum;
        equals.setAttribute("data-result", resultNum);
        oldNum = 0;
        theNum = resultNum;

    };

    var clearAll = function() {
        oldNum = "";
        theNum = "";
        viewer.innerHTML = "0";
        equals.setAttribute("data-result", resultNum);
        document.getElementById("wut").style.display = "none";
    };


    for (var i = 0, l = nums.length; i < l; i++) {
        nums[i].onclick = setNum;
    }

    for (var i = 0, l = ops.length; i < l; i++) {
        ops[i].onclick = moveNum;
    }

    equals.onclick = displayNum;

    el("#clear").onclick = clearAll;

}());