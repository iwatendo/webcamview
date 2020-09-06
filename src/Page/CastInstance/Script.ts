import StdUtil from "../../Base/Util/StdUtil";
import LocalCache from "../../Contents/Cache/LocalCache";
import CastInstanceView from "./CastInstanceView";

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
        let view = new CastInstanceView();
        view.Initialize();
    }
}