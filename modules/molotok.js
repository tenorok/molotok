definer.export('molotok', /** @exports molotok */ function(
        is, string, number, array, object, functions
    ) {

    return {
        is: is,
        string: string,
        number: number,
        array: array,
        object: object,
        functions: functions
    };

});
