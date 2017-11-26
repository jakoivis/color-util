
var example = {

    drawOnCanvas: function(width, height, gradient, canvasId) {

        canvasId = canvasId || 'canvas';

        var canvas = document.getElementById(canvasId);
        var ctx = canvas.getContext('2d');
        var imageData  = ctx.createImageData(width, height);
        var buffer = imageData.data.buffer;
        var uint32View = new Uint32Array(buffer);
        var uint8CView = new Uint8ClampedArray(buffer);

        canvas.width = width;
        canvas.height = height;

        for(var x = 0; x < width; x++) {

            for(var y = 0; y < height; y++) {

                var rgb = gradient(x, y);

                uint32View[y * width + x] = colorutil.rgb.to.intabgr(rgb);
            }
        }

        imageData.data.set(uint8CView);

        ctx.putImageData(imageData, 0, 0);
    },

    drawOnCanvasHSV: function(width, height, gradient, canvasId) {

        canvasId = canvasId || 'canvas';

        var canvas = document.getElementById(canvasId);
        var ctx = canvas.getContext('2d');
        var imageData  = ctx.createImageData(width, height);
        var buffer = imageData.data.buffer;
        var uint32View = new Uint32Array(buffer);
        var uint8CView = new Uint8ClampedArray(buffer);

        canvas.width = width;
        canvas.height = height;

        for(var x = 0; x < width; x++) {

            for(var y = 0; y < height; y++) {

                var hsv = gradient(x, y);
                var rgb = colorutil.hsv.to.rgb(hsv);

                uint32View[y * width + x] = colorutil.rgb.to.intabgr(rgb);
            }
        }

        imageData.data.set(uint8CView);

        ctx.putImageData(imageData, 0, 0);
    },

    drawOnCanvasHSL: function(width, height, gradient, canvasId) {

        canvasId = canvasId || 'canvas';

        var canvas = document.getElementById(canvasId);
        var ctx = canvas.getContext('2d');
        var imageData  = ctx.createImageData(width, height);
        var buffer = imageData.data.buffer;
        var uint32View = new Uint32Array(buffer);
        var uint8CView = new Uint8ClampedArray(buffer);

        canvas.width = width;
        canvas.height = height;

        for(var x = 0; x < width; x++) {

            for(var y = 0; y < height; y++) {

                var hsl = gradient(x, y);
                var rgb = colorutil.hsl.to.rgb(hsl);

                uint32View[y * width + x] = colorutil.rgb.to.intabgr(rgb);
            }
        }

        imageData.data.set(uint8CView);

        ctx.putImageData(imageData, 0, 0);
    }

}