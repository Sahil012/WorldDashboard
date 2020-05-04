var countries = [];
var yesterdayGrowth = [];
var daybeforeGrowth = [];
var todayGrowth = [];
var growth = [];
var previousGrowth = [];
var date = new Date();
var ts = new Date;
var flag = 0;
var secFlag = 0;
var thirdFlag = 0;

Date.prototype.toISODate = function() {
    return this.toISOString().slice(0, 10);
};

//Fetching Data

$.ajax({
    type: "GET",
    url: "https://api.quarantine.country/api/v1/summary/latest", // Using our JSON file to serve results
    success: function(result) {
        for (var key in result.data.regions) {
            countries.push(key);
        }
        for (var i = 0; i < 26; i++) {
            $('.country' + i).text(result["data"]["regions"][countries[i]]["name"]);
            $('.total' + i).text(result["data"]["regions"][countries[i]]["total_cases"]);
            $('.growth' + i).text(result["data"]["regions"][countries[i]]["change"]["total_cases"]);
            todayGrowth.push(result["data"]["regions"][countries[i]]["change"]["total_cases"]);
        }
        date.setDate(date.getDate() - 1);
        for (var j = 0; j < 26; j++) {
            $.ajax({
                type: "GET",
                url: 'https://api.quarantine.country/api/v1/summary/region?region=' + countries[j] + '&date=' + date.toISODate() + '&ts=' + ts.getTime(), // Using our JSON file to serve results
                success: function(result) {
                    yesterdayGrowth.push(result["data"]["change"]["total_cases"]);
                    for (var i = flag; i < 26; i++) {
                        var grow = todayGrowth[i] - yesterdayGrowth[i];
                        growth.push(grow);
                        flag += 1;
                        break;
                    }
                }
            });
        }
        date.setDate(date.getDate() - 2);
        for (var k = 0; k < 26; k++) {
            $.ajax({
                type: "GET",
                url: 'https://api.quarantine.country/api/v1/summary/region?region=' + countries[k] + '&date=' + date.toISODate() + '&ts=' + ts.getTime(), // Using our JSON file to serve results
                success: function(result) {
                    daybeforeGrowth.push(result["data"]["change"]["total_cases"]);
                    for (var i = secFlag; i < 26; i++) {
                        var grow = yesterdayGrowth[i] - daybeforeGrowth[i];
                        previousGrowth.push(grow);
                        secFlag += 1;
                        break;
                    }
                    for (var i = thirdFlag; i < 26; i++) {
                        if (growth[i] > previousGrowth[i]) {
                            $('.growth' + i).css('color', 'red');
                            $('.growth_in_percentage' + i).text('+' + ((todayGrowth[i] / yesterdayGrowth[i]) * 100).toFixed(2) + '%');
                            $('.growth_in_percentage' + i).addClass('badge-danger');
                        } else {
                            $('.growth' + i).css('color', 'green');
                            $('.growth_in_percentage' + i).text('-' + ((todayGrowth[i] / yesterdayGrowth[i]) * 100).toFixed(2) + '%');
                            $('.growth_in_percentage' + i).addClass('badge-success');
                        }
                        thirdFlag += 1;
                        break;
                    }
                }
            });
        }
    }
});

// Chart

var countries = [];
var first_day = [];
var sec_day = [];
var third_day = [];
var fourth_day = [];
var fivth_day = [];
var sixth_day = [];
var seventh_day = [];
var fourthFlag = 0;

for (var i = 0; i < 26; i++) {
    $.ajax({
        type: "GET",
        url: "https://api.quarantine.country/api/v1/summary/latest", // Using our JSON file to serve results
        success: function(result) {
            for (var key in result.data.regions) {
                countries.push(key);
            }
            for (var i = fourthFlag; i < 26; i++) {
                console.log(fourthFlag);
                $.ajax({
                    type: "GET",
                    url: 'https://api.quarantine.country/api/v1/spots/week?region=' + countries[i], // Using our JSON file to serve results
                    success: function(result) {
                        var todayTime = new Date();
                        var day = todayTime.getDate();
                        var month = todayTime.getMonth() + 1;
                        var year = todayTime.getFullYear();
                        if (month.toString().length == 1) {
                            month = '0' + month;
                        }
                        if (day.toString().length == 1) {
                            day = '0' + day;
                        }                    
                        first_day.push(result["data"][year + "-" + month + "-" + day]["total_cases"]);
                        var todayTime = new Date();
                        todayTime.setDate(todayTime.getDate() - 1);
                        var day = todayTime.getDate();
                        var month = todayTime.getMonth() + 1;
                        var year = todayTime.getFullYear();
                        if (month.toString().length == 1) {
                            month = '0' + month;
                        }
                        if (day.toString().length == 1) {
                            day = '0' + day;
                        }
                        sec_day.push(result["data"][year + "-" + month + "-" + day]["total_cases"]);
                        var todayTime = new Date();
                        todayTime.setDate(todayTime.getDate() - 2);
                        var day = todayTime.getDate();
                        var month = todayTime.getMonth() + 1;
                        var year = todayTime.getFullYear();
                        if (month.toString().length == 1) {
                            month = '0' + month;
                        }
                        if (day.toString().length == 1) {
                            day = '0' + day;
                        }
                        third_day.push(result["data"][year + "-" + month + "-" + day]["total_cases"]);
                        var todayTime = new Date();
                        todayTime.setDate(todayTime.getDate() - 3);
                        var day = todayTime.getDate();
                        var month = todayTime.getMonth() + 1;
                        var year = todayTime.getFullYear();
                        if (month.toString().length == 1) {
                            month = '0' + month;
                        }
                        if (day.toString().length == 1) {
                            day = '0' + day;
                        }
                        fourth_day.push(result["data"][year + "-" + month + "-" + day]["total_cases"]);
                        var todayTime = new Date();
                        todayTime.setDate(todayTime.getDate() - 4);
                        var day = todayTime.getDate();
                        var month = todayTime.getMonth() + 1;
                        var year = todayTime.getFullYear();
                        if (month.toString().length == 1) {
                            month = '0' + month;
                        }
                        if (day.toString().length == 1) {
                            day = '0' + day;
                        }
                        fivth_day.push(result["data"][year + "-" + month + "-" + day]["total_cases"]);
                        var todayTime = new Date();
                        todayTime.setDate(todayTime.getDate() - 5);
                        var day = todayTime.getDate();
                        var month = todayTime.getMonth() + 1;
                        var year = todayTime.getFullYear();
                        if (month.toString().length == 1) {
                            month = '0' + month;
                        }
                        if (day.toString().length == 1) {
                            day = '0' + day;
                        }
                        sixth_day.push(result["data"][year + "-" + month + "-" + day]["total_cases"]);
                        var todayTime = new Date();
                        todayTime.setDate(todayTime.getDate() - 6);
                        var day = todayTime.getDate();
                        var month = todayTime.getMonth() + 1;
                        var year = todayTime.getFullYear();
                        if (month.toString().length == 1) {
                            month = '0' + month;
                        }
                        if (day.toString().length == 1) {
                            day = '0' + day;
                        }
                        seventh_day.push(result["data"][year + "-" + month + "-" + day]["total_cases"]);
                        var ctx = document.getElementById("canvas" + i).getContext("2d");
                        var lineChartData = {
                            labels: ["Data 1", "Data 2", "Data 3", "Data 4", "Data 5", "Data 6", "Data 7"],
                            datasets: [{
                                fillColor: "transparent",
                                strokeColor: "rgba(0,123,252,1)",
                                pointColor: "rgba(0,123,252,1)",
                                data: [seventh_day[i], sixth_day[i], fivth_day[i], fourth_day[i], third_day[i], sec_day[i], first_day[i]]
                            }]
                        }

                        Chart.defaults.global.animationSteps = 50;
                        Chart.defaults.global.tooltipYPadding = 16;
                        Chart.defaults.global.tooltipCornerRadius = 0;
                        Chart.defaults.global.tooltipTitleFontStyle = "normal";
                        Chart.defaults.global.tooltipFillColor = "rgba(0,160,0,0.8)";
                        Chart.defaults.global.animationEasing = "easeOutBounce";
                        Chart.defaults.global.responsive = true;
                        Chart.defaults.global.scaleLineColor = "transparent";
                        Chart.defaults.global.scaleFontSize = 8;

                        var LineChartDemo = new Chart(ctx).Line(lineChartData, {
                            pointDotRadius: 1,
                            bezierCurve: false,
                            scaleShowVerticalLines: false,
                            scaleGridLineColor: "transparent",
                            scaleShowLabels: false,
                            scaleFontColor: "transparent"
                        });                    
                    }
                });
                fourthFlag += 1;
                break;
            }
        }
    });
}