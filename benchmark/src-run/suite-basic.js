
var uintabgr = 0xFFFFFFFF;

function createSuite_basic(colors) {
    var suite = new Benchmark.Suite;

    suite

    // .add('rgb -> int', function() {
    //     colorutil.rgb.to.int(colors.rgb);
    // })

    // .add('rgb -> hex', function() {
    //     colorutil.rgb.to.hex(colors.rgb);
    // })

    // .add('rgb -> cssrgb', function() {
    //     colorutil.rgb.to.cssrgb(colors.rgb);
    // })

    // .add('rgb -> hsl', function() {
    //     colorutil.rgb.to.hsl(colors.rgb);
    // })

    // .add('rgb -> hsv', function() {
    //     colorutil.rgb.to.hsv(colors.rgb);
    // })



    // .add('rgba -> int', function() {
    //     colorutil.rgb.to.int(colors.rgba);
    // })

    // .add('rgba -> hex', function() {
    //     colorutil.rgb.to.hex(colors.rgba);
    // })

    // .add('rgba -> cssrgb', function() {
    //     colorutil.rgb.to.cssrgb(colors.rgba);
    // })

    // .add('rgba -> cssrgba', function() {
    //     colorutil.rgb.to.cssrgba(colors.rgba);
    // })

    // .add('rgba -> uintabgr', function() {
    //     colorutil.rgb.to.uintabgr(colors.rgba);
    // })

    // .add('rgba -> uintabgrOpaque', function() {
    //     colorutil.rgb.to.uintabgrOpaque(colors.rgba);
    // })

    // .add('rgba -> uintrgba', function() {
    //     colorutil.rgb.to.uintrgba(colors.rgba);
    // })

    // .add('rgba -> intabgr', function() {
    //     colorutil.rgb.to.intabgr(colors.rgba);
    // })

    // .add('rgba -> intabgrOpaque', function() {
    //     colorutil.rgb.to.intabgrOpaque(colors.rgba);
    // })

    // .add('rgba -> intrgba', function() {
    //     colorutil.rgb.to.intrgba(colors.rgba);
    // })

    // .add('rgba -> hsl', function() {
    //     colorutil.rgb.to.hsl(colors.rgba);
    // })

    // .add('rgba -> hsv', function() {
    //     colorutil.rgb.to.hsv(colors.rgba);
    // })



    // .add('int -> rgb', function() {
    //     colorutil.int.to.rgb(colors.int);
    // })

    // .add('int -> hex', function() {
    //     colorutil.int.to.hex(colors.int);
    // })

    // .add('int -> cssrgb', function() {
    //     colorutil.int.to.cssrgb(colors.int);
    // })

    // .add('int -> cssrgba', function() {
    //     colorutil.int.to.cssrgba(colors.int);
    // })



    .add('intabgr -> rgb', function() {
        colorutil.intabgr.to.rgb(uintabgr);
    })



    .add('intrgba -> rgb', function() {
        colorutil.intrgba.to.rgb(uintabgr);
    })



    .add('hex -> rgb', function() {
        colorutil.hex.to.rgb(colors.hex);
    })

    .add('hex -> int', function() {
        colorutil.hex.to.int(colors.hex);
    })

    .add('hex -> cssrgb', function() {
        colorutil.hex.to.cssrgb(colors.hex);
    })

    .add('hex -> cssrgba', function() {
        colorutil.hex.to.cssrgba(colors.hex);
    })



    .add('shortHex -> rgb', function() {
        colorutil.hex.to.rgb(colors.shortHex);
    })

    .add('shortHex -> int', function() {
        colorutil.hex.to.int(colors.shortHex);
    })

    .add('shortHex -> cssrgb', function() {
        colorutil.hex.to.cssrgb(colors.shortHex);
    })

    .add('shortHex -> cssrgba', function() {
        colorutil.hex.to.cssrgba(colors.shortHex);
    })



    .add('cssrgb -> rgb', function() {
        colorutil.cssrgb.to.rgb(colors.cssrgb);
    })

    .add('cssrgb -> int', function() {
        colorutil.cssrgb.to.int(colors.cssrgb);
    })

    .add('cssrgb -> hex', function() {
        colorutil.cssrgb.to.hex(colors.cssrgb);
    })



    .add('cssrgba -> rgb', function() {
        colorutil.cssrgba.to.rgb(colors.cssrgba);
    })

    .add('cssrgba -> int', function() {
        colorutil.cssrgba.to.int(colors.cssrgba);
    })

    .add('cssrgba -> hex', function() {
        colorutil.cssrgba.to.hex(colors.cssrgba);
    })



    .add('hsl -> rgb', function() {
        colorutil.hsl.to.rgb(colors.hsl);
    })

    .add('hsl -> hsv', function() {
        colorutil.hsl.to.hsv(colors.hsl);
    })

    .add('hsl -> csshsl', function() {
        colorutil.hsl.to.csshsl(colors.hsl);
    })

    .add('hsl -> csshsla', function() {
        colorutil.hsl.to.csshsla(colors.hsl);
    })



    .add('hsla -> rgb', function() {
        colorutil.hsl.to.rgb(colors.hsla);
    })

    .add('hsla -> hsv', function() {
        colorutil.hsl.to.hsv(colors.hsla);
    })

    .add('hsla -> csshsl', function() {
        colorutil.hsl.to.csshsl(colors.hsla);
    })

    .add('hsla -> csshsla', function() {
        colorutil.hsl.to.csshsla(colors.hsla);
    })



    .add('csshsl -> hsl', function() {
        colorutil.csshsl.to.hsl(colors.csshsl);
    })



    .add('csshsla -> hsl', function() {
        colorutil.csshsla.to.hsl(colors.csshsla);
    })



    .add('hsv -> rgb', function() {
        colorutil.hsv.to.rgb(colors.hsv);
    })

    .add('hsv -> hsl', function() {
        colorutil.hsv.to.hsl(colors.hsv);
    })



    .add('hsva -> rgb', function() {
        colorutil.hsv.to.rgb(colors.hsva);
    })

    .add('hsva -> hsl', function() {
        colorutil.hsv.to.hsl(colors.hsva);
    })



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