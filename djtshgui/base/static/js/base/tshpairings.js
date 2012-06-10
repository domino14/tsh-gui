var PairingsView = (function($) {
    var setupDivisions = false;
    var tshConfig = null;

    function tshconfigChanged(cfg) {
        if (!setupDivisions) {
            $("#divisions").empty();

            for (div in cfg) {
                var d = $("<div/>", {
                        text: div,
                        'class': 'division',
                        'id': 'division_' + div
                    });
                $("#divisions").append(d);
                $(d).click(function() {
                    // event handler for div clicker
                    console.log('entering score for div', $(this).text());
                    divisionEntering = $(this).text();
                    $("#divisionsHolder").hide();
                    $("#gameselectHolder").show();
                    populateGameSelect();
                });
            }
            setupDivisions = true;
        }
        tshConfig = cfg;
    }

    function pairings(startRd, endRd) {
        $("#roundconfig").empty();

        // sort tshConfig alphabetically
        var alpha = [];
        for (var division in tshConfig) {
            alpha.push(division);
        }
        alpha.sort();
        console.log(alpha)
        if (startRd != endRd) {
            $("#titleView").text("Pairings for rounds " + startRd + " - " + endRd);
        }
        else {
            $("#titleView").text("Pairings for round " + startRd);
        }
        $.each(alpha, function(index, division) {
            for (var player in tshConfig[division].players) {
                var playerObject = tshConfig[division].players[player];
                // the winter hack
                playerObject.name = playerObject.name.replace(/^Zxqkj, Winter$/, 'Winter');

                var html = '<span class="playernumber">' + player + '</span><span class="playername">' + 
                    playerObject.name + '</span> <span class="vs">vs. </span>';
                for (var rd = startRd; rd <= endRd; rd++) {
                    var vsIndex = playerObject.pairings[rd-1];
                    var oppName = tshConfig[division].players[vsIndex].name.replace(/^Zxqkj, Winter$/, 'Winter');
                    html += '<span class="opponent">' + vsIndex + "</span>";
                }
                var div = $('<div/>', {
                    html: html,
                    'class': 'pairing div' + division
                });
                $("#pairingsView").append(div);

            }
        });


    }


    return {
        init: function (initConfig) {
            tshconfigChanged(initConfig);
        },
        showPairings: function(startRd, endRd) {
            pairings(startRd, endRd);
        }
    };


}(jQuery));