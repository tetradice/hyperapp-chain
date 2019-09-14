"use strict";

export function chainHandler(baseDispatch) {
    var newDispatch = function (target, props) {
        if (typeof target === 'object' && target['__chained__']) {
            var lastReturn;
            for(var i = 0; i < target.actions.length; i++){
                lastReturn = newDispatch(target.actions[i], props);
            }
            return lastReturn;
        } else {
            return baseDispatch(target, props);
        }
    }

    return newDispatch;
}

export function chain(){
    var args = [];
    for (var i = 0; i < arguments.length; i++){
        args[i] = arguments[i];
    }
    return {__chained__: true, actions: args};
}