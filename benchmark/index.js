
import $ from 'jquery';
import Highcharts from 'highcharts/highcharts';
import csv1 from './benchmark-0.4.1-chrome-conversion-result.csv';
import csv2 from './benchmark-0.4.1-chrome-other-result.csv';
import html from './benchmark-result.html';

require('highcharts/modules/data')(Highcharts);

let chart1;
let chart2;

let type = 'linear';
$("#switchLog").click(function(){
    $('#switchLog').prop('value', 'switch to ' + type + ' scale');
    type = type === 'linear' ? 'logarithmic': 'linear';
    chart1.yAxis[0].update({ type: type});
    chart2.yAxis[0].update({ type: type});
    $('#axisScale').html(type + ' scale');
});

$.get("benchmark-0.4.1-chrome-conversion-result.csv", function(csv) {
    chart1 = Highcharts.chart('chart', {
        chart: {
            type: 'bar',
            height: 2000
        },
        data: {
            csv: csv,
            itemDelimiter: ",",
            lineDelimiter: "\n"
        },
        title: {
            text: 'Execution speed comparison of color conversion functions.'
        },
        subtitle: {
            text: 'Unit is operations per second. The longer column the better. Chrome Version 59.0.3071.115 (Official Build) (64-bit). Similar functions from other libraries has been taken as a reference.'
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
    });
});

$.get("benchmark-0.4.1-chrome-other-result.csv", function(csv) {
    chart2 = Highcharts.chart('chart-other', {
        chart: {
            type: 'bar',
            height: 500
        },
        data: {
            csv: csv,
            itemDelimiter: ",",
            lineDelimiter: "\n"
        },
        title: {
            text: 'Execution speed comparison of other color-util functions'
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
    });
});