
import $ from 'jquery';
import Highcharts from 'highcharts/highcharts';
import csv from './benchmark-0.5.0-chrome-result.csv';
import csvAny from './benchmark-0.5.0-chrome-result-any.csv';
import csvOther from './benchmark-0.5.0-chrome-result-other.csv';
import html from './benchmark-result-0.5.0.html';

require('highcharts/modules/data')(Highcharts);

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

$.get("benchmark-0.5.0-chrome-result.csv", function(csv) {
    chart1 = Highcharts.chart('chart', {
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
            text: 'Execution speed comparison of color conversion functions.'
        },
        subtitle: {
            text: 'Unit is operations per second. The longer column the better. Chrome Version 59.0.3071.115 (Official Build) (64-bit).'
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

$.get("benchmark-0.5.0-chrome-result-any.csv", function(csv) {
    chart2 = Highcharts.chart('chart-any', {
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
            text: 'Execution speed comparison of ColorUtil.any conversion functions'
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

$.get("benchmark-0.5.0-chrome-result-other.csv", function(csv) {
    chart3 = Highcharts.chart('chart-other', {
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
            text: 'Execution speed comparison of gradients'
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