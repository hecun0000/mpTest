<template>
    <div class="container">
        <img src="http://static.ledouya.com/Fpi5liT0kp71BLrXXtOhxDmY2AWJ" class="toast">
        <div class="text">404</div>
    </div>
</template>


<style scoped lang="less">
    .container{
        height: 100%;
        background: #fff;
        .toast{
            margin: 100rpx auto 0;
            width: 645rpx;
            height: 360rpx;
        }
        .text{
            font-size: 30rpx;
            color: #999;
            text-align: center;
        }
    }
    .wrapper {
        width: 750rpx;
        height: 40rpx;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) rotate(180deg);
        background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%);
        overflow: hidden;
    }

    .wave {
        width: 1000rpx;
        height: 1025rpx;
        position: absolute;
        top: -25%;
        left: 50%;
        margin-left: -40rpx;
        margin-top: -40rpx;
        border-radius: 35%;
        background: rgba(255, 255, 255, .75);
        animation: wave 15s infinite linear;
    }

    @keyframes wave {
        from { transform: rotate(0deg);}
        from { transform: rotate(360deg);}
    }

</style>
