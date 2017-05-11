
require("chai").should();

var ColorUtil = require("./ColorUtil");

describe("ColorUtil", () => {

    describe("rgbToDec", () => {

        it("should convert correctly", () => {
            ColorUtil.rgbToDec(171, 205, 239).should.equal(11259375);
        });
    });

    describe("decToRgbObject", () => {

        it("should convert correctly", () => {
            var color = ColorUtil.decToRgbObject(11259375);

            color.r.should.equal(171);
            color.g.should.equal(205);
            color.b.should.equal(239);
        });
    });

    describe("decAvgBrightness", () => {

        it("should convert correctly", () => {
            ColorUtil.decAvgBrightness(0xffffff).should.equal(1);
            ColorUtil.decAvgBrightness(0x0).should.equal(0);
            ColorUtil.decAvgBrightness(0x00ff00).should.be.closeTo(0.333, 0.01);
            ColorUtil.decAvgBrightness(0x7f007f).should.be.closeTo(0.333, 0.01);
        });
    });

    describe("randomColor", () => {

        it("should convert correctly", () => {
        });
    });
});