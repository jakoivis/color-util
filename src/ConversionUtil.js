

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

        // indirect conversion (rgb -> hsl subtype, rgb subtype -> hsl ...)
        // e.g. hslString -> hex, hslString -> rgbString
        let path = this._getConversionPath(type, targetType, availableTypes);

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

    static _getConversionPath(type, targetType, availableTypes) {
        let sourcePath = this._getPathToRoot(type);
        let targetPath = this._getPathToRoot(targetType).reverse();

        // link the two paths

        let sourceRootType = sourcePath[sourcePath.length-1];
        let targetRootType = targetPath[0];
        let rootTypesAreLinked = typeof sourceRootType.to[targetRootType.name] === 'function';

        if (!rootTypesAreLinked) {

            // sourcePath[sourcePath.length-1].nextType = targetPath[0].type;
            // targetPath.shift();

        // } else {
        //     // root types are not convertible between each other
        //     // find a detour path

        //     let detourType = this._getRootTypeWithFunction(targetRootType, availableTypes);

        //     if (!detourType) {
        //         throw new Error('Color cannot be converted. This is most likely a bug');
        //     }

        //     sourcePath[sourcePath.length-1].nextType = detourType;
        //     sourcePath.push({
        //         type: detourType,
        //         nextType: targetPath[0].type
        //     });
        //     targetPath.shift();
        // } else {

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

        // return combined.map(item => item.type.to[item.nextType.name]);
        // return combined.map(type => type.to[item.nextType.name]);

        return result;
    }

    static _getPathToRoot(type, path=[]) {

        path.push(type);

        if (type.parent) {

            return this._getPathToRoot(type.parent, path);
        }

        return path;
    }

    // static _getPathToRootReverse(type, path=[]) {

    //     if(type.parent) {
    //         path.push({
    //             type: type.parent,
    //             nextType: type
    //         });

    //         return this._getPathToRootReverse(type.parent, path);
    //     }

    //     path.push({
    //         type: type
    //     });

    //     return path.reverse();
    // }

    static _getRootTypeWithFunction(targetType, availableTypes) {

        for(let type of availableTypes) {

            if(!type.parent && typeof type.to[targetType.name] === 'function') {

                return type;
            }
        }

        return null;
    }
}
