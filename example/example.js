
let example = {

    drawOnCanvas: function(width, height, gradient, canvasId) {

        canvasId = canvasId || 'canvas';

        let canvas = document.getElementById(canvasId);
        let ctx = canvas.getContext('2d');
        let imageData  = ctx.createImageData(width, height);
        let buffer = imageData.data.buffer;
        let uint32View = new Uint32Array(buffer);
        let uint8CView = new Uint8ClampedArray(buffer);

        canvas.width = width;
        canvas.height = height;

        for(let x = 0; x < width; x++) {

            for(let y = 0; y < height; y++) {

                let rgb = gradient(x, y);

                uint32View[y * width + x] = colorutil.rgb.to.intabgr(rgb);
            }
        }

        imageData.data.set(uint8CView);

        ctx.putImageData(imageData, 0, 0);
    },

    drawOnCanvasHSV: function(width, height, gradient, canvasId) {

        canvasId = canvasId || 'canvas';

        let canvas = document.getElementById(canvasId);
        let ctx = canvas.getContext('2d');
        let imageData  = ctx.createImageData(width, height);
        let buffer = imageData.data.buffer;
        let uint32View = new Uint32Array(buffer);
        let uint8CView = new Uint8ClampedArray(buffer);

        canvas.width = width;
        canvas.height = height;

        for(let x = 0; x < width; x++) {

            for(let y = 0; y < height; y++) {

                let hsv = gradient(x, y);
                let rgb = colorutil.hsv.to.rgb(hsv);

                uint32View[y * width + x] = colorutil.rgb.to.intabgr(rgb);
            }
        }

        imageData.data.set(uint8CView);

        ctx.putImageData(imageData, 0, 0);
    },

    drawOnCanvasHSL: function(width, height, gradient, canvasId) {

        canvasId = canvasId || 'canvas';

        let canvas = document.getElementById(canvasId);
        let ctx = canvas.getContext('2d');
        let imageData  = ctx.createImageData(width, height);
        let buffer = imageData.data.buffer;
        let uint32View = new Uint32Array(buffer);
        let uint8CView = new Uint8ClampedArray(buffer);

        canvas.width = width;
        canvas.height = height;

        for(let x = 0; x < width; x++) {

            for(let y = 0; y < height; y++) {

                let hsl = gradient(x, y);
                let rgb = colorutil.hsl.to.rgb(hsl);

                uint32View[y * width + x] = colorutil.rgb.to.intabgr(rgb);
            }
        }

        imageData.data.set(uint8CView);

        ctx.putImageData(imageData, 0, 0);
    }

}