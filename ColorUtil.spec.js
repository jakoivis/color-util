
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

    describe("getGradientColor", () => {

        it("should get color from 2 point gradient", () => {
            ColorUtil.getGradientColor([0x00FF7F, 0xFF00FF], 0)
                .should.equal(0x00FF7F);
            ColorUtil.getGradientColor([0x00FF7F, 0xFF00FF], 1)
                .should.equal(0xFF00FF);
            ColorUtil.getGradientColor([0x00FF7F, 0xFF00FF], 0.25)
                .should.equal(0x3FBF9F);
            ColorUtil.getGradientColor([0x00FF7F, 0xFF00FF], 0.5)
                .should.equal(0x7F7FBF);
            ColorUtil.getGradientColor([0x00FF7F, 0xFF00FF], 0.75)
                .should.equal(0xBF3FDF);
        });

        it("should get color from 3 point gradient", () => {
            ColorUtil.getGradientColor([0x000000, 0x7F7F7F, 0xFFFFFF], 0)
                .should.equal(0x0);
            ColorUtil.getGradientColor([0x000000, 0x7F7F7F, 0xFFFFFF], 1)
                .should.equal(0xFFFFFF);
            ColorUtil.getGradientColor([0x000000, 0x7F7F7F, 0xFFFFFF], 0.25)
                .should.equal(0x3F3F3F);
            ColorUtil.getGradientColor([0x000000, 0x7F7F7F, 0xFFFFFF], 0.5)
                .should.equal(0x7F7F7F);
            ColorUtil.getGradientColor([0x000000, 0x7F7F7F, 0xFFFFFF], 0.75)
                .should.equal(0xBFBFBF);
        });

        it("should get color from 4 point gradient", () => {
            ColorUtil.getGradientColor([0xFFFFFF, 0x0, 0x0, 0x0], 0)
                .should.equal(0xFFFFFF); // first color
            ColorUtil.getGradientColor([0x0, 0x0, 0x0, 0xFFFFFF], 1)
                .should.equal(0xFFFFFF); // last color
            ColorUtil.getGradientColor([0x0, 0xFFFFFF, 0x7F7F7F, 0x7F7F7F], 0.25)
                .should.equal(0xBFBFBF); // 75% between colors 0 and 1
            ColorUtil.getGradientColor([0x0, 0xFFFFFF, 0x7F7F7F, 0x0], 0.5)
                .should.equal(0xBFBFBF); // 50% beween colors 1 and 2
            ColorUtil.getGradientColor([0x0, 0x0, 0x7F7F7F, 0xFFFFFF], 0.75)
                .should.equal(0x9F9F9F); // 25% between colors 2 and 3
        });
    });
});