
import $ from 'jquery';
import Highcharts from 'highcharts/highcharts';
import csvBasic from './benchmark-2.0.0-chrome-result-basic.csv';
import csvAny from './benchmark-2.0.0-chrome-result-any.csv';
import csvGradient from './benchmark-2.0.0-chrome-result-gradient.csv';
import csvGradient060 from './benchmark-0.6.0-chrome-result-gradient.csv';
import csvGradientCreation from './benchmark-2.0.0-chrome-result-gradient-creation.csv';
import html from './benchmark-result.html';

require('highcharts/modules/data')(Highcharts);

var csvBasicFile = 'benchmark-2.0.0-chrome-result-basic.csv';
var csvAnyFile = 'benchmark-2.0.0-chrome-result-any.csv';
var csvGradientFile = 'benchmark-2.0.0-chrome-result-gradient.csv';
var csvGradientFile060 = 'benchmark-0.6.0-chrome-result-gradient.csv';

var chart1;
var chart2;
var chart3;

var type = 'linear';
$("#switchLog").click(function(){
    $('#switchLog').prop('value', 'switch to ' + type + ' scale');
    type = type === 'linear' ? 'logarithmic': 'linear';
    chart1.yAxis[0].update({ type: type});
    chart2.yAxis[0].update({ type: type});
    chart3.yAxis[0].update({ type: type});
    $('#axisScale').html(type + ' scale');
});

$.get(csvBasicFile, function(csv) {
    var title = 'Execution speed comparison of color conversion functions.';

    chart1 = Highcharts.chart('chart-basic',
        getChartOptions(csv, title));
});

$.get(csvAnyFile, function(csv) {
    var title = 'Execution speed comparison of ColorUtil.any conversion functions';

    chart2 = Highcharts.chart('chart-any',
        getChartOptions(csv, title));
});

$.get(csvGradientFile, function(csvNew) {
$.get(csvGradientFile060, function(csvOld) {
    var title = 'Execution speed comparison of gradients';

    var merged = mergeCSV(
        map_200_to_060.gradient,
        csvOld,
        csvNew
    );

    chart3 = Highcharts.chart('chart-gradient',
        getChartOptions(merged, title));
});
});

function mergeCSV(mapping, csvOld, csvNew) {
    var parsedOld = parseCsv(csvOld);
    var parsedNew = parseCsv(csvNew);

    var titleRecordOld = parsedOld[0];
    var titleRecordNew = parsedNew[0];
    var lastTitleOld = titleRecordOld[titleRecordOld.length-1];

    titleRecordNew.push(lastTitleOld);

    for (var i = 1; i < parsedNew.length; i++) {

        var record = parsedNew[i];
        var label = record[0];
        var copyValue = '';

        if (mapping[label]) {

            var recordOld = findRecordWithlabel(parsedOld, mapping[label]);

            copyValue = recordOld[recordOld.length-1].trim();
        }

        record.push(copyValue);
    }

    return stringifyCsv(parsedNew);
}

function findRecordWithlabel(csvParsed, label) {
    for (var i = 0; i < csvParsed.length; i++) {
        if (csvParsed[i][0] === label) {
            return csvParsed[i];
        }
    }

    return null;
}

function parseCsv(csv) {

    var records = csv.split(/\n/);
    var result = [];

    return records.map(function(record) {

        return record.split(',').map(function(field) {

            return field.trim();
        })
    });
}

function stringifyCsv(csvParsed) {

    var result = [];

    for (var i = 0; i < csvParsed.length; i++) {

        result.push(csvParsed[i].join(','));
    }

    return result.join('\n');
}

var map_200_to_060 = {
    gradient: {
        'rgb linear gradient 2 colors': 'gradientColor 2 colors',
        'rgb linear gradient 24 colors': 'gradientColor 24 colors',
        'rgb matrix gradient 2x2 colors': 'matrixColor 2x2 colors',
        'rgb matrix gradient 12x12 colors': 'matrixColor 12x12 colors',
        'rgb circular linear gradient 2 colors': 'circleGradientColor 2 colors',
        'rgb circular linear gradient 24 colors': 'circleGradientColor 24 colors',
        'rgb circular matrix gradient 2x2 colors': 'circleMatrixColor 2x2 colors',
        'rgb circular matrix gradient 12x12 colors': 'circleMatrixColor 12x12 colors'
    }
};

function getChartOptions(csv, title) {
    return {
        chart: {
            type: 'bar',
            height: 1000
        },
        data: {
            csv: csv,
            itemDelimiter: ",",
            lineDelimiter: "\n"
        },
        title: {
            text: title
        },
        xAxis: {
            title: {
                text: null
            }
        },
        yAxis: {
            min: 1,
            type: 'linear',
            title: {
                text: 'Operations per second',
                align: 'high',
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' ops/sec'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            enabled: true
        }
    }
}