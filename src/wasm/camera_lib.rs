use wasm_bindgen::prelude::*;
use web_sys::{HtmlVideoElement, MediaStream, MediaStreamConstraints, MediaStreamTrack, window};

#[wasm_bindgen]
pub struct Camera {
    video_element: HtmlVideoElement,
}

#[wasm_bindgen]
impl Camera {
    #[wasm_bindgen(constructor)]
    pub fn new(video_element_id: &str) -> Result<Camera, JsValue> {
        let window = window().unwrap();
        let document = window.document().unwrap();
        let video_element = document.get_element_by_id(video_element_id)
            .unwrap()
            .dyn_into::<HtmlVideoElement>()
            .unwrap();

        Ok(Camera { video_element })
    }

    pub fn start(&self) -> Result<(), JsValue> {
        let constraints = MediaStreamConstraints::new().video(&JsValue::TRUE);
        let navigator = window().unwrap().navigator();
        let media_devices = navigator.media_devices().unwrap();
        let video_element = self.video_element.clone();

        let promise = media_devices.get_user_media_with_constraints(&constraints)?;
        let future = wasm_bindgen_futures::JsFuture::from(promise);

        let future = future.then(move |result| {
            match result {
                Ok(media_stream) => {
                    let media_stream = media_stream.dyn_into::<MediaStream>().unwrap();
                    video_element.set_src_object(Some(&media_stream));
                    video_element.play().unwrap();
                }
                Err(err) => {
                    web_sys::console::log_1(&err);
                }
            }
            wasm_bindgen_futures::future::ready(())
        });

        wasm_bindgen_futures::spawn_local(future);

        Ok(())
    }

    pub fn stop(&self) {
        if let Some(media_stream) = self.video_element.src_object() {
            let media_stream = media_stream.dyn_into::<MediaStream>().unwrap();
            for track in media_stream.get_tracks().iter() {
                let track = track.dyn_into::<MediaStreamTrack>().unwrap();
                track.stop();
            }
            self.video_element.set_src_object(None);
        }
    }
}