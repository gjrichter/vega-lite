"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var channel_1 = require("../../channel");
var fielddef_1 = require("../../fielddef");
var scale_1 = require("../../scale");
var type_1 = require("../../type");
var util_1 = require("../../util");
var common_1 = require("../common");
var config_1 = require("./config");
function labels(model, channel, specifiedLabelsSpec, orient) {
    var fieldDef = model.fieldDef(channel) ||
        (channel === 'x' ? model.fieldDef('x2') :
            channel === 'y' ? model.fieldDef('y2') :
                undefined);
    var axis = model.axis(channel);
    var config = model.config;
    var labelsSpec = {};
    // Text
    if (fielddef_1.isTimeFieldDef(fieldDef)) {
        var isUTCScale = model.getScaleComponent(channel).get('type') === scale_1.ScaleType.UTC;
        labelsSpec.text = {
            signal: common_1.timeFormatExpression('datum.value', fieldDef.timeUnit, axis.format, config.axis.shortTimeLabels, config.timeFormat, isUTCScale)
        };
    }
    // Label Angle
    var angle = config_1.getAxisConfig('labelAngle', model.config, channel, orient, model.getScaleComponent(channel).get('type'));
    if (angle === undefined) {
        angle = labelAngle(axis, channel, fieldDef);
        if (angle) {
            labelsSpec.angle = { value: angle };
        }
    }
    if (angle !== undefined) {
        var align = labelAlign(angle, orient);
        if (align) {
            labelsSpec.align = { value: align };
        }
        labelsSpec.baseline = labelBaseline(angle, orient);
    }
    labelsSpec = __assign({}, labelsSpec, specifiedLabelsSpec);
    return util_1.keys(labelsSpec).length === 0 ? undefined : labelsSpec;
}
exports.labels = labels;
function labelBaseline(angle, orient) {
    if (orient === 'top' || orient === 'bottom') {
        if (angle <= 45 || 315 <= angle) {
            return { value: orient === 'top' ? 'bottom' : 'top' };
        }
        else if (135 <= angle && angle <= 225) {
            return { value: orient === 'top' ? 'top' : 'bottom' };
        }
        else {
            return { value: 'middle' };
        }
    }
    else {
        if ((angle <= 45 || 315 <= angle) || (135 <= angle && angle <= 225)) {
            return { value: 'middle' };
        }
        else if (45 <= angle && angle <= 135) {
            return { value: orient === 'left' ? 'top' : 'bottom' };
        }
        else {
            return { value: orient === 'left' ? 'bottom' : 'top' };
        }
    }
}
exports.labelBaseline = labelBaseline;
function labelAngle(axis, channel, fieldDef) {
    if (axis.labelAngle !== undefined) {
        // Make angle within [0,360)
        return ((axis.labelAngle % 360) + 360) % 360;
    }
    else {
        if (channel === channel_1.X && util_1.contains([type_1.NOMINAL, type_1.ORDINAL], fieldDef.type)) {
            return 270;
        }
    }
    return undefined;
}
exports.labelAngle = labelAngle;
function labelAlign(angle, orient) {
    angle = ((angle % 360) + 360) % 360;
    if (orient === 'top' || orient === 'bottom') {
        if (angle % 180 === 0) {
            return 'center';
        }
        else if (0 < angle && angle < 180) {
            return orient === 'top' ? 'right' : 'left';
        }
        else {
            return orient === 'top' ? 'left' : 'right';
        }
    }
    else {
        if ((angle + 90) % 180 === 0) {
            return 'center';
        }
        else if (90 <= angle && angle < 270) {
            return orient === 'left' ? 'left' : 'right';
        }
        else {
            return orient === 'left' ? 'right' : 'left';
        }
    }
}
exports.labelAlign = labelAlign;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBpbGUvYXhpcy9lbmNvZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLHlDQUErRDtBQUMvRCwyQ0FBd0Q7QUFDeEQscUNBQXNDO0FBQ3RDLG1DQUE0QztBQUM1QyxtQ0FBMEM7QUFFMUMsb0NBQStDO0FBRS9DLG1DQUF1QztBQUV2QyxnQkFBdUIsS0FBZ0IsRUFBRSxPQUE2QixFQUFFLG1CQUF3QixFQUFFLE1BQWtCO0lBQ2xILElBQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBQ3RDLENBQ0UsT0FBTyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLE9BQU8sS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDeEMsU0FBUyxDQUNWLENBQUM7SUFDSixJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pDLElBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFFNUIsSUFBSSxVQUFVLEdBQVEsRUFBRSxDQUFDO0lBRXpCLE9BQU87SUFDUCxFQUFFLENBQUMsQ0FBQyx5QkFBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixJQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLGlCQUFTLENBQUMsR0FBRyxDQUFDO1FBRWxGLFVBQVUsQ0FBQyxJQUFJLEdBQUc7WUFDaEIsTUFBTSxFQUFFLDZCQUFvQixDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUM7U0FDeEksQ0FBQztJQUNKLENBQUM7SUFFRCxjQUFjO0lBQ2QsSUFBSSxLQUFLLEdBQUcsc0JBQWEsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNySCxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztRQUN4QixLQUFLLEdBQUcsVUFBVSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDNUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNWLFVBQVUsQ0FBQyxLQUFLLEdBQUcsRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFDLENBQUM7UUFDcEMsQ0FBQztJQUNILENBQUM7SUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztRQUN4QixJQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3hDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDVixVQUFVLENBQUMsS0FBSyxHQUFHLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBQyxDQUFDO1FBQ3BDLENBQUM7UUFFRCxVQUFVLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELFVBQVUsZ0JBQ0wsVUFBVSxFQUNWLG1CQUFtQixDQUN2QixDQUFDO0lBRUYsTUFBTSxDQUFDLFdBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztBQUNoRSxDQUFDO0FBN0NELHdCQTZDQztBQUVELHVCQUE4QixLQUFhLEVBQUUsTUFBa0I7SUFDN0QsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLEtBQUssSUFBSSxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztRQUM1QyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRSxJQUFJLEdBQUcsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxFQUFDLEtBQUssRUFBRSxNQUFNLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBQyxDQUFDO1FBQ3RELENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLEtBQUssSUFBSSxLQUFLLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN4QyxNQUFNLENBQUMsRUFBQyxLQUFLLEVBQUUsTUFBTSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBLENBQUMsQ0FBQyxRQUFRLEVBQUMsQ0FBQztRQUNyRCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsRUFBQyxLQUFLLEVBQUUsUUFBUSxFQUFDLENBQUM7UUFDM0IsQ0FBQztJQUNILENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUUsSUFBSSxHQUFHLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksS0FBSyxJQUFJLEtBQUssSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEUsTUFBTSxDQUFDLEVBQUMsS0FBSyxFQUFFLFFBQVEsRUFBQyxDQUFDO1FBQzNCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEtBQUssSUFBSSxLQUFLLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN2QyxNQUFNLENBQUMsRUFBQyxLQUFLLEVBQUUsTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUMsQ0FBQztRQUN2RCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsRUFBQyxLQUFLLEVBQUUsTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUMsQ0FBQztRQUN2RCxDQUFDO0lBQ0gsQ0FBQztBQUNILENBQUM7QUFsQkQsc0NBa0JDO0FBRUQsb0JBQTJCLElBQVUsRUFBRSxPQUFnQixFQUFFLFFBQTBCO0lBQ2pGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNsQyw0QkFBNEI7UUFDNUIsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUMvQyxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssV0FBQyxJQUFJLGVBQVEsQ0FBQyxDQUFDLGNBQU8sRUFBRSxjQUFPLENBQUMsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDYixDQUFDO0lBQ0gsQ0FBQztJQUNELE1BQU0sQ0FBQyxTQUFTLENBQUM7QUFDbkIsQ0FBQztBQVZELGdDQVVDO0FBRUQsb0JBQTJCLEtBQWEsRUFBRSxNQUFrQjtJQUMxRCxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDcEMsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLEtBQUssSUFBSSxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztRQUM1QyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNsQixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDcEMsTUFBTSxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQzdDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUM3QyxDQUFDO0lBQ0gsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNsQixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxLQUFLLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdEMsTUFBTSxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQzlDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUM5QyxDQUFDO0lBQ0gsQ0FBQztBQUNILENBQUM7QUFuQkQsZ0NBbUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBeGlzfSBmcm9tICcuLi8uLi9heGlzJztcbmltcG9ydCB7Q2hhbm5lbCwgUG9zaXRpb25TY2FsZUNoYW5uZWwsIFh9IGZyb20gJy4uLy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtGaWVsZERlZiwgaXNUaW1lRmllbGREZWZ9IGZyb20gJy4uLy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7U2NhbGVUeXBlfSBmcm9tICcuLi8uLi9zY2FsZSc7XG5pbXBvcnQge05PTUlOQUwsIE9SRElOQUx9IGZyb20gJy4uLy4uL3R5cGUnO1xuaW1wb3J0IHtjb250YWlucywga2V5c30gZnJvbSAnLi4vLi4vdXRpbCc7XG5pbXBvcnQge0F4aXNPcmllbnQsIEhvcml6b250YWxBbGlnbn0gZnJvbSAnLi4vLi4vdmVnYS5zY2hlbWEnO1xuaW1wb3J0IHt0aW1lRm9ybWF0RXhwcmVzc2lvbn0gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCB7VW5pdE1vZGVsfSBmcm9tICcuLi91bml0JztcbmltcG9ydCB7Z2V0QXhpc0NvbmZpZ30gZnJvbSAnLi9jb25maWcnO1xuXG5leHBvcnQgZnVuY3Rpb24gbGFiZWxzKG1vZGVsOiBVbml0TW9kZWwsIGNoYW5uZWw6IFBvc2l0aW9uU2NhbGVDaGFubmVsLCBzcGVjaWZpZWRMYWJlbHNTcGVjOiBhbnksIG9yaWVudDogQXhpc09yaWVudCkge1xuICBjb25zdCBmaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpIHx8XG4gICAgKFxuICAgICAgY2hhbm5lbCA9PT0gJ3gnID8gbW9kZWwuZmllbGREZWYoJ3gyJykgOlxuICAgICAgY2hhbm5lbCA9PT0gJ3knID8gbW9kZWwuZmllbGREZWYoJ3kyJykgOlxuICAgICAgdW5kZWZpbmVkXG4gICAgKTtcbiAgY29uc3QgYXhpcyA9IG1vZGVsLmF4aXMoY2hhbm5lbCk7XG4gIGNvbnN0IGNvbmZpZyA9IG1vZGVsLmNvbmZpZztcblxuICBsZXQgbGFiZWxzU3BlYzogYW55ID0ge307XG5cbiAgLy8gVGV4dFxuICBpZiAoaXNUaW1lRmllbGREZWYoZmllbGREZWYpKSB7XG4gICAgY29uc3QgaXNVVENTY2FsZSA9IG1vZGVsLmdldFNjYWxlQ29tcG9uZW50KGNoYW5uZWwpLmdldCgndHlwZScpID09PSBTY2FsZVR5cGUuVVRDO1xuXG4gICAgbGFiZWxzU3BlYy50ZXh0ID0ge1xuICAgICAgc2lnbmFsOiB0aW1lRm9ybWF0RXhwcmVzc2lvbignZGF0dW0udmFsdWUnLCBmaWVsZERlZi50aW1lVW5pdCwgYXhpcy5mb3JtYXQsIGNvbmZpZy5heGlzLnNob3J0VGltZUxhYmVscywgY29uZmlnLnRpbWVGb3JtYXQsIGlzVVRDU2NhbGUpXG4gICAgfTtcbiAgfVxuXG4gIC8vIExhYmVsIEFuZ2xlXG4gIGxldCBhbmdsZSA9IGdldEF4aXNDb25maWcoJ2xhYmVsQW5nbGUnLCBtb2RlbC5jb25maWcsIGNoYW5uZWwsIG9yaWVudCwgbW9kZWwuZ2V0U2NhbGVDb21wb25lbnQoY2hhbm5lbCkuZ2V0KCd0eXBlJykpO1xuICBpZiAoYW5nbGUgPT09IHVuZGVmaW5lZCkge1xuICAgIGFuZ2xlID0gbGFiZWxBbmdsZShheGlzLCBjaGFubmVsLCBmaWVsZERlZik7XG4gICAgaWYgKGFuZ2xlKSB7XG4gICAgICBsYWJlbHNTcGVjLmFuZ2xlID0ge3ZhbHVlOiBhbmdsZX07XG4gICAgfVxuICB9XG5cbiAgaWYgKGFuZ2xlICE9PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBhbGlnbiA9IGxhYmVsQWxpZ24oYW5nbGUsIG9yaWVudCk7XG4gICAgaWYgKGFsaWduKSB7XG4gICAgICBsYWJlbHNTcGVjLmFsaWduID0ge3ZhbHVlOiBhbGlnbn07XG4gICAgfVxuXG4gICAgbGFiZWxzU3BlYy5iYXNlbGluZSA9IGxhYmVsQmFzZWxpbmUoYW5nbGUsIG9yaWVudCk7XG4gIH1cblxuICBsYWJlbHNTcGVjID0ge1xuICAgIC4uLmxhYmVsc1NwZWMsXG4gICAgLi4uc3BlY2lmaWVkTGFiZWxzU3BlY1xuICB9O1xuXG4gIHJldHVybiBrZXlzKGxhYmVsc1NwZWMpLmxlbmd0aCA9PT0gMCA/IHVuZGVmaW5lZCA6IGxhYmVsc1NwZWM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsYWJlbEJhc2VsaW5lKGFuZ2xlOiBudW1iZXIsIG9yaWVudDogQXhpc09yaWVudCkge1xuICBpZiAob3JpZW50ID09PSAndG9wJyB8fCBvcmllbnQgPT09ICdib3R0b20nKSB7XG4gICAgaWYgKGFuZ2xlIDw9IDQ1IHx8IDMxNSA8PSBhbmdsZSkge1xuICAgICAgcmV0dXJuIHt2YWx1ZTogb3JpZW50ID09PSAndG9wJyA/ICdib3R0b20nIDogJ3RvcCd9O1xuICAgIH0gZWxzZSBpZiAoMTM1IDw9IGFuZ2xlICYmIGFuZ2xlIDw9IDIyNSkge1xuICAgICAgcmV0dXJuIHt2YWx1ZTogb3JpZW50ID09PSAndG9wJyA/ICd0b3AnOiAnYm90dG9tJ307XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7dmFsdWU6ICdtaWRkbGUnfTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKChhbmdsZSA8PSA0NSB8fCAzMTUgPD0gYW5nbGUpIHx8ICgxMzUgPD0gYW5nbGUgJiYgYW5nbGUgPD0gMjI1KSkge1xuICAgICAgcmV0dXJuIHt2YWx1ZTogJ21pZGRsZSd9O1xuICAgIH0gZWxzZSBpZiAoNDUgPD0gYW5nbGUgJiYgYW5nbGUgPD0gMTM1KSB7XG4gICAgICByZXR1cm4ge3ZhbHVlOiBvcmllbnQgPT09ICdsZWZ0JyA/ICd0b3AnIDogJ2JvdHRvbSd9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge3ZhbHVlOiBvcmllbnQgPT09ICdsZWZ0JyA/ICdib3R0b20nIDogJ3RvcCd9O1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbGFiZWxBbmdsZShheGlzOiBBeGlzLCBjaGFubmVsOiBDaGFubmVsLCBmaWVsZERlZjogRmllbGREZWY8c3RyaW5nPikge1xuICBpZiAoYXhpcy5sYWJlbEFuZ2xlICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBNYWtlIGFuZ2xlIHdpdGhpbiBbMCwzNjApXG4gICAgcmV0dXJuICgoYXhpcy5sYWJlbEFuZ2xlICUgMzYwKSArIDM2MCkgJSAzNjA7XG4gIH0gZWxzZSB7XG4gICAgaWYgKGNoYW5uZWwgPT09IFggJiYgY29udGFpbnMoW05PTUlOQUwsIE9SRElOQUxdLCBmaWVsZERlZi50eXBlKSkge1xuICAgICAgcmV0dXJuIDI3MDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxhYmVsQWxpZ24oYW5nbGU6IG51bWJlciwgb3JpZW50OiBBeGlzT3JpZW50KTogSG9yaXpvbnRhbEFsaWduIHtcbiAgYW5nbGUgPSAoKGFuZ2xlICUgMzYwKSArIDM2MCkgJSAzNjA7XG4gIGlmIChvcmllbnQgPT09ICd0b3AnIHx8IG9yaWVudCA9PT0gJ2JvdHRvbScpIHtcbiAgICBpZiAoYW5nbGUgJSAxODAgPT09IDApIHtcbiAgICAgIHJldHVybiAnY2VudGVyJztcbiAgICB9IGVsc2UgaWYgKDAgPCBhbmdsZSAmJiBhbmdsZSA8IDE4MCkge1xuICAgICAgcmV0dXJuIG9yaWVudCA9PT0gJ3RvcCcgPyAncmlnaHQnIDogJ2xlZnQnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb3JpZW50ID09PSAndG9wJyA/ICdsZWZ0JyA6ICdyaWdodCc7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmICgoYW5nbGUgKyA5MCkgJSAxODAgPT09IDApIHtcbiAgICAgIHJldHVybiAnY2VudGVyJztcbiAgICB9IGVsc2UgaWYgKDkwIDw9IGFuZ2xlICYmIGFuZ2xlIDwgMjcwKSB7XG4gICAgICByZXR1cm4gb3JpZW50ID09PSAnbGVmdCcgPyAnbGVmdCcgOiAncmlnaHQnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb3JpZW50ID09PSAnbGVmdCcgPyAncmlnaHQnIDogJ2xlZnQnO1xuICAgIH1cbiAgfVxufVxuXG4iXX0=