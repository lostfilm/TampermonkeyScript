// ==UserScript==
// @name         小窗口视频（bili，mgtv）
// @version      0.1
// @license      MPL-2.0
// @namespace    
// @description  小窗口视频（bili，mgtv）。网页右下角会出现一个小按钮，点击之后视频会通过小窗口播放。基于chrome浏览器的画中画（Picture in Picture）。
// @author       c4r
// @require      https://code.jquery.com/jquery-latest.js
// @match        https://www.bilibili.com/video/*
// @match        https://www.bilibili.com/bangumi/*
// @match        https://live.bilibili.com/*
// @match        https://www.mgtv.com/b/*
// @match        https://www.bilibili.com/watchlater/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let videoUrl = undefined;

    /**
     * 
     */
    let callbackVideo = function (mutationList, observer) {
        // console.log("coin change : ", mutationList)

        if($('video').length > 0){
            if(videoUrl != $('video').attr('src')){

                // 视频地址发生变更
                videoUrl = $('video').attr('src')
                console.log("picInpic : video address changed ", $('video').attr('src'))
                if (document.pictureInPictureElement) {
                    // 在画中画里
                    // console.log("picInpic : pictureInPictureElement ", document.pictureInPictureElement)
                    console.log("picInpic : pictureInPictureElement ", document.getElementsByTagName('video')[0])
                    // setTimeout(() => {
                    //     document.getElementsByTagName('video')[0].requestPictureInPicture().catch(error => {
                    //         // 视频无法进入画中画模式
                    //         console.log('picInpic error : ', error, document.getElementsByTagName('video')[0])
                    //     });
                    // }, 1000);

                  
                    document.getElementsByTagName('video')[0].addEventListener("loadeddata", () =>{
                        console.log("picInpic : requestPictureInPicture")
                        // document.exitPictureInPicture()
                        document.getElementsByTagName('video')[0].requestPictureInPicture().catch(error => {
                            // 视频无法进入画中画模式
                            console.log('picInpic error : ', error, document.getElementsByTagName('video')[0])
                        });
                    })
                }
            }
        }

    }
    let observerVideo = new MutationObserver(callbackVideo)    

    document.body.insertAdjacentHTML('beforeend','<div id="c4r-oxgs73w7rh" style="height: 20px;width: 20px;position: fixed;overflow: hidden;bottom: 0px;right: 0px;cursor: pointer;z-index: 999">\
<div style="height: 20px;width: 20px;border-radius: 10px;position: relative;bottom: -4px;right: -4px;background-color: #cacaca;">\
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.85 142.73" style="height: 14px;width: 14px;bottom: 4px;right: 4px;position: absolute;"><defs><style>.cls-1{fill:#414042;fill-rule:evenodd;}</style></defs><title>Asset 1</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M90.15,9.15C54.51,1.8-5.62,92,19.3,96.79,33,99.44,43.61,92.06,53.13,90.62l13,.31a1.08,1.08,0,1,1,.86,2c-11,10.93-6.16,8.84-19.75,13C17.07,115.2-10.23,109,3.77,72.41,14.61,44.07,58.53-6.48,93,.69a4.46,4.46,0,0,1-2.85,8.46Z"></path><path class="cls-1" d="M76.14,59.88A74.48,74.48,0,0,1,86,82.13c9.45-11.26,23-18.66,35.69-5.72a3.28,3.28,0,0,1-4.22,5C104.7,76.87,99.12,80,90.9,91.87A40.53,40.53,0,0,0,88,97c.22,8.56-.94,17.53-2.93,27.55-.71,3.53-4.87,24.87-13.45,16.15-6.79-6.9,2.87-39.31,6.21-46,.19-.39.4-.78.6-1.18C77.9,82.45,75.64,71.83,71,64a3.28,3.28,0,0,1,5.14-4.07ZM72.85,133a2.25,2.25,0,0,0-.62.85C72.7,133.34,72.71,133.38,72.85,133Z"></path></g></g></svg>\
</div>\
</div>')
    document.getElementById('c4r-oxgs73w7rh').addEventListener("click", ()=>{

//        if (!document.pictureInPictureElement) {
            document.getElementsByTagName('video')[0].requestPictureInPicture().then(()=>{
                observerVideo.disconnect()
                observerVideo.observe($('body').get(0),
                {
                    subtree: true, childList: true, characterData: true, attributes: true,
                    attributeOldValue: false, characterDataOldValue: false
                })
            }).catch(error => {
                // 视频无法进入画中画模式
            });
//        } else {
//            document.exitPictureInPicture()
//                .catch(error => {
//                // 视频无法退出画中画模式
//           });
//        }



    })

})();