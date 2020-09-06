import StdUtil from "../Util/StdUtil";
import LocalCache from "../Util/LocalCache";
import DeviceUtil, { DeviceKind } from "../Util/DeviceUtil";
import StreamUtil from "../Util/StreamUtil";
import { DeviceView } from "./DeviceView/DeviceVew";


if (StdUtil.IsSupoortPlatform(true)) {

    if (!LocalCache.IsCheckDevicePermision) {
        let reload = () => {
            LocalCache.IsCheckDevicePermision = true;
            location.reload();
        };
        navigator.getUserMedia = navigator.getUserMedia || (navigator as any).webkitGetUserMedia || (navigator as any).mozGetUserMedia;
        navigator.getUserMedia({ video: true, audio: true }, (stream) => { reload(); }, (err) => { reload(); });
    }
    else {
        SetMediaDevice();
    }
}

/**
 * Video/Audioソースの取得とリストへのセット
 */
function SetMediaDevice() {

    let preMic = LocalCache.LiveCastOptions.SelectMic;
    let preCam = LocalCache.LiveCastOptions.SelectCam;
    let isInit = (!preMic && !preCam);

    DeviceUtil.GetAudioDevice((devices) => {

        let textElement = document.getElementById('mic-select') as HTMLInputElement;
        var listElement = document.getElementById('mic-list') as HTMLElement;

        var view = new DeviceView(DeviceKind.Audio, textElement, listElement, devices, (deviceId, deviceName) => {
            LocalCache.SetLiveCastOptions((opt) => opt.SelectMic = deviceId);
        });

        if (isInit) {
            view.SelectFirstDevice();
        } else {
            view.SelectDeivce(preMic);
        }

        document.getElementById("mic-select-div").classList.add("is-dirty");
    });

    DeviceUtil.GetVideoDevice((devices) => {

        let previewElement = document.getElementById('web-camera-view-video') as HTMLVideoElement;
        let textElement = document.getElementById('webcam-select') as HTMLInputElement;
        var listElement = document.getElementById('webcam-list') as HTMLElement;

        var view = new DeviceView(DeviceKind.Video, textElement, listElement, devices, (deviceId, deviceName) => {

            LocalCache.SetLiveCastOptions((opt) => opt.SelectCam = deviceId);

            if (deviceId) {
                let msc = StreamUtil.GetMediaStreamConstraints(deviceId, null);
                StreamUtil.GetStreaming(msc, (stream) => {
                    StreamUtil.StartPreview(previewElement, stream);
                }, (errname) => {
                    alert(errname);
                });
            }
        });

        if (isInit) {
            view.SelectFirstDevice();
        } else {
            view.SelectDeivce(preCam);
        }

        document.getElementById("webcam-select-div").classList.add("is-dirty");
    });

}
