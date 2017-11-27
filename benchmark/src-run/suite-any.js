
function createSuite_any(colors) {

    var suite = new Benchmark.Suite;

    _.forEach(colors, function(value, key) {
        suite

        .add(`any(${key}) -> rgb`, function() {
            colorutil.any.to.rgb(value);
        })

        .add(`any(${key}) -> int`, function() {
            colorutil.any.to.int(value);
        })

        .add(`any(${key}) -> hex`, function() {
            colorutil.any.to.hex(value);
        })

        .add(`any(${key}) -> cssrgb`, function() {
            colorutil.any.to.cssrgb(value);
        })

        .add(`any(${key}) -> cssrgba`, function() {
            colorutil.any.to.cssrgba(value);
        })

        .add(`any(${key}) -> hsl`, function() {
            colorutil.any.to.hsl(value);
        })

        .add(`any(${key}) -> hsv`, function() {
            colorutil.any.to.hsv(value);
        })

        .add(`any(${key}) -> csshsl`, function() {
            colorutil.any.to.csshsl(value);
        })

        .add(`any(${key}) -> csshsla`, function() {
            colorutil.any.to.csshsla(value);
        });
    });

    suite

    .on('cycle', function(event) {

        var key = event.target.name;

        data[key] = Math.round(event.target.hz);

        console.log(String(event.target));
    })

    .on('complete', function() {
        console.log("-----");

        var csv = "operation,operations\n";

        _.forEach(data, function(value, key) {
            csv += key + "," + value + "\n";
        });

        console.log(csv);
    });

    return suite;
}