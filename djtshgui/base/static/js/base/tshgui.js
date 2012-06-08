var App = (function($) {
    var divisionEntering = null;

    // $("#click").click(function() {
    //     $.post('/getTshConfig/', {}, function(data) {
    //         TSHCONFIG = data;       // TSHCONFIG is variable globally defined in index.html
    //         $("#click").hide();
    //         tshconfigChanged();
    //     }, 'json')
    // });

    function tshconfigChanged(TSHCONFIG) {
        $("#divisions").empty();
        for (div in TSHCONFIG) {
            var d = $("<div/>", {
                    text: div,
                    'class': 'division',
                    'id': 'division_' + div
                });
            $("#divisions").append(d);
            $(d).click(function() {
                // event handler for div clicker
                console.log('entering socre for div', $(this).text());
                divisionEntering = $(this).text();
                $("#divisions").hide();
            });
        }
    }

    tshconfigChanged();

    return {
        init: function (initConfig) {
            tshconfigChanged(initConfig);
        }
    };


}(jQuery));