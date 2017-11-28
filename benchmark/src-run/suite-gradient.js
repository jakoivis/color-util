
function createSuite_gradient() {

    var suite = new Benchmark.Suite;

    var gradient2Colors = colorutil.convert([0xFF0000,0x00FF00], colorutil.int.to.rgb);
    var gradient2ColorsHSL = colorutil.convert([0xFF0000,0x00FF00], colorutil.any.to.hsl);
    var gradient6Colors = colorutil.convert([0xFF0000,0xFFFF00,0x00FF00,0x00FFFF,0x0000FF,0xFF00FF], colorutil.int.to.rgb);
    var gradient6ColorsHSL = colorutil.convert([0xFF0000,0xFFFF00,0x00FF00,0x00FFFF,0x0000FF,0xFF00FF], colorutil.any.to.hsl);
    var gradient12Colors = gradient6Colors.concat(gradient6Colors);
    var gradient12ColorsHSL = gradient6Colors.concat(gradient6ColorsHSL);
    var gradient24Colors = gradient12Colors.concat(gradient12Colors);
    var gradient24ColorsHSL = gradient12Colors.concat(gradient12ColorsHSL);

    var matrix2x2Colors = colorutil.convert([
        [0xFF0000,0x00FF00],
        [0x110000,0x001100]
    ], colorutil.int.to.rgb);

    var matrix2x2ColorsHSL = colorutil.convert([
        [0xFF0000,0x00FF00],
        [0x110000,0x001100]
    ], colorutil.any.to.hsl);

    var matrix12x12Colors = colorutil.convert([
        [0xFF0000,0xFFFF00,0x00FF00,0x00FFFF,0x0000FF,0xFF00FF,0xFF0000,0xFFFF00,0x00FF00,0x00FFFF,0x0000FF,0xFF00FF],
        [0x110000,0x111100,0x001100,0x001111,0x000011,0x110011,0x110000,0x111100,0x001100,0x001111,0x000011,0x110011],
        [0xEE0000,0xEEEE00,0x00EE00,0x00EEEE,0x0000EE,0xEE00EE,0xEE0000,0xEEEE00,0x00EE00,0x00EEEE,0x0000EE,0xEE00EE],
        [0x220000,0x222200,0x002200,0x002222,0x000022,0x220022,0x220000,0x222200,0x002200,0x002222,0x000022,0x220022],
        [0xFF0000,0xFFFF00,0x00FF00,0x00FFFF,0x0000FF,0xFF00FF,0xFF0000,0xFFFF00,0x00FF00,0x00FFFF,0x0000FF,0xFF00FF],
        [0x110000,0x111100,0x001100,0x001111,0x000011,0x110011,0x110000,0x111100,0x001100,0x001111,0x000011,0x110011],
        [0xEE0000,0xEEEE00,0x00EE00,0x00EEEE,0x0000EE,0xEE00EE,0xEE0000,0xEEEE00,0x00EE00,0x00EEEE,0x0000EE,0xEE00EE],
        [0x220000,0x222200,0x002200,0x002222,0x000022,0x220022,0x220000,0x222200,0x002200,0x002222,0x000022,0x220022],
        [0xFF0000,0xFFFF00,0x00FF00,0x00FFFF,0x0000FF,0xFF00FF,0xFF0000,0xFFFF00,0x00FF00,0x00FFFF,0x0000FF,0xFF00FF],
        [0x110000,0x111100,0x001100,0x001111,0x000011,0x110011,0x110000,0x111100,0x001100,0x001111,0x000011,0x110011],
        [0xEE0000,0xEEEE00,0x00EE00,0x00EEEE,0x0000EE,0xEE00EE,0xEE0000,0xEEEE00,0x00EE00,0x00EEEE,0x0000EE,0xEE00EE],
        [0x220000,0x222200,0x002200,0x002222,0x000022,0x220022,0x220000,0x222200,0x002200,0x002222,0x000022,0x220022]
    ], colorutil.int.to.rgb);

    var matrix12x12ColorsHSL = colorutil.convert([
        [0xFF0000,0xFFFF00,0x00FF00,0x00FFFF,0x0000FF,0xFF00FF,0xFF0000,0xFFFF00,0x00FF00,0x00FFFF,0x0000FF,0xFF00FF],
        [0x110000,0x111100,0x001100,0x001111,0x000011,0x110011,0x110000,0x111100,0x001100,0x001111,0x000011,0x110011],
        [0xEE0000,0xEEEE00,0x00EE00,0x00EEEE,0x0000EE,0xEE00EE,0xEE0000,0xEEEE00,0x00EE00,0x00EEEE,0x0000EE,0xEE00EE],
        [0x220000,0x222200,0x002200,0x002222,0x000022,0x220022,0x220000,0x222200,0x002200,0x002222,0x000022,0x220022],
        [0xFF0000,0xFFFF00,0x00FF00,0x00FFFF,0x0000FF,0xFF00FF,0xFF0000,0xFFFF00,0x00FF00,0x00FFFF,0x0000FF,0xFF00FF],
        [0x110000,0x111100,0x001100,0x001111,0x000011,0x110011,0x110000,0x111100,0x001100,0x001111,0x000011,0x110011],
        [0xEE0000,0xEEEE00,0x00EE00,0x00EEEE,0x0000EE,0xEE00EE,0xEE0000,0xEEEE00,0x00EE00,0x00EEEE,0x0000EE,0xEE00EE],
        [0x220000,0x222200,0x002200,0x002222,0x000022,0x220022,0x220000,0x222200,0x002200,0x002222,0x000022,0x220022],
        [0xFF0000,0xFFFF00,0x00FF00,0x00FFFF,0x0000FF,0xFF00FF,0xFF0000,0xFFFF00,0x00FF00,0x00FFFF,0x0000FF,0xFF00FF],
        [0x110000,0x111100,0x001100,0x001111,0x000011,0x110011,0x110000,0x111100,0x001100,0x001111,0x000011,0x110011],
        [0xEE0000,0xEEEE00,0x00EE00,0x00EEEE,0x0000EE,0xEE00EE,0xEE0000,0xEEEE00,0x00EE00,0x00EEEE,0x0000EE,0xEE00EE],
        [0x220000,0x222200,0x002200,0x002222,0x000022,0x220022,0x220000,0x222200,0x002200,0x002222,0x000022,0x220022]
    ], colorutil.any.to.hsl);

    var gradient2 = colorutil.rgb.gradient({colors: gradient2Colors});
    var gradient2Circular = colorutil.rgb.gradient({colors: gradient2Colors, type:'circular'});
    var gradient2HSL = colorutil.rgb.gradient({colors: gradient2ColorsHSL});
    var gradient6 = colorutil.rgb.gradient({colors: gradient6Colors});
    var gradient6Circular = colorutil.rgb.gradient({colors: gradient6Colors, type:'circular'});
    var gradient6HSL = colorutil.rgb.gradient({colors: gradient6ColorsHSL});
    var gradient12 = colorutil.rgb.gradient({colors: gradient12Colors});
    var gradient12Circular = colorutil.rgb.gradient({colors: gradient12Colors, type:'circular'});
    var gradient12HSL = colorutil.rgb.gradient({colors: gradient12ColorsHSL});
    var gradient24 = colorutil.rgb.gradient({colors: gradient24Colors});
    var gradient24Circular = colorutil.rgb.gradient({colors: gradient24Colors, type:'circular'});
    var gradient24HSL = colorutil.rgb.gradient({colors: gradient24ColorsHSL});

    var matrix2x2 = colorutil.rgb.gradient({colors: matrix2x2Colors});
    var matrix2x2Circular = colorutil.rgb.gradient({colors: matrix2x2Colors, type:'circular'});
    var matrix2x2HSL = colorutil.rgb.gradient({colors: matrix2x2ColorsHSL});
    var matrix12x12 = colorutil.rgb.gradient({colors: matrix12x12Colors});
    var matrix12x12Circular = colorutil.rgb.gradient({colors: matrix12x12Colors, type:'circular'});
    var matrix12x12HSL = colorutil.rgb.gradient({colors: matrix12x12ColorsHSL});

    suite

    .add('create rgb gradient 2 colors', function() {
        colorutil.rgb.gradient({colors: gradient2Colors});
    })
    .add('create rgb gradient 6 colors', function() {
        colorutil.rgb.gradient({colors: gradient6Colors});
    })
    .add('create rgb gradient 12 colors', function() {
        colorutil.rgb.gradient({colors: gradient12Colors});
    })
    .add('create rgb gradient 24 colors', function() {
        colorutil.rgb.gradient({colors: gradient24Colors});
    })
    .add('create rgb matrix 2x2 colors', function() {
        colorutil.rgb.gradient({colors: matrix2x2Colors});
    })
    .add('create rgb matrix 12x12 colors', function() {
        colorutil.rgb.gradient({colors: matrix12x12Colors});
    })

    .add('create hsl gradient 2 colors', function() {
        colorutil.rgb.gradient({colors: gradient2ColorsHSL});
    })
    .add('create hsl gradient 6 colors', function() {
        colorutil.rgb.gradient({colors: gradient6ColorsHSL});
    })
    .add('create hsl gradient 12 colors', function() {
        colorutil.rgb.gradient({colors: gradient12ColorsHSL});
    })
    .add('create hsl gradient 24 colors', function() {
        colorutil.rgb.gradient({colors: gradient24ColorsHSL});
    })
    .add('create hsl matrix 2x2 colors', function() {
        colorutil.rgb.gradient({colors: matrix2x2ColorsHSL});
    })
    .add('create hsl matrix 12x12 colors', function() {
        colorutil.rgb.gradient({colors: matrix12x12ColorsHSL});
    })

    .add('rgb linear gradient 2 colors', function() {
        gradient2(Math.random(), Math.random());
    })
    .add('rgb linear gradient 6 colors', function() {
        gradient6(Math.random(), Math.random());
    })
    .add('rgb linear gradient 12 colors', function() {
        gradient12(Math.random(), Math.random());
    })
    .add('rgb linear gradient 24 colors', function() {
        gradient24(Math.random(), Math.random());
    })

    .add('rgb circular linear gradient 2 colors', function() {
        gradient2Circular(Math.random(), Math.random());
    })
    .add('rgb circular linear gradient 6 colors', function() {
        gradient6Circular(Math.random(), Math.random());
    })
    .add('rgb circular linear gradient 12 colors', function() {
        gradient12Circular(Math.random(), Math.random());
    })
    .add('rgb circular linear gradient 24 colors', function() {
        gradient24Circular(Math.random(), Math.random());
    })

    .add('hsl linear gradient 2 colors', function() {
        gradient2HSL(Math.random(), Math.random());
    })
    .add('hsl linear gradient 6 colors', function() {
        gradient6HSL(Math.random(), Math.random());
    })
    .add('hsl linear gradient 12 colors', function() {
        gradient12HSL(Math.random(), Math.random());
    })
    .add('hsl linear gradient 24 colors', function() {
        gradient24HSL(Math.random(), Math.random());
    })

    .add('rgb matrix gradient 2x2 colors', function() {
        matrix2x2(Math.random(), Math.random());
    })
    .add('rgb matrix gradient 12x12 colors', function() {
        matrix12x12(Math.random(), Math.random());
    })

    .add('rgb circular matrix gradient 2x2 colors', function() {
        matrix2x2Circular(Math.random(), Math.random());
    })
    .add('rgb circular matrix gradient 12x12 colors', function() {
        matrix12x12Circular(Math.random(), Math.random());
    })

    .add('hsl matrix gradient 2x2 colors', function() {
        matrix2x2HSL(Math.random(), Math.random());
    })
    .add('hsl matrix gradient 12x12 colors', function() {
        matrix12x12HSL(Math.random(), Math.random());
    })

    .on('cycle', function(event) {

        var key = event.target.name;

        data[key] = Math.round(event.target.hz);

        console.log(String(event.target));
    })

    .on('complete', function() {
        console.log("-----");

        var csv = "operation,ops\n";

        _.forEach(data, function(ops, operation) {
            csv += operation + "," + ops + "\n";
        });

        console.log(csv);
    });

    return suite;
}