<template>
  <div class="wrapper">

    <swiper class="swiper"
            indicator-dots
            autoplay
            circular
            indicator-color="#ccc"
            indicator-active-color="#fff">
      <block>
        <swiper-item v-for="(item,index) in goodsDetail.pics"
                     :key="index">
          <img @click="previewImgs(item.pics_big_url,goodsDetail.pics)"
               class="swiper-img"
               :src="item.pics_big_url"
               alt="">
        </swiper-item>
      </block>
    </swiper>
    <!-- 商品信息 -->
    <div class="goods-info">
      <p class="price">￥{{goodsDetail.goods_price}}</p>
      <div class="name-favo">
        <p class="name">{{goodsDetail.goods_name}}</p>
        <div class=favo>
          <span class="iconfont icon-fenxiang"></span>
          <span>分享</span>
          <button open-type="share">分享</button>
        </div>
      </div>
      <p class="express">快递: 免运费</p>
    </div>
    <div class="promote">
      <ul>
        <li>
          <span class="name">促销</span>
          <span class="detail">满300减30元</span>
        </li>
        <li class="brother">
          <span class="name">已选</span>
          <span class="detail gray">黑色/S/1件</span>
        </li>
      </ul>
    </div>
    <!-- 图文介绍 -->
    <div class="goods-detail">
      <div class="tabs">
        <span v-for="(item,index) in tabArr"
              :key="index"
              @click="activeIndex=index"
              :class="{active:activeIndex === index}">{{item}}</span>
      </div>
      <div class="main">
        <div v-show="activeIndex==0"
             v-html="goodsDetail.goods_introduce">图文介绍</div>
        <div v-show="activeIndex">商品参数</div>
      </div>
    </div>
    <div class="fixed-bottom">
      <div class="icon-text">
        <span class="iconfont icon-kefu"></span>
        <span>联系客服</span>
        <button open-type="contact"
                bindcontact="handleContact">联系客服</button>
      </div>
      <div class="icon-text"
           @click="toCart">
        <span class="iconfont icon-shopcart"></span>
        <span>购物车</span>
      </div>
      <div class="btn add-cart-btn"
           @click="add2Cart">加入购物车</div>
      <div class="btn buy-btn">立即购买</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 从list页面传过来的商品id
      goodsId: '',
      // 获取到的商品详情信息
      goodsDetail: {},
      activeIndex: 0,
      tabArr: [
        '图文介绍', '规格参数'
      ]
    }
  },
  onLoad (options) {
    // console.log(options.goodsId)
    this.goodsId = options.goodsId
    this.getDetailData()
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onShareAppMessage: function () {
    // return custom share data when user share.
    return {
      title: this.goodsDetail.goods_name
    }
  },
  handleContact (e) {
    console.log(e.detail.path)
    console.log(e.detail.query)
  },
  methods: {
    getDetailData () {
      // console.log(this.goodsId)
      this.$request({ url: `/api/public/v1/goods/detail?goods_id=${this.goodsId}` }).then(res => {
        // console.log(res)
        const { meta: { status }, message } = res.data
        // console.log(status, message)
        // console.log('id:', message.goods_id)
        if (status === 200) {
          this.goodsDetail = message
          // console.log(this.goodsDetail)
        }
      })
    },
    previewImgs (current, imgs) {
      let urls = []
      imgs.forEach(v => {
        urls.push(v.pics_big_url)
      })
      wx.previewImage({
        current, // 当前显示图片的http链接
        urls// 需要预览的图片http链接列表
      })
    },
    // 添加购物车
    add2Cart () {
      let cart = wx.getStorageSync('cart') || {}// object
      let goodsId = this.goodsDetail.goods_id

      if (cart[goodsId]) {
        cart[goodsId] = {
          num: cart[goodsId].num + 1,
          checked: true
        }
      } else {
        // 初次添加，数量为1，默认勾选状态
        cart[goodsId] = {
          num: 1,
          checked: true
        }
      }
      wx.setStorageSync('cart', cart)
    },
    // 跳转到购物车页面
    toCart () {
      wx.switchTab({
        url: '/pages/cart/main'
      })
    }
  }
}
</script>
<style lang="less">
// // 用这个 哦
// 新的接口地址为  https://uinav.com/api/public/v1/home/swiperdata
// 新的appid为：wx38d8faffac4d34d2
.wrapper {
  background-color: #f4f4f4;
  padding-bottom: 98rpx;
}

.swiper {
  height: 720rpx;
}

.swiper-img {
  width: 100%;
  height: 720rpx;
}

.goods-info {
  padding: 40rpx 0 30rpx 20rpx;
  background-color: #fff;

  .price {
    color: #eb4450;
    font-size: 40rpx;
  }

  .name-favo {
    display: flex;
    height: 78rpx;
    margin-top: 14rpx;

    .name {
      color: #333;
      flex: 1;
      font-size: 28rpx;
      padding-right: 78rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; // 控制多行的行数
      -webkit-box-orient: vertical;
    }

    .favo {
      border-left: 1px solid #ddd;
      width: 144rpx;
      color: #999;
      font-size: 24rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;

      button {
        position: absolute;
        opacity: 0;
      }
    }
  }

  .express {
    color: #999;
    font-size: 24rpx;
    margin-top: 20rpx;
  }
}

.promote {
  margin-top: 20rpx;

  li {
    background-color: #fff;
    height: 96rpx;
    line-height: 96rpx;
    font-size: 28rpx;
    margin-top: 20rpx;
    padding-left: 20rpx;

    &.brother {
      margin-top: 0;
    }

    .name {
      color: #404040;
    }

    .detail {
      color: #ff4055;
      margin-left: 40rpx;

      &.gray {
        color: #dfdfdf;
      }
    }
  }
}

.goods-detail {
  margin-top: 20rpx;
  background-color: #fff;

  .tabs {
    display: flex;

    span {
      flex: 1;
      text-align: center;
      color: #404040;
      font-size: 22rpx;
      height: 100rpx;
      line-height: 100rpx;
      box-sizing: border-box;

      &.active {
        color: #ff4055;
        border-bottom: 10rpx solid #ff2644;
      }
    }
  }
}

.fixed-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 98rpx;
  display: flex;
  background-color: #fff;

  .icon-text {
    flex: 2;
    font-size: 20rpx;
    color: #404040;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;

    button {
      position: absolute;
      opacity: 0;
    }
  }

  .btn {
    flex: 3;
    color: #fff;
    text-align: center;
    line-height: 98rpx;

    &.add-cart-btn {
      background-color: #ffb400;
    }

    &.buy-btn {
      background-color: #ff2d4a;
    }
  }
}
</style>