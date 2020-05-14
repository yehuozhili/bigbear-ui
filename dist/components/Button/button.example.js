import React, { useEffect } from 'react';
import Button from './button';
import { useState } from 'react';
function SwichButtonType() {
    var _a = useState(false), state = _a[0], setState = _a[1];
    return (React.createElement(Button, { btnType: state ? 'neu-w-down' : 'neu-w-up', onClick: function () { return setState(!state); } }, "SwichButtonType"));
}
export default SwichButtonType;
export function FastSwitchBttonType() {
    var _a = useState(false), state = _a[0], setState = _a[1];
    var downReplace = function () { return (setState(true)); };
    var upReplace = function () { return (setState(false)); };
    useEffect(function () {
        var ref = document.querySelector('.fastswitch');
        if (ref) {
            ref.addEventListener('mousedown', downReplace);
            ref.addEventListener('mouseup', upReplace);
        }
        return function () {
            ref === null || ref === void 0 ? void 0 : ref.removeEventListener('mouseup', upReplace);
            ref === null || ref === void 0 ? void 0 : ref.removeEventListener('mousedown', downReplace);
        };
    }, []);
    return (React.createElement(Button, { btnType: state ? 'neu-w-down' : 'neu-w-fl', className: 'fastswitch' }, "FastSwitchBttonType"));
}
