


var app = angular.module('testingApp', [
    'ngRoute'
]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        // Home
        .when("/", {templateUrl: "templates/home.html", controller: "PageCtrl"})
            
        // Pages
        .when("/animation", {templateUrl: "templates/animation.html"})
            
        // Else
        .otherwise("/", {templateUrl: "templates/home.html"});

}]);


app.controller('PageCtrl', function(){
    //console.log("Расходитесь, тут не на что смотреть");


    function randomInteger(min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1)
        rand = Math.round(rand);
        return rand;
    }

    var rc = function () {
        //console.log(randomInteger(100000, 999999));

        var c = '#';

        var slo = '';
        for (var i=0; i<6; i++) {
            slo = randomInteger(0, 15);
            if (slo == 10) {
                slo = 'a';
            }
            else if (slo == 11 ) {
                slo = 'b';
            }
            else if (slo == 12 ) {
                slo = 'b';
            }
            else if (slo == 13 ) {
                slo = 'c';
            }
            else if (slo == 14 ) {
                slo = 'e';
            }
            else if (slo == 15 ) {
                slo = 'f';
            }

            c = c + slo;
        }

        return c;
    }

    $('.dobavit').click(function() {
        var table1 = $('table');

        var uzeEst = $('tr');
        var skolko_budet_TD = 1;
        if (uzeEst[0]) {
            skolko_budet_TD = uzeEst[0].children.length;
        }

        var placeToShow = $('#forSquare');

        if (table1.length>0) {
            var table = $(table1[0]);
        }
        else {
            var table = $('<table></table>');
            placeToShow.append(table);
        }

        $('.dobavitStolbec').show();
        $('.delete').show();

        var strocaTable = $('<tr></tr>');
        var yacekaTable = '';

        for (var i=1; i<=skolko_budet_TD; i++) {
            yacekaTable = $('<td style="background-color:' + rc()+'"></td>');
            strocaTable.append(yacekaTable.clone());
        }

        table.append(strocaTable);

        saveCookie();


    });

    $('.dobavitStolbec').click(function() {
        var stolbec = $('<td style="background-color:' + rc()+'"></td>');

        var vseTR = $('tr');
        //console.log(vseTR);
        var skolko_budet_TD = vseTR.length;



        for (var i=0; i<skolko_budet_TD; i++) {
            stolbec= $('<td style="background-color:' + rc()+'"></td>');
            $(vseTR[i]).append(stolbec.clone());
        }

        saveCookie();
    });

    $('.delete').click (function () {
        $('tr').remove();

        $('.dobavitStolbec').hide();
        $('.delete').hide();

        saveCookie();
    });

    function saveCookie () {
        var trForCookie = $('tr');
        var countTrForCookie = trForCookie.length;

        if (trForCookie[0]) {
            var tdforCookie = trForCookie[0].children.length;
        }
        else {
            var tdforCookie = 0;
        }

        $.cookie('countTR', countTrForCookie, {expires: 7 });
        $.cookie('countTD',tdforCookie, {expires: 7});
    }



    var countTR = $.cookie('countTR');
    var countTD = $.cookie('countTD');
    if (countTR > 0) {
        //console.log (countTR, countTD);
        var stroca = $('<tr></tr>');
        var stolbec = $('<td style="background-color:' + rc()+'"></td>>');
        var table1 = $('<table></table>');
        var placeToShow = $('#forSquare');
        placeToShow.append(table1);

        for (var i=0; i<countTR; i++){
            stroca = $('<tr></tr>');
            table1.append(stroca);
            for (var j=0; j<countTD; j++) {
                stolbec=$('<td style="background-color:' + rc()+'"></td>>');
                stroca.append(stolbec);
            }
        }
        $('.dobavitStolbec').show();
        $('.delete').show();

    }





    $.ajax({
        url: "config.json",
        dataType : "json",
        success: function (dump) {
            //console.log (dump);
            //console.log (dump.countTR);
        }
    });



});