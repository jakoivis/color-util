

export { convert, callConverter };

function convert(colors, ...conversionFunctions) {
    if (Array.isArray(colors)) {
        return colors.map(item => {
            return convert(item, ...conversionFunctions);
        });
    }

    return conversionFunctions.reduce((acc, fn) => {
        return fn(acc);
    }, colors);
}

function callConverter(targetType, color, availableTypes) {
    let type = getColorType(color, availableTypes);

    if (!type) {
        throw new Error(`Color '${color}' notation doesn't match any notation`);
    }

    // no need to convert anything
    if (type === targetType) {
        return color;
    }

    // direct conversion within a color format (rgb, hsl hsv...)
    // e.g. int -> hex, hsl -> hslString
    if (typeof type['to'+targetType.name] === 'function') {
        
        return type['to'+targetType.name](color);
    }

    // indirect conversion (rgb -> hsl subtype, rgb subtype -> hsl ...)
    // e.g. hslString -> hex, hslString -> rgbString
    let path = getConversionPath(type, targetType, availableTypes);

    return convert(color, ...path);
}

function getColorType(color, types) {
    for (let type of types) {
        if (type.test(color)) {
            return type;
        }
    }

    return null;
}

function getConversionPath(type, targetType, availableTypes) {
    let sourcePath = getPathToRoot(type);
    let targetPath = getPathToRootReverse(targetType);

    // link the two paths

    let sourceRootType = sourcePath[sourcePath.length-1].type;
    let targetRootType = targetPath[0].type;

    if (typeof sourceRootType['to'+targetRootType.name] === 'function') {
        sourcePath[sourcePath.length-1].nextType = targetPath[0].type;
        targetPath.shift();

    } else {
        // root types are not convertible between each other
        // find a detour path

        let detourType = getRootTypeWithFunction(targetRootType, availableTypes);

        if (!detourType) {
            throw new Error('Color cannot be converted. This is most likely a bug');
        }

        sourcePath[sourcePath.length-1].nextType = detourType;
        sourcePath.push({
            type: detourType,
            nextType: targetPath[0].type
        });
        targetPath.shift();
    }

    let combined = sourcePath.concat(targetPath);

    return combined.map(item => item.type['to'+item.nextType.name]);
}

function getPathToRoot(type, path=[]) {
    if(type.parent) {
        path.push({
            type: type,
            nextType: type.parent
        });

        return getPathToRoot(type.parent, path);
    }

    path.push({
        type: type
    });

    return path;
}

function getPathToRootReverse(type, path=[]) {

    if(type.parent) {
        path.push({
            type: type.parent,
            nextType: type
        });

        return getPathToRootReverse(type.parent, path);
    }

    path.push({
        type: type
    });

    return path.reverse();
}

function getRootTypeWithFunction(targetType, availableTypes) {
    let conversionFnName = 'to'+targetType.name;

    for(let type of availableTypes) {
        if(!type.parent && typeof type[conversionFnName] === 'function') {
            return type;
        }
    }

    return null;
}
