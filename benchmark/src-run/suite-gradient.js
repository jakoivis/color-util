
function createSuite_gradient() {

    var suite = new Benchmark.Suite;

    var gradient2 = colorutil.convert([0xFF0000,0x00FF00], colorutil.int.to.rgb);
    var gradient6 = colorutil.convert([0xFF0000,0xFFFF00,0x00FF00,0x00FFFF,0x0000FF,0xFF00FF], colorutil.int.to.rgb);
    var gradient12 = gradient6.concat(gradient6);
    var gradient24 = gradient12.concat(gradient12);

    var matrix2x2 = colorutil.convert([
        [0xFF0000,0x00FF00],
        [0x110000,0x001100]
    ], colorutil.int.to.rgb);

    var matrix12x12 = colorutil.convert([
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

    suite

    .add(`gradientColor 2 colors`, function() {
        colorutil.rgb.gradientColor(gradient2, Math.random());
    })
    .add(`gradientColor 24 colors`, function() {
        colorutil.rgb.gradientColor(gradient24, Math.random());
    })

    .add(`matrixColor 2x2 colors`, function() {
        colorutil.rgb.matrixColor(matrix2x2, Math.random(), Math.random());
    })
    .add(`matrixColor 12x12 colors`, function() {
        colorutil.rgb.matrixColor(matrix12x12, Math.random(), Math.random());
    })

    .add(`circleGradientColor 2 colors`, function() {
        colorutil.rgb.circleGradientColor(gradient2, Math.random(), Math.random());
    })
    .add(`circleGradientColor 24 colors`, function() {
        colorutil.rgb.circleGradientColor(gradient24, Math.random(), Math.random());
    })

    .add(`circleMatrixColor 2x2 colors`, function() {
        colorutil.rgb.circleMatrixColor(matrix2x2, Math.random(), Math.random());
    })
    .add(`circleMatrixColor 12x12 colors`, function() {
        colorutil.rgb.circleMatrixColor(matrix12x12, Math.random(), Math.random());
    })

    .add(`hue`, function() {
        colorutil.rgb.hue({r:255, g:255, b: 255, a: 255});
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
}