var App = (function($) {
    var setupDivisions = false;
    var tshConfig = null;
    var divisionEntering = null;

    // $("#click").click(function() {
    //     $.post('/getTshConfig/', {}, function(data) {
    //         TSHCONFIG = data;       // TSHCONFIG is variable globally defined in index.html
    //         $("#click").hide();
    //         tshconfigChanged();
    //     }, 'json')
    // });

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

    function setupEventHandlers() {
        $(".btn_back").click(function() {
            // reset back to division selection
            $("#divisionsHolder").show();
            $("#gameselectHolder").hide();
            $("#numberinput").hide();
        });

    }

    function populateGameSelect() {
        var divData = tshConfig[divisionEntering];
        console.log(divData);
        for (player in divData.players) {
            for (pairing in players[player].pairings) {
                if (players[player].scores[pairing] == undefined) {
                    // this pairing is valid
                    var game = $("<div/>", {
                        html: '<span class="round">Rd. ' + (pairing + 1) + '</span> --- ' + player.pairings
                        'class': 'gameentry',
                        'id': 'rd_' + (pairing + 1) + '_' + player + '_' + players[player].pairings[pairing]
                    });
                }
            }
        }
    }






    return {
        init: function (initConfig) {
            tshconfigChanged(initConfig);
            $("#numberinput").hide();
            $("#gameselectHolder").hide();
            setupEventHandlers();
        }
    };


}(jQuery));