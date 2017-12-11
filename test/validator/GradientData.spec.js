
import sinon from 'sinon';
import chai from 'chai';
import GradientData from '../../src/gradientData/GradientData.js';
import _ from '../../src/Utils';

chai.should();
let expect = require('chai').expect;

let defaultColor = {r: 0, g: 0, b: 0, a: 255};

describe('GradientData', () => {

    describe('constructor', () => {

        it('should not accept invalida data structures', () => {

            expect(() => {
                new GradientData([]);
            }).to.throw('Argument should be and array with at least one item');

            expect(() => {
                new GradientData({});
            }).to.throw('Argument should be and array with at least one item');

            expect(() => {
                new GradientData([{colors:{}}]);
            }).to.throw('One sample was tested and it did not match any supported data structure');

            expect(() => {
                new GradientData([{colors:[]}]);
            }).to.throw('One sample was tested and it did not match any supported data structure');

            expect(() => {
                new GradientData([[]]);
            }).to.throw('One sample was tested and it did not match any supported data structure');
        });

        it('should return type flat1d', () => {

            let data = [{}];

            new GradientData(data).typeName.should.equal('flat1d');

            data = [{x: 0}]

            new GradientData(data).typeName.should.equal('flat1d');
        });

        it('should return type object2d', () => {

            let data = [{
                colors:[{}]
            }];

            new GradientData(data).typeName.should.equal('object2d');

            data = [{
                y: 0,
                colors:[{x: 0}]
            }];

            new GradientData(data).typeName.should.equal('object2d');
        });

        it('should return type array2d', () => {

            let data = [[{}]];

            new GradientData(data).typeName.should.equal('array2d');

            data = [[{x: 0}]];

            new GradientData(data).typeName.should.equal('array2d');
        });

        it('should return type flat2d', () => {

            let data = [{x: 0, y: 0}];

            new GradientData(data).typeName.should.equal('flat2d');
        });
    });

    describe('verify', () => {

        describe('type object2d', () => {

            it('should accept structures', () => {

                verify([{}])
                    .should.equal(true);

                verify([{}, {}])
                    .should.equal(true);
            });

            it('should not accept structures', () => {

                expect(() => {
                    verify([{}, {colors:{}}]);
                }).to.throw('Color data structure is not consistent / valid');

                expect(() => {
                    verify([{}, 1]);
                }).to.throw('Color data structure is not consistent / valid');

                expect(() => {
                    verify([{}, []]);
                }).to.throw('Color data structure is not consistent / valid');
            });
        });

        describe('type flat2d', () => {

            it('should accept structures', () => {

                verify([{x: 0, y: 0}])
                    .should.equal(true);

                verify([{x: 0, y: 0}, {x: 1, y: 1}])
                    .should.equal(true);
            });

            it('should not accept structures', () => {

                expect(() => {
                    verify([{x:0, y:0}, {colors:{}}]);
                }).to.throw('Color data structure is not consistent / valid');

                expect(() => {
                    verify([{x:0, y:0}, 1]);
                }).to.throw('Color data structure is not consistent / valid');

                expect(() => {
                    verify([{x:0, y:0}, []]);
                }).to.throw('Color data structure is not consistent / valid');
            });
        });

        function verify(data) {

            let gradientData = new GradientData(data);

            return gradientData.verify(data);
        }
    });

    describe('conversions', () => {

        let color1, color2, color3, color4;
        let dataArray2d3x3;

        beforeEach(() => {

            color1 = {r: 1, g: 2, b: 3, a: 4};
            color2 = {r: 11, g: 22, b: 33, a: 44};
            color3 = {r: 111, g: 222, b: 333, a: 444};
            color4 = {r: 1111, g: 2222, b: 3333, a: 4444};

            dataArray2d3x3 = [
                [
                    color1, color2, color3
                ],
                [
                    color1, color2, color3
                ],
                [
                    color1, color2, color3
                ]
            ];
        });

        describe('quick test for supported conversion directions and default colors', () => {

            const emptyObject2d = [{colors:[{}]}];
            const emptyArray2d = [[{}]];
            const emptyFlat2d = [{y:0}];
            const emptyFlat1d = [{}];

            it('object2d -> object2d', () => {

                let data = new GradientData(emptyObject2d, defaultColor).object2d;

                verifyObject2d(data);
            });

            it('object2d -> array2d', () => {

                let data = new GradientData(emptyObject2d, defaultColor).array2d;

                verifyArray2d(data);
            });

            it('object2d -> flat2d', () => {

                let data = new GradientData(emptyObject2d, defaultColor).flat2d;

                verifyFlat2d(data);
            });

            it('object2d -> flat1d', () => {

                let data = new GradientData(emptyObject2d, defaultColor).flat1d;

                verifyFlat1dFromMatrix(data);
            });

            it('array2d -> object2d', () => {

                let data = new GradientData(emptyArray2d, defaultColor).object2d;

                verifyObject2d(data);
            });

            it('array2d -> array2d', () => {

                let data = new GradientData(emptyArray2d, defaultColor).array2d;

                verifyArray2d(data);
            });

            it('array2d -> flat2d', () => {

                let data = new GradientData(emptyArray2d, defaultColor).flat2d;

                verifyFlat2d(data);
            });

            it('array2d -> flat1d', () => {

                let data = new GradientData(emptyArray2d, defaultColor).flat1d;

                verifyFlat1dFromMatrix(data);
            });

            it('flat2d -> object2d', () => {

                let data = new GradientData(emptyFlat2d, defaultColor).object2d;

                verifyObject2d(data);
            });

            it('flat2d -> array2d', () => {

                let data = new GradientData(emptyFlat2d, defaultColor).array2d;

                verifyArray2d(data);
            });

            it('flat2d -> flat2d', () => {

                let data = new GradientData(emptyFlat2d, defaultColor).flat2d;

                verifyFlat2d(data);
            });

            it('flat2d -> flat1d', () => {

                let data = new GradientData(emptyFlat2d, defaultColor).flat1d;

                verifyFlat1dFromMatrix(data);
            });

            it('flat1d -> object2d', () => {

                let data = new GradientData(emptyFlat1d, defaultColor).object2d;

                verifyObject2d(data);
            });

            it('flat1d -> array2d', () => {

                let data = new GradientData(emptyFlat1d, defaultColor).array2d;

                verifyArray2d(data);
            });

            it('flat1d -> flat2d', () => {

                let data = new GradientData(emptyFlat1d, defaultColor).flat2d;

                verifyFlat2d(data);
            });

            it('flat1d -> flat1d', () => {

                let data = new GradientData(emptyFlat1d, defaultColor).flat1d;

                verifyFlat1d(data);
            });

            function verifyObject2d(data) {

                data.length.should.equal(2);
                data[0].colors.length.should.equal(2);
                data[1].colors.length.should.equal(2);
                data[0].colors[0].r.should.equal(0);
            }

            function verifyArray2d(data) {

                data.length.should.equal(2);
                data[0].length.should.equal(2);
                data[1].length.should.equal(2);
                data[0][0].r.should.equal(0);
            }

            function verifyFlat2d(data) {

                data.length.should.equal(4);
                data[0].r.should.equal(0);
            }

            function verifyFlat1d(data) {

                data.length.should.equal(2);
                data[0].r.should.equal(0);
            }

            function verifyFlat1dFromMatrix(data) {

                data.length.should.equal(4);
                data[0].r.should.equal(0);
            }
        });

        describe('flat1d', () => {

            describe('-> flat1d', () => {

                it('should add stops for 1 point gradient', () => {

                    let data = getDataFlat1d([color1]);

                    data.length.should.equal(2);
                    data[0].x.should.equal(0);
                    data[1].x.should.equal(1);

                    // verify new point is created with same identical colors
                    data[0].r.should.equal(1);
                    data[1].r.should.equal(1);
                });

                it('should add stops for 2 point gradient', () => {

                    let data = getDataFlat1d([{}, {}]);

                    data.length.should.equal(2);
                    data[0].x.should.equal(0);
                    data[1].x.should.equal(1);
                });

                it('should add stops for 3 point gradient', () => {

                    let data = getDataFlat1d([{}, {}, {}]);

                    data.length.should.equal(3);
                    data[0].x.should.equal(0);
                    data[1].x.should.equal(0.5);
                    data[2].x.should.equal(1);
                });

                it('should add stops for 4 point gradient', () => {

                    let data = getDataFlat1d([{}, {}, {}, {}]);

                    data.length.should.equal(4);
                    data[0].x.should.equal(0);
                    data[1].x.should.equal(1/3);
                    data[2].x.should.equal(2/3);
                    data[3].x.should.equal(1);
                });

                it('should add missing stops (end-stops missing)', () => {

                    let data = getDataFlat1d([color1, {x: 0.4}, color2]);

                    data.length.should.equal(3);
                    data[0].x.should.equal(0);
                    data[1].x.should.equal(0.4);
                    data[2].x.should.equal(1);

                    data[0].r.should.equal(1);
                    expect(data[1].r).to.equal(undefined);
                    data[2].r.should.equal(11);
                });

                it('should add missing stops (end-stops + 1 missing)', () => {

                    let data = getDataFlat1d([color1, color2, {x: 0.2}, color3, color4]);

                    data.length.should.equal(5);
                    data[0].x.should.equal(0);
                    data[1].x.should.equal(0.1);
                    data[2].x.should.equal(0.2);
                    data[3].x.should.equal(0.2 + 0.4);
                    data[4].x.should.equal(1);

                    data[0].r.should.equal(1);
                    data[1].r.should.equal(11);
                    expect(data[2].r).to.equal(undefined);
                    data[3].r.should.equal(111);
                    data[4].r.should.equal(1111);
                });

                it('should add missing stops (end-colors missing)', () => {

                    let data = getDataFlat1d([{x: 0.2, r: 1}, color2, {x: 0.8, r: 111}]);

                    data.length.should.equal(5);
                    data[0].x.should.equal(0);
                    data[1].x.should.equal(0.2);
                    data[2].x.should.equal(0.5);
                    data[3].x.should.equal(0.8);
                    data[4].x.should.equal(1);

                    data[0].r.should.equal(1);
                    data[1].r.should.equal(1);
                    data[2].r.should.equal(11);
                    data[3].r.should.equal(111);
                    data[4].r.should.equal(111);
                });

                it('should not change anything', () => {

                    color1.x = 0;
                    color2.x = 0.2;
                    color3.x = 1;

                    let data = getDataFlat1d([color1, color2, color3]);

                    data.length.should.equal(3);
                    data[0].x.should.equal(0);
                    data[1].x.should.equal(0.2);
                    data[2].x.should.equal(1);

                    data[0].r.should.equal(1);
                    data[1].r.should.equal(11);
                    data[2].r.should.equal(111);
                });

                it('should add missing color components', () => {

                    let data = new GradientData([{}], defaultColor).flat1d;

                    data.length.should.equal(2);
                    data[0].r.should.equal(0);
                    data[0].g.should.equal(0);
                    data[0].b.should.equal(0);
                    data[0].a.should.equal(255);
                });
            });

            describe('conversion to other types', () => {

                it('-> object2d', () => {

                    let data = new GradientData([color1, color2, color3]).object2d;

                    data.length.should.equal(2);

                    data[0].y.should.equal(0);
                    data[1].y.should.equal(1);

                    data[0].colors.length.should.equal(3);
                    data[1].colors.length.should.equal(3);

                    data[0].colors[0].x.should.equal(0);
                    data[0].colors[1].x.should.equal(0.5);
                    data[0].colors[2].x.should.equal(1);
                    data[1].colors[0].x.should.equal(0);
                    data[1].colors[1].x.should.equal(0.5);
                    data[1].colors[2].x.should.equal(1)

                    // verify new point is created with same identical colors
                    data[0].colors[0].r.should.equal(1);
                    data[0].colors[1].r.should.equal(11);
                    data[0].colors[2].r.should.equal(111);
                });

                it('-> array2d', () => {

                    let data = new GradientData([color1, color2, color3]).array2d;

                    data.length.should.equal(2);

                    data[0][0].x.should.equal(0);
                    data[0][1].x.should.equal(0.5);
                    data[0][2].x.should.equal(1);
                    data[1][0].x.should.equal(0);
                    data[1][1].x.should.equal(0.5);
                    data[1][2].x.should.equal(1)
                });

                it('-> flat2d', () => {

                    let data = new GradientData([color1, color2, color3]).flat2d;

                    data.length.should.equal(6);

                    data[0].x.should.equal(0);
                    data[1].x.should.equal(0.5);
                    data[2].x.should.equal(1);
                    data[3].x.should.equal(0);
                    data[4].x.should.equal(0.5);
                    data[5].x.should.equal(1);

                    data[0].y.should.equal(0);
                    data[1].y.should.equal(0);
                    data[2].y.should.equal(0);
                    data[3].y.should.equal(1);
                    data[4].y.should.equal(1);
                    data[5].y.should.equal(1);
                });
            });
        });

        describe('object2d', () => {

            describe('-> object2d', () => {

                it('should add stops for 1 point 1 row gradient', () => {

                    let data = getDataObject2d([
                        {
                            colors: [color1]
                        }
                    ]);

                    verifyObject2d1x1(data);
                });

                it('should add stops for 3 point 3 row gradient', () => {

                    let data = getDataObject2d([
                        {
                            colors: [color1, color2, color3]
                        },
                        {
                            colors: [color1, color2, color3]
                        },
                        {
                            colors: [color1, color2, color3]
                        }
                    ]);

                    verifyObject2d3x3(data);
                });

                it('should add missing stops (end-stops missing)', () => {

                    color2.x = 0.4;

                    let data = getDataObject2d([
                        {
                            colors: [color1, color2, color3]
                        },
                        {
                            y: 0.4,
                            colors: [color1, color2, color3]
                        },
                        {
                            colors: [color1, color2, color3]
                        }
                    ]);

                    verifyObject2d3x3WithMissingEndPoints(data);
                });

                it('should add default color components', () => {
                    let data = getDataObject2d([
                        {
                            colors: [{}, {}, {}]
                        },
                        {
                            colors: [{}, {}, {}]
                        }
                    ]);

                    data[0].colors[0].r.should.equal(0);
                    data[0].colors[0].a.should.equal(255);
                    data[1].colors[0].r.should.equal(0);
                    data[1].colors[0].a.should.equal(255);
                });
            });

            describe('conversion to other types', () => {

                it('-> flat1d', () => {

                    let data = new GradientData([
                        {
                            colors: [color1, color2, color3]
                        },
                        {
                            colors: [color1, color2, color3]
                        },
                        {
                            colors: [color1, color2, color3]
                        }
                    ], defaultColor).flat1d;

                    data.length.should.equal(9);

                    data[0].r.should.equal(1);
                    data[1].r.should.equal(11);
                    data[3].r.should.equal(1);

                    expect(data[0].x).to.be.undefined;
                    expect(data[1].x).to.be.undefined;
                    expect(data[3].x).to.be.undefined;
                });

                it('-> array2d', () => {

                    let data = [
                        {
                            colors: [color1, color2, color3]
                        },
                        {
                            colors: [color1, color2, color3]
                        },
                        {
                            colors: [color1, color2, color3]
                        }
                    ];

                    let newData = new GradientData(data, defaultColor).array2d;

                    verifyArray2d3x3(newData);
                });

                it('-> flat2d', () => {

                    let data = [
                        {
                            colors: [color1, color2, color3]
                        },
                        {
                            colors: [color1, color2, color3]
                        },
                        {
                            colors: [color1, color2, color3]
                        }
                    ];

                    let newData = new GradientData(data, defaultColor).flat2d;

                    verifyFlat2d3x3(newData);
                });
            });
        });

        describe('array2d ', () => {

            describe('-> object2d', () => {

                it('should add stops for 1 point 1 row gradient', () => {

                    let data = getDataObject2d([
                        [
                            color1
                        ]
                    ]);

                    verifyObject2d1x1(data);
                });

                it('should add stops for 3 point 3 row gradient', () => {

                    let data = getDataObject2d([
                        [
                            color1, color2, color3
                        ],
                        [
                            color1, color2, color3
                        ],
                        [
                            color1, color2, color3
                        ]
                    ]);

                    verifyObject2d3x3(data);
                });

                it('should add missing stops (end-stops missing)', () => {

                    color2.x = 0.4;

                    let row1 = [color1, color2, color3];
                    let row2 = [color1, color2, color3];
                    let row3 = [color1, color2, color3];

                    row2.y = 0.4;

                    let data = getDataObject2d([
                        row1, row2, row3
                    ]);

                    verifyObject2d3x3WithMissingEndPoints(data);
                });
            });
        });

        describe('flat2d -> object2d', () => {

            it('should add stops for 1 point 1 row gradient', () => {

                color1.y = 0;

                let data = getDataObject2d([
                    color1
                ]);

                verifyObject2d1x1(data);
            });

            it('should add stops for 3 point 3 row gradient', () => {

                let color4 = _.clone(color1);
                let color5 = _.clone(color2);
                let color6 = _.clone(color3);

                let color7 = _.clone(color1);
                let color8 = _.clone(color2);
                let color9 = _.clone(color3);

                color1.y = 0;
                color2.y = 0;
                color3.y = 0;

                color4.y = 0.5;
                color5.y = 0.5;
                color6.y = 0.5;

                color7.y = 1;
                color8.y = 1;
                color9.y = 1;

                let data = getDataObject2d([
                    color1, color2, color3,
                    color4, color5, color6,
                    color7, color8, color9
                ]);

                verifyObject2d3x3(data);
            });

            it('should add missing stops (end-stops missing)', () => {

                let color4 = _.clone(color1);
                let color5 = _.clone(color2);
                let color6 = _.clone(color3);

                let color7 = _.clone(color1);
                let color8 = _.clone(color2);
                let color9 = _.clone(color3);

                color2.x = 0.4;
                color5.x = 0.4;
                color8.x = 0.4;

                color4.y = 0.4;

                color7.y = 1;

                let data = getDataObject2d([
                    color1, color2, color3,
                    color4, color5, color6,
                    color7, color8, color9
                ]);

                verifyObject2d3x3WithMissingEndPoints(data);
            });
        });

        function getDataFlat1d(data) {

            let gradientData = new GradientData(data);

            return gradientData.flat1d;
        }

        function getDataObject2d(data) {

            let gradientData = new GradientData(data, defaultColor);

            return gradientData.object2d;
        }

        function verifyObject2d1x1(data) {

            data.length.should.equal(2);

            data[0].y.should.equal(0);
            data[1].y.should.equal(1);

            data[0].colors.length.should.equal(2);
            data[1].colors.length.should.equal(2);

            data[0].colors[0].x.should.equal(0);
            data[0].colors[1].x.should.equal(1);
            data[1].colors[0].x.should.equal(0);
            data[1].colors[1].x.should.equal(1);

            // verify new point is created with same identical colors
            data[0].colors[0].r.should.equal(1);
            data[0].colors[1].r.should.equal(1);
            data[1].colors[0].r.should.equal(1);
            data[1].colors[1].r.should.equal(1);
        }

        function verifyObject2d3x3(data) {

            data.length.should.equal(3);

            data[0].y.should.equal(0);
            data[1].y.should.equal(0.5);
            data[2].y.should.equal(1);

            data[0].colors.length.should.equal(3);
            data[1].colors.length.should.equal(3);
            data[2].colors.length.should.equal(3);

            data[0].colors[0].x.should.equal(0);
            data[0].colors[1].x.should.equal(0.5);
            data[0].colors[2].x.should.equal(1);
            data[1].colors[0].x.should.equal(0);
            data[1].colors[1].x.should.equal(0.5);
            data[1].colors[2].x.should.equal(1);

            // verify new point is created with same identical colors
            data[0].colors[0].r.should.equal(1);
            data[0].colors[1].r.should.equal(11);
            data[0].colors[2].r.should.equal(111);
            data[1].colors[0].r.should.equal(1);
            data[1].colors[1].r.should.equal(11);
            data[1].colors[2].r.should.equal(111);
        }

        function verifyArray2d3x3(data) {

            data.length.should.equal(3);

            data[0].length.should.equal(3);
            data[1].length.should.equal(3);
            data[2].length.should.equal(3);

            data[0][0].x.should.equal(0);
            data[0][1].x.should.equal(0.5);
            data[0][2].x.should.equal(1);
            data[1][0].x.should.equal(0);
            data[1][1].x.should.equal(0.5);
            data[1][2].x.should.equal(1);

            // verify new point is created with same identical colors
            data[0][0].r.should.equal(1);
            data[0][1].r.should.equal(11);
            data[0][2].r.should.equal(111);
            data[1][0].r.should.equal(1);
            data[1][1].r.should.equal(11);
            data[1][2].r.should.equal(111);
        }

        function verifyFlat2d3x3(data) {

            data.length.should.equal(9);

            data[0].x.should.equal(0);
            data[1].x.should.equal(0.5);
            data[2].x.should.equal(1);
            data[3].x.should.equal(0);
            data[4].x.should.equal(0.5);
            data[5].x.should.equal(1);

            data[0].y.should.equal(0);
            data[1].y.should.equal(0);
            data[2].y.should.equal(0);
            data[3].y.should.equal(0.5);
            data[4].y.should.equal(0.5);
            data[5].y.should.equal(0.5);
            data[6].y.should.equal(1);
            data[7].y.should.equal(1);
            data[8].y.should.equal(1);

            // verify new point is created with same identical colors
            data[0].r.should.equal(1);
            data[1].r.should.equal(11);
            data[2].r.should.equal(111);
            data[3].r.should.equal(1);
            data[4].r.should.equal(11);
            data[5].r.should.equal(111);
        }

        function verifyObject2d3x3WithMissingEndPoints(data) {

            data.length.should.equal(3);

            data[0].y.should.equal(0);
            data[1].y.should.equal(0.4);
            data[2].y.should.equal(1);

            data[0].colors.length.should.equal(3);
            data[1].colors.length.should.equal(3);
            data[2].colors.length.should.equal(3);

            data[0].colors[0].x.should.equal(0);
            data[0].colors[1].x.should.equal(0.4);
            data[0].colors[2].x.should.equal(1);
            data[1].colors[0].x.should.equal(0);
            data[1].colors[1].x.should.equal(0.4);
            data[1].colors[2].x.should.equal(1);

            // verify new point is created with same identical colors
            data[0].colors[0].r.should.equal(1);
            data[0].colors[1].r.should.equal(11);
            data[0].colors[2].r.should.equal(111);
            data[1].colors[0].r.should.equal(1);
            data[1].colors[1].r.should.equal(11);
            data[1].colors[2].r.should.equal(111);
        }

        function validate(data) {

            let validator = new GradientData(data);

            return validator.validate(data);
        }
    });
});
