// ==UserScript==
// @name         开放大学自动刷视频课
// @namespace    https://www.asymt.com/
// @version      0.1
// @description  可以自动刷开放大学的视频课
// @author       喻名堂
// @supportURL        https://github.com/asymt/Tampermonkey_Script
// @updateURL         https://raw.githubusercontent.com/asymt/Tampermonkey_Script/main/开放大学自动刷视频课.user.js
// @downloadURL       https://raw.githubusercontent.com/asymt/Tampermonkey_Script/main/开放大学自动刷视频课.user.js
// @match        *://lms.ouchn.cn/course/*
// @connect           lms.ouchn.cn
// @run-at            document-idle
// @grant             GM_xmlhttpRequest
// @grant             GM_setClipboard
// @grant             GM_setValue
// @grant             GM_getValue
// @icon         data:image/png;base64,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
// ==/UserScript==

(function() {
    'use strict';
    let base = {
        // 模拟鼠标点击
        emulateMouseEvent (element,type) {
            // 创建事件
            var event = document.createEvent('MouseEvents')
            // 定义事件 参数： type, bubbles, cancelable
            event.initEvent(type, true, true)
            // 触发对象可以是任何元素或其他事件目标
            element.dispatchEvent(event)
        },
        getValue(name) {
            return GM_getValue(name);
        },

        setValue(name, value) {
            GM_setValue(name, value);
        },

        getStorage(key) {
            try {
                return JSON.parse(localStorage.getItem(key));
            } catch (e) {
                return localStorage.getItem(key);
            }
        },

        setStorage(key, value) {
            if (this.isType(value) === 'object' || this.isType(value) === 'array') {
                return localStorage.setItem(key, JSON.stringify(value));
            }
            return localStorage.setItem(key, value);
        },
        isType(obj) {
            return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
        },
        post(url, data, headers, type) {
            if (this.isType(data) === 'object') {
                data = JSON.stringify(data);
            }
            return new Promise((resolve, reject) => {
                GM_xmlhttpRequest({
                    method: "POST", url, headers, data,
                    responseType: type || 'json',
                    onload: (res) => {
                        type === 'blob' ? resolve(res) : resolve(res.response || res.responseText);
                    },
                    onerror: (err) => {
                        reject(err);
                    },
                });
            });
        },

        get(url, headers, type, extra) {
            return new Promise((resolve, reject) => {
                let requestObj = GM_xmlhttpRequest({
                    method: "GET", url, headers,
                    responseType: type || 'json',
                    onload: (res) => {
                        if (res.status === 204) {
                            requestObj.abort();
                        }
                        resolve(res.response || res.responseText);
                    },
                    onprogress: (res) => {
                        if (extra && extra.filename && extra.index) {
                            res.total > 0 ? progress[extra.index] = (res.loaded * 100 / res.total).toFixed(2) : progress[extra.index] = 0.00;
                        }
                    },
                    onloadstart() {
                        extra && extra.filename && extra.index && (request[extra.index] = requestObj);
                    },
                    onerror: (err) => {
                        reject(err);
                    },
                });
            });
        }

    }

    console.log('检测到开放大学视频课学习界面！');
    const baseURL=location.protocol+"//"+location.host
        ,coursePath=location.pathname.replace(/^(\/course\/\d+).*/,'$1')
        ,courseApiURL=baseURL+"/api"+coursePath
        ,activitiesReadApiURL=baseURL+"/api/course/activities-read"
        ,courseLearningPath=coursePath+"/learning-activity/full-screen";
    let modules=[],activities=[],activeModuleIndex=-1,activeActivityIndex=-1;
    const getModules = async ()=>{
        const data=await base.get(courseApiURL.replace('course','courses')+"/modules")||{};
        return data.modules;
    }

    const getAllActivities= async moduleId=>{
        const data=await base.get(courseApiURL+"/all-activities?module_ids=["+moduleId+"]&activity_types=learning_activities,exams,classrooms")||{};
        return data.learning_activities
    }
    const getActivityRead = async activityId=>{
        return await base.post(activitiesReadApiURL+"/"+activityId);
    }

    const startNextModule = async ()=>{
        if(modules.length===0){
            modules= await getModules();
            console.log(modules)
        }
        if(++activeModuleIndex<modules.length) {
            activities =await getAllActivities(modules[activeModuleIndex].id);
            activeActivityIndex=-1;
            learningNext();
        }
    }

    const learningNext = async ()=>{
        if(++activeActivityIndex<activities.length){
            const activity=activities[activeActivityIndex];
            if(activity.type!=='online_video'){
                learningNext();
                return
            }
            const activityRead= await getActivityRead(activity.id)
            if(activityRead.completeness==='full'){
                learningNext();
                return;
            }
            const uploads=activity.uploads;
            console.log("uploads:")
            console.log(uploads)
            if(uploads===null||uploads.length===0){
                learningNext();
                return;
            }
            const videoIds=[];
            uploads.reduce((arr,upload)=>{
                if(upload.deleted||upload.status!=='ready'||upload.videos===null||upload.videos.length===0){
                    return arr;
                }
                upload.videos.reduce((vids,video)=>{
                    vids.push(video.id)
                    return vids;
                },arr);
                return arr;
            },videoIds)
            console.log("videoIds:")
            console.log(videoIds)
            if(videoIds.length===0){
                learningNext();
                return;
            }
            location.replace(baseURL+courseLearningPath+"#/"+activityRead.activity_id)
            setTimeout(()=>{
                playVideo(videoIds)
            },1000)
        }else {
            startNextModule();
        }
    }

    const playVideo = videoIds=>{
        const videoElements=document.querySelectorAll('video');
        if(videoElements.length===0){
            setTimeout(()=>{
                playVideo(videoIds);
            },1000)
            return;
        }
        const videoIdReg=new RegExp('^'+baseURL+'/api/uploads/video/('+videoIds.join("|")+').*$')
        let video;
        videoElements.forEach(element=>{
            if(videoIdReg.test(element.src)){
                video=element;
            }
        });
        if(!video){
            setTimeout(()=>{
                playVideo(videoIds);
            },1000)
            return;
        }
        video.muted="muted";
        video.onended=()=>{
            console.log("onended is trigger!")
            setTimeout(learningNext,1000);
        }
        video.onpause=()=>{
            clickPlayButton();
        }
        video.oncanplay=()=>{
            console.log("oncanplay is trigger!")
        }
        setTimeout(clickPlayButton,500);
    }
    const clickPlayButton = ()=>{
        if(document.querySelectorAll('.mvp-toggle-play').length){
            base.emulateMouseEvent(document.querySelectorAll('.mvp-toggle-play')[0],'click');
        }else {
            setTimeout(clickPlayButton,500);
        }
    }
    let main = {
        init(){
            const Reg=new RegExp('^'+courseLearningPath+'$')
            if(Reg.test(location.pathname)){
                startNextModule();
            }else {
                location.replace(baseURL+courseLearningPath);
            }
        }
    }
    main.init();
    // Your code here...
})();
