import {useEffect, useRef} from "react";
import {Toast} from "bootstrap";

function ToastComponent({getToast, hideToast, text, title, type, eventListener}) {
    const toastRef = useRef();

    const combHide = (bsToast) => {
        bsToast.hide();
        hideToast();
    }

    useEffect(() => {
        var myToast = toastRef.current
        var bsToast = Toast.getInstance(myToast)
        if (!bsToast) {
            bsToast = new Toast(myToast, {autohide: true})
            bsToast.hide();
        }
        if (text === "") combHide(bsToast);
        else getToast ? bsToast.show() : bsToast.hide()
    })

    useEffect(() => {
        eventListener();
    }, [])

    return (
        <>
            <div id='toast' className={`toast position-absolute top-0 end-0 m-4 toTop bg-${type}`} role="alert"
                 ref={toastRef}>
                <div className="toast-header">
                    <strong className="me-auto">{title}</strong>
                    <img
                        src={type === "danger" ? "https://img.icons8.com/metro/26/1A1A1A/box-important.png" : "https://img.icons8.com/metro/26/1A1A1A/about.png"}
                        className="rounded me-2" alt="..."/>
                </div>
                <div className="toast-body">
                    {text}
                </div>
            </div>
        </>
    )
}

export default ToastComponent