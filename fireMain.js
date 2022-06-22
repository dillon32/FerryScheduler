function unfold() {

    var e = document.getElementById('seasons');
    var strSeason = e.options[e.selectedIndex].text;
    
    if(strSeason != "") {
    var element = document.getElementsByClassName('hidden');
    for(var i = 0; i < element.length; i++) {
        element[i].classList.toggle('show');
    }
    } else {
        var element = document.getElementsByClassName('hidden');
        for(var i = 0; i < element.length; i++) {
            if(element[i].classList.contains('show')){
            element[i].classList.toggle('show');
            }
        }
        var element2 = document.getElementsByClassName('hidden2');
        var element3 = document.getElementsByClassName('hidden3');
        var elements4 = document.getElementsByClassName('hidden4');
        for(var k = 0; k < element2.length; k++) {
            if(element2[k].classList.contains('show')) {
            element2[k].classList.toggle('show');
            }
        }
        for(var j = 0; j < element3.length; j++) {
            if(element3[j].classList.contains('show')) {
                element3[j].classList.toggle('show');
            }
        }
        for(var l = 0; l < elements4.length; l++) {
            if(elements4[j].classList.contains('show')) {
                elements4[j].classList.toggle('show');
            }
        }
    }
    //document.getElementById("destinations").classList.toggle("show");
}

function unfold2() {

    var e = document.getElementById("origins");
    var strOrigins = e.options[e.selectedIndex].text;
    origin = strOrigins;
    
    console.log(strOrigins);
    if(strOrigins == "Penn Station" || 
        strOrigins == "Jamaica/JFK") {
            var element = document.getElementById("destinations");
            element.value = "1";
            if(element.selectedIndex >= 0) {
               element.options[element.selectedIndex].selected = false;
                console.log("Penn or Jamaica: " + element.selectedIndex);
            }
            console.log(element.options.length);
            for(let i = element.options.length - 1; i >= 0; i--) {
                element.remove(i);
                console.log("i: " + i)
            }
            console.log(element.options.length);
            var opt = document.createElement('option');
            opt.value = "1";
            opt.innerHTML = "";
            element.appendChild(opt);
            var opt2 = document.createElement('option');
            opt2.value = "Cherry Grove";
            opt2.innerHTML = "Cherry Grove";
            element.appendChild(opt2);
            var opt3 = document.createElement('option');
            opt3.value = "Pines";
            opt3.innerHTML = "Pines";
            element.appendChild(opt3);
    } else {
            var element = document.getElementById("destinations");
            element.value = "1";
            if(element.selectedIndex >= 0) {
                element.options[element.selectedIndex].selected = false;
                console.log("Other: " + element.selectedIndex);
            }

            for(let i = element.options.length - 1; i >= 0; i--) {
                element.remove(i);
            }

            var opt = document.createElement('option');
            opt.value = "1";
            opt.innerHTML = "";
            element.appendChild(opt);
            var opt2 = document.createElement('option');
            opt2.value = "Penn Station";
            opt2.innerHTML = "Penn Station";
            element.appendChild(opt2);
            var opt3 = document.createElement('option');
            opt3.value = "Jamaice/JFK";
            opt3.innerHTML = "Jamaica/JFK";
            element.appendChild(opt3);
    }
    if(strOrigins == "") {
    var element = document.getElementsByClassName('hidden2');
    var element2 = document.getElementsByClassName('hidden3');
    var elements3 = document.getElementsByClassName('hidden4');
    for(var i = 0; i < element.length; i++) {
        if(element[i].classList.contains('show')) {
        element[i].classList.toggle('show');
        }
    }
    for(var j = 0; j < element2.length; j++) {
        if(element2[j].classList.contains('show')) {
            element2[j].classList.toggle('show');
        }
    }
    for(var j = 0; j < elements3.length; j++) {
        if(elements3[j].classList.contains('show')) {
            elements3[j].classList.toggle('show');
        }
    }
    } else {
    var element = document.getElementsByClassName('hidden2');
    for(var i = 0; i < element.length; i++) {
        if(element[i].classList.contains('show') == false) {
        element[i].classList.toggle('show');
        }
    }
    }
}

