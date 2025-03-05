<template>
    <div>
        <van-nav-bar title="标题(gotoBack)" left-text="返回" left-arrow @click-left="gotoBack" />
        <div class="div-btn-box" @click="gotoBack()">
            <h2>返回</h2>
        </div>
        <video ref="video" autoplay></video>
        <button @click="takePhoto">拍照</button>
        <canvas ref="canvas" style="display: none"></canvas>
        <img :src="imgSrc" v-if="imgSrc" class="photo-preview" />
    </div>
</template>

<script lang="ts" setup>
import { gotoBack } from '@/utils/app';
import { showToast, showNotify } from 'vant';

const video = ref<HTMLVideoElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
const imgSrc = ref<string | null>(null);

// 获取媒体流
const getMediaStream = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (video.value) {
            video.value.srcObject = stream;
        }
    } catch (error) {
        console.error('无法获取媒体流', error);
        showNotify({ type: 'danger', message: '无法获取媒体流' });
    }
};

// 拍照
const takePhoto = () => {
    if (!video.value || !canvas.value) return;
    const context = canvas.value.getContext('2d');
    if (context) {
        canvas.value.width = video.value.videoWidth;
        canvas.value.height = video.value.videoHeight;
        context.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);
        imgSrc.value = canvas.value.toDataURL('image/png');
    }
};

// 关闭摄像头
const closeCamera = () => {
    if (video.value && video.value.srcObject) {
        video.value.srcObject.getTracks().forEach(track => track.stop());
    }
};

onMounted(() => {
    getMediaStream();
});

onUnmounted(() => {
    closeCamera();
});
</script>

<style scoped>
video,
.photo-preview {
    width: 100%;
    max-width: 400px;
    border: 1px solid #ccc;
    margin: 10px 0;
}

button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
.div-btn-box {
    text-align: center;
    background-color: #cccccc;
    margin: 20px;
    padding: 26px 20px;
    word-wrap: break-word;
}
</style>
