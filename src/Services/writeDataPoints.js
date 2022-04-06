
// import drawing stuff
import {drawConnectors, drawLandmarks, lerp} from '@mediapipe/drawing_utils'
import * as holistic from '@mediapipe/holistic'

function removeElements(landmarks, elements) {
    for (var element of elements) {
        delete landmarks[element];
    }
}
function removeLandmarks(results) {
    if (results.poseLandmarks) {
        removeElements(results.poseLandmarks, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 16, 17, 18, 19, 20, 21, 22]);
    }
}
function connect(ctx, connectors) {
    var canvas = ctx.canvas;
    for (var connector of connectors) {
        var from = connector[0];
        var to = connector[1];
        if (from && to) {
            if (from.visibility && to.visibility &&
                (from.visibility < 0.1 || to.visibility < 0.1)) {
                continue;
            }
            ctx.beginPath();
            ctx.moveTo(from.x * canvas.width, from.y * canvas.height);
            ctx.lineTo(to.x * canvas.width, to.y * canvas.height);
            ctx.stroke();
        }
    }
}
export const draw = ( canvasElement,blank, canvasCtx, results)=>{
    // Hide the spinner.
    //document.body.classList.add('loaded');
    // Remove landmarks we don't want to draw.
    removeLandmarks(results);
    // Update the frame rate.
    //fpsControl.tick();
    // Draw the overlays.
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    if (results.segmentationMask) {
        canvasCtx.drawImage(blank, 0, 0, canvasElement.width, canvasElement.height);
        // Only overwrite existing pixels.
       
        // Only overwrite missing pixels.
        canvasCtx.globalCompositeOperation = 'destination-atop';
        canvasCtx.drawImage(blank, 0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.globalCompositeOperation = 'source-over';
    }
    else {
        canvasCtx.drawImage(blank, 0, 0, canvasElement.width, canvasElement.height);
    }
    // Connect elbows to hands. Do this first so that the other graphics will draw
    // on top of these marks.
    canvasCtx.lineWidth = 5;
    if (results.poseLandmarks) {
        if (results.rightHandLandmarks) {
            canvasCtx.strokeStyle = 'white';
            connect(canvasCtx, [[
                    results.poseLandmarks[holistic.POSE_LANDMARKS.RIGHT_ELBOW],
                    results.rightHandLandmarks[0]
                ]]);
        }
        if (results.leftHandLandmarks) {
            canvasCtx.strokeStyle = 'white';
            connect(canvasCtx, [[
                    results.poseLandmarks[holistic.POSE_LANDMARKS.LEFT_ELBOW],
                    results.leftHandLandmarks[0]
                ]]);
        }
    }
    // Pose...
    drawConnectors(canvasCtx, results.poseLandmarks, holistic.POSE_CONNECTIONS, { color: 'white' });
    drawLandmarks(canvasCtx, Object.values(holistic.POSE_LANDMARKS_LEFT)
        .map(index => results.poseLandmarks[index]), { visibilityMin: 0.65, color: 'white', fillColor: 'rgb(255,138,0)' });
    drawLandmarks(canvasCtx, Object.values(holistic.POSE_LANDMARKS_RIGHT)
        .map(index => results.poseLandmarks[index]), { visibilityMin: 0.65, color: 'white', fillColor: 'rgb(0,217,231)' });
    // Hands...
    drawConnectors(canvasCtx, results.rightHandLandmarks, holistic.HAND_CONNECTIONS, { color: 'white' });
    drawLandmarks(canvasCtx, results.rightHandLandmarks, {
        color: 'white',
        fillColor: 'rgb(0,217,231)',
        lineWidth: 2,
        radius: (data) => {
            return lerp(data.from.z, -0.15, .1, 10, 1);
        }
    });
    drawConnectors(canvasCtx, results.leftHandLandmarks, holistic.HAND_CONNECTIONS, { color: 'white' });
    drawLandmarks(canvasCtx, results.leftHandLandmarks, {
        color: 'white',
        fillColor: 'rgb(255,138,0)',
        lineWidth: 2,
        radius: (data) => {
            return lerp(data.from.z, -0.15, .1, 10, 1);
        }
    });
    // Face...
    drawConnectors(canvasCtx, results.faceLandmarks,holistic.FACEMESH_TESSELATION, { color: '#C0C0C070', lineWidth: 1 });
    drawConnectors(canvasCtx, results.faceLandmarks, holistic.FACEMESH_RIGHT_EYE, { color: 'rgb(0,217,231)' });
    drawConnectors(canvasCtx, results.faceLandmarks, holistic.FACEMESH_RIGHT_EYEBROW, { color: 'rgb(0,217,231)' });
    drawConnectors(canvasCtx, results.faceLandmarks, holistic.FACEMESH_LEFT_EYE, { color: 'rgb(255,138,0)' });
    drawConnectors(canvasCtx, results.faceLandmarks, holistic.FACEMESH_LEFT_EYEBROW, { color: 'rgb(255,138,0)' });
    drawConnectors(canvasCtx, results.faceLandmarks, holistic.FACEMESH_FACE_OVAL, { color: '#E0E0E0', lineWidth: 5 });
    drawConnectors(canvasCtx, results.faceLandmarks, holistic.FACEMESH_LIPS, { color: '#E0E0E0', lineWidth: 5 });
    canvasCtx.restore();
}