// ==UserScript==
// @name         开放大学自动刷视频课
// @namespace    https://www.asymt.com/
// @version      0.1
// @description  可以自动刷开放大学的视频课
// @author       喻名堂
// @match        *://lms.ouchn.cn/course/*
// @connect           lms.ouchn.cn
// @run-at            document-idle
// @grant             GM_xmlhttpRequest
// @grant             GM_setClipboard
// @grant             GM_setValue
// @grant             GM_getValue
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
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