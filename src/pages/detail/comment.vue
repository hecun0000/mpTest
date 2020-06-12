<template>
    <div class="main">
        <!--评论用户的信息-->
        <div class="user-info-star">
            <div class="user-info">
                <img :src="commentInfo.avatar"/>
                <div>{{commentInfo.nickname}}</div>
            </div>
            <div class="user-star">
                <block v-for="(item, index) in commentInfo.grade - 0" :key="index">
                    <img src="http://static.ledouya.com/Frg1Ovv16HwJgMx3HjeUiVnSUdQt"/>
                </block>
                <block v-for="(item, index) in 5 - commentInfo.grade " :key="index">
                    <img src="http://static.ledouya.com/Fie_lwP4hltRLE3_1PBxLf1hlZ-M"/>
                </block>
            </div>
        </div>
        <div class="shop-time-rule">
            <div style="margin-right:20rpx">{{commentInfo.created_at}}</div>
            <div>{{commentInfo.commentRule}}</div>
        </div>
        <div class="comment-content">
            {{commentInfo.evaluation_content}}
            <div class="comment-pic" v-if="commentInfo.evaluation_img.length > 0">
                <block v-for="(item, index) in commentInfo.evaluation_img" :key="index">
                    <img :src="item" @click="previewImage(item, commentInfo.evaluation_img)"/>
                </block>
            </div>
        </div>
        <div class="reply-content" v-if="commentInfo.id_type == 1">
            <div class="triangle"></div>
            <div class="reply-content-background">
                <div class="reply-content-item">
                    商家回复：{{commentInfo.reply.evaluation_content}}
                </div>
                <div class="comment-pic">
                    <block v-for="(item, index) in commentInfo.reply.evaluation_img" :key="index">
                        <img :src="item" @click="previewImage(item, commentInfo.reply.evaluation_img)"/>
                    </block>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
    // import BaseComponent from '@/utils/baseComponent'
export default {
  props: {
        commentInfo: {}
  },
  methods: {
        previewImage (url, urlList) {
          wx.previewImage({
            current: url,
            urls: urlList
          })
        }
  },
  data () {
        return {
        }
  },
  mounted () {

  },
  onLoad () {},
  onUnload () {
        this.commentInfo = {}
  }
}
</script>

<style lang="less" scoped>
    .main {
        background-color: #fff;
        padding: 42rpx 4rpx 40rpx 4rpx;
        border-bottom: 1rpx #f2f2f2 solid;
    }

    .user-info-star {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .user-info {
            display: flex;
            align-items: center;
            img {
                width: 56rpx;
                height: 56rpx;
                border-radius: 28rpx;
                margin-right: 30rpx;
            }
            div {
                height: 42rpx;
                line-height: 42rpx;
                font-size: 30rpx;
                color: #333333;
            }
        }
        .user-star {
            display: flex;
            img {
                width: 28rpx;
                height: 28rpx;
                margin-right: 7rpx;
            }
        }
    }

    .shop-time-rule {
        display: flex;
        margin-top: 24rpx;
        height: 37rpx;
        font-size: 26rpx;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 37rpx;
    }

    .comment-content {
        font-size: 26rpx;
        line-height: 36rpx;
        color: #000000;
        margin-top: 30rpx;
        word-break: break-word;
        .comment-pic {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            margin-top: 30rpx;
            img {
                width: 230rpx;
                height: 230rpx;
                margin-bottom: 6rpx;
                margin-right: 6rpx;
            }
            img:nth-of-type(3n+0) {
                width: 230rpx;
                height: 230rpx;
                margin-bottom: 6rpx;
                margin-right: 0rpx;
            }
        }
    }

    .reply-content {
        .triangle {
            width: 0rpx;
            height: 0rpx;
            border-width: 28rpx;
            border-style: solid;
            border-color: transparent transparent #F8F8F8 transparent;
            margin-left: 60rpx;
        }
        .reply-content-background {
            background: #F8F8F8;
            padding: 37rpx 0rpx 0rpx 0rpx;
            .reply-content-item {
                padding: 0 10rpx;
                font-size: 26rpx;
                color: #878787;
                line-height: 37rpx;
            }
            .comment-pic {
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                margin-top: 31rpx;
                img {
                    width: 230rpx;
                    height: 230rpx;
                    margin-bottom: 6rpx;
                    margin-right: 6rpx;
                }
                img:nth-of-type(3n+0) {
                    width: 230rpx;
                    height: 230rpx;
                    margin-bottom: 6rpx;
                    margin-right: 0rpx;
                }
            }
        }
    }

</style>