function unfold3() {
    var e = document.getElementById("destinations");
    var strDestinations = e.options[e.selectedIndex].text;


    var elements = document.getElementsByClassName('hidden3');
    var elements2 = document.getElementsByClassName('hidden4');
    if(strDestinations == "") {
        for(var i = 0; i < elements.length; i++) {
            if(elements[i].classList.contains('show')) {
            elements[i].classList.toggle('show');
            }
        }
        for(var i = 0; i < elements2.length; i++) {
            if(elements2[i].classList.contains('show')) {
            elements2[i].classList.toggle('show');
            }
        }
    } else {
        if(strDestinations == "Cherry Grove" || strDestinations == "Pines") {
            direction = "east";
            destination = strDestinations;
            console.log("Below direction assignment");
        } else {
            direction = "west";
        }
        loadFerry();
        for(var i = 0; i < elements.length; i++) {
            if(elements[i].classList.contains('show') == false) {
            elements[i].classList.toggle('show');
            }
        }
    }

}

function unfold4(strDate) {

    var date = new Date(strDate);
    var date2 = new Date("09/06/2022");
    console.log(strDate);
    if(date.getTime() > date2.getTime()) {
        alert('You selected a time outside of the summer season.');
        var element = document.getElementsByClassName('hidden4');
        for(var i = 0; i < element.length; i++) {
            if(element[i].classList.contains('show')) {
            element[i].classList.toggle('show');
            }
        }
    } else {
    var element = document.getElementsByClassName('hidden4');
    for(var i = 0; i < element.length; i++) {
        if(element[i].classList.contains('show') == false) {
        element[i].classList.toggle('show');
        }
    }
    }

    var date2 = date.getDay();
    switch(date2) {
        case 0:
            dayOfTheWeek = "Sunday";
            break;
        case 1:
            dayOfTheWeek = "Monday";
            break;
        case 2:
            dayOfTheWeek = "Tuesday";
            break;
        case 3:
            dayOfTheWeek = "Wednesday";
            break;
        case 4:
            dayOfTheWeek = "Thursday";
            break;
        case 5:
            dayOfTheWeek = "Friday";
            break;
        default:
            dayOfTheWeek = "Saturday";
    } //end switch

    loadLIRR(dayOfTheWeek);

    var store = document.getElementById('storeDate');
    var opt = document.createElement('option');
    opt.value = strDate;
    opt.innerHTML = strDate;
    store.appendChild(opt);
}

function clearPage() {

    console.log(direction);
    var element = document.getElementsByClassName('hidden');
        for(var i = 0; i < element.length; i++) {
            if(element[i].classList.contains('show')){
            element[i].classList.toggle('show');
            }
        }
        var element2 = document.getElementsByClassName('hidden2');
        var element3 = document.getElementsByClassName('hidden3');
        var elements4 = document.getElementsByClassName('hidden4');
        for(var k = 0; k < element2.length; k++) {
            if(element2[k].classList.contains('show')) {
            element2[k].classList.toggle('show');
            }
        }
        for(var j = 0; j < element3.length; j++) {
            if(element3[j].classList.contains('show')) {
                element3[j].classList.toggle('show');
            }
        }
        for(var l = 0; l < elements4.length; l++) {
            if(elements4[l].classList.contains('show')) {
                elements4[l].classList.toggle('show');
            }
        }
        var element6 = document.getElementsByClassName('appear');
        for(var m = 0; m < element6.length; m++) {
            if(element6[m].classList.contains('appear')) {
            element6[m].classList.toggle('hidden');
            }
        }
    
    var element7 = document.getElementById('loader')
    if(direction == "west") {
        var para = document.createElement("p");
        var txt = document.createTextNode("Waiting for the train...");
        para.appendChild(txt);
        element7.appendChild(para);
    } else {
        var para = document.createElement("p");
        var txt = document.createTextNode("Waiting for the ferry...");
        para.appendChild(txt);
        element7.style.display = "inline-block";
        para.style.position = "relative";
        element7.appendChild(para);
    }
}


