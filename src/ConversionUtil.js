

export default class {

    static convert(colors, ...conversionFunctions) {

        if (Array.isArray(colors)) {

            return colors.map(item => {

                return this.convert(item, ...conversionFunctions);
            });
        }

        return conversionFunctions.reduce((acc, fn) => {

            return fn(acc);
        }, colors);
    }

    static convertAny(color, targetType, availableTypes) {

        let type = this.getColorType(color, availableTypes);

        if (!type || type === targetType) {

            return color;
        }

        // direct conversion e.g. int -> hex, hsl -> hslString
        if (typeof type.to[targetType.name] === 'function') {

            return type.to[targetType.name](color);
        }

        // indirect conversion e.g. hslString -> hex, hslString -> rgbString
        let path = this._getConversionPathThroughParentType(type, targetType, availableTypes);

        return this.convert(color, ...path);
    }

    static getColorType(color, types) {

        for (let type of types) {

            if (type.test(color)) {

                return type;
            }
        }

        return null;
    }

    static _getConversionPathThroughParentType(type, targetType, availableTypes) {

        let sourcePath = this._getPathToRoot(type);
        let targetPath = this._getPathToRoot(targetType).reverse();
        let sourceRootType = sourcePath[sourcePath.length-1];
        let targetRootType = targetPath[0];
        let rootTypesAreSame = sourceRootType === targetRootType;
        let rootTypesAreLinked = typeof sourceRootType.to[targetRootType.name] === 'function';

        if (rootTypesAreSame) {

            // remove first
            targetPath.shift();

        } else if (!rootTypesAreLinked) {

            throw new Error('Path should be implemented from ' +
                sourceRootType.name + ' to ' + targetRootType.name);
        }

        let combined = sourcePath.concat(targetPath);
        let result = [];
        let currentType, nextType;

        for (let i = 0; i < combined.length; i++) {

            currentType = combined[i];
            nextType = combined[i+1];

            if (nextType) {

                result.push(currentType.to[nextType.name]);
            }
        }

        return result;
    }

    static _getPathToRoot(type, path=[]) {

        path.push(type);

        if (type.parent) {

            return this._getPathToRoot(type.parent, path);
        }

        return path;
    }
}
