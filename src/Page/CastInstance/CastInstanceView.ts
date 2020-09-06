import DeviceUtil, { DeviceKind } from "../../Base/Util/DeviceUtil";
import StreamUtil from "../../Base/Util/StreamUtil";

import { DeviceView } from "../DeviceView/DeviceVew";
import LocalCache from "../../Contents/Cache/LocalCache";

export default class CastInstanceView {

    /**
     * 初期化処理
     */
    public Initialize() {
        this.SetMediaDevice();
    }

    /**
     * Video/Audioソースの取得とリストへのセット
     */
    public SetMediaDevice() {

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

            let previewElement = document.getElementById('sbj-video') as HTMLVideoElement;
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


}
