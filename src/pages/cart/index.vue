<template>
  <div class="content">
    <div class="title">
      <span class="iconfont icon-shop"></span>
      <span>优购生活馆</span>
    </div>
    <!-- 商品列表 -->
    <ul class="goods-list">
      <li class="goods-item"
          v-for="item in goodsList"
          :key="item.goods_id">
        <span class="iconfont"
              :class="item.checked?'icon-checked':'icon-unChecked'"
              @click="item.checked=!item.checked"></span>
        <img :src="item.goods_small_logo"
             alt="">
        <div class="right">
          <p class="text-line2">{{item.goods_name}}</p>
          <div class="btm">
            <span class="price">￥<span>{{item.goods_price}}</span>.00</span>
            <div class="goods-num">
              <button @click="item.num--"
                      :disabled="item.num<2">-</button>
              <span>{{item.num}}</span>
              <button @click="item.num++">+</button>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="account">
      <div class="select-all">
        <span class="iconfont"
              :class="isAll?'icon-checked':'icon-unChecked'"
              @click="isAll=!isAll"></span>
        <span>全选</span>
      </div>

      <div class="price">
        <p>合计:<span class="num">￥{{totalPrice}}.00</span></p>
        <p class="info">包含运费</p>
      </div>
      <div class="account-btn"
           @click="doAccount">结算({{totalCount}})</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // cart: [],
      goodsList: []
      // isAll: true
    }
  },
  onShow () {
    let cart = wx.getStorageSync('cart') || {}
    // console.log(Object.keys(this.cart).join(','))
    this.getGoodsList(cart)
  },
  // 当页面切换的时候保存当前的数据（可保存数据修改但未支付的状态）
  onHide () {
    let cart = {}
    // console.log(this.goodsList)
    this.goodsList.forEach(v => {
      cart[v.goods_id] = {
        num: v.num,
        checked: v.checked
      }
    })
    wx.setStorageSync('cart', cart)
  },
  computed: {
    isAll: {
      get () {
        return this.goodsList.every(v => {
          return v.checked
        })
      },
      set (newValue) {
        // console.log(newValue)
        this.goodsList.forEach(v => {
          v.checked = newValue
        })
      }
    },
    // 计算商品数量
    totalCount () {
      // let sum = 0
      // this.goodsList.forEach(v => {
      //   sum += v.num
      // })
      // return sum
      return this.goodsList.reduce((sum, item) => {
        return sum + (item.checked ? item.num : 0)
      }, 0)
    },
    totalPrice () {
      return this.goodsList.reduce((sum, v) => {
        return sum + (v.checked ? v.num * v.goods_price : 0)
      }, 0)
    }
  },
  methods: {
    // 结算
    doAccount () {
      // console.log(this.totalCount)
      if (!this.totalCount) {
        this.$showToast('请添加商品')
        return
      }
      // let token = wx.getStorageSync('token')
      // if (!token) {
      //   wx.navigateTo({
      //     url: '/pages/login/main'
      //   })
      //   return
      // }
      wx.navigateTo({
        url: '/pages/pay/main'
      })
    },
    // 从商品详情跳转到购物车，获取到当前的ids,显示到页面
    getGoodsList (cart) {
      let ids = Object.keys(cart).join(',')
      this.$request({
        url: '/api/public/v1/goods/goodslist?goods_ids=' + ids
      }).then(res => {
        // console.log(res)
        let { message } = res.data
        // 对goodsList动态添加cart里面的属性
        let goodsList = message
        goodsList.forEach(v => {
          let obj = cart[v.goods_id]
          v.num = obj.num
          v.checked = obj.checked
        })
        this.goodsList = goodsList
      })
    }

  }
}
</script>

<style lang="less">
.title {
  height: 88rpx;
  display: flex;
  align-items: center;
  .iconfont {
    color: #999;
    margin: 6rpx 12rpx 0 32rpx;
  }
}

.goods-item {
  height: 206rpx;
  background-color: #fff;
  border-top: 1rpx solid #ddd;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  .iconfont {
    color: #eb4450;
    margin: 0 30rpx;
  }
  img {
    width: 160rpx;
    height: 160rpx;
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 0 20rpx 0 18rpx;
    .btm {
      display: flex;
      margin-top: 40rpx;
      justify-content: space-between;
      .price {
        color: #eb4450;
        > span {
          font-size: 24px;
        }
      }
      .goods-num {
        display: flex;
        align-items: center;
        button {
          width: 60rpx;
          height: 50rpx;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 4rpx solid #666;
        }
        span {
          margin: 0 30rpx;
        }
      }
    }
  }
}
.goods-list {
  position: absolute;
  bottom: 98rpx;
  top: 88rpx;
  width: 100%;
  overflow: auto;
  padding-bottom: 60rpx;
  background-color: #f4f4f4;
}

.account {
  height: 98rpx;
  border-bottom: 1rpx solid #ddd;
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  .iconfont {
    color: #eb4450;
    margin: 0 30rpx;
  }
  .account-btn {
    width: 230rpx;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: #eb4450;
  }
  .select-all {
    flex: 1;
  }
  .price {
    margin-right: 20rpx;
    .num {
      color: #eb4450;
    }
    .info {
      color: #999;
    }
  }
}
.iconfont {
  font-size: 20px;
}
</style>