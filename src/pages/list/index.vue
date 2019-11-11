<template>
  <div>
    <div class="header"
         :style="{position:isScroll?'static':'fixed'}">
      <!-- <div class="search">
        <icon type="search"
              size="18"></icon>
        <input type="text"
               v-model="keyword"
               confirm-type="search"
               @confirm="reload">
      </div> -->
      <Search :query="keyword"
              @confirm='inputHandle' />
      <!-- 导航 -->
      <ul class="nav">
        <li v-for="(item,index) in navArr"
            :key="index"
            @click="activeIndex=index"
            :class="{active:activeIndex===index}">{{item}}</li>
      </ul>

    </div>
    <!-- 商品列表 -->
    <ul class="goodsList"
        :style="{marginTop:isScroll?'0':'220rpx'}">
      <li v-for="(item,index) in searchList"
          :key="index"
          @click="toDetail(item.goods_id)">
        <img :src="item.goods_big_logo"
             :alt="item.goods_name">
        <div class="right">
          <p class="text-line2">{{item.goods_name}}</p>
          <p class="price">￥<span>{{item.goods_price}}</span>.00</p>
        </div>
      </li>
    </ul>
    <p class="tip"
       v-show="isLastPage">--主人，洒家也是有底线的--</p>
  </div>
</template>

<script>
import Search from '@/components/search'
const PAFE_SIZE = 6
export default {
  components: {
    Search
  },
  data () {
    return {
      navArr: [
        '综合',
        '销量',
        '价格'
      ],
      activeIndex: 0,
      keyword: '',
      searchList: [],
      isLastPage: false,
      isScroll: false
    }
  },
  onLoad (options) {
    // console.log(options)
    // 重新点击，将获取到的keyword进行渲染页面
    this.keyword = options.keyword
    // this.search()
    // this.pageNum = 1
    this.reload()
    this.isRequest = false
  },
  onPullDownRefresh () {
    this.reload()
    this.isScroll = true
  },
  // 上拉加载下一页
  onReachBottom () {
    this.pageNum++
    this.search()
  },
  methods: {
    toDetail (goodsId) {
      // console.log(goodsId)
      wx.navigateTo({
        url: `/pages/item/main?goodsId=${goodsId}`
      })
    },
    inputHandle (value) {
      // console.log(value)
      this.keyword = value
      this.reload()
    },
    reload () {
      this.isLastPage = false
      this.searchList = [] // 清空
      this.pageNum = 1
      this.search()
    },
    search () {
      // 如果请求中或者是最后一页，则不请求
      if (this.isRequest || this.isLastPage) {
        return
      }
      this.isRequest = true
      this.$request({
        url: '/api/public/v1/goods/search',
        data: {
          query: this.keyword,
          pagesize: PAFE_SIZE,
          pagenum: this.pageNum
        }
      }).then(res => {
        // console.log(res)
        const { message } = res.data
        this.searchList = [...this.searchList, ...message.goods]
        // console.log(res.data.message.total)
        // console.log(message.total)

        if (this.searchList.length === message.total) {
          this.isLastPage = true
        }
      }).finally(() => {
        this.isRequest = false
      })
    }
  }
}
</script>

<style lang='less' scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
}
.search {
  background-color: #eee;
  color: #eee;
  padding: 16rpx;
  height: 120rpx;
  font-size: 28rpx;
  display: flex;
  align-items: center;
  position: relative;
  icon {
    position: absolute;
    left: 32rpx;
  }
  input {
    background-color: #fff;
    width: 100%;
    height: 60rpx;
    border: 1rpx solid #eee;
    padding-left: 88rpx;
    border-radius: 12rpx;
  }
}
.nav {
  display: flex;
  height: 100rpx;
  border: 1rpx solid #eee;
  line-height: 100rpx;
  position: relative;
  background-color: #fff;
  justify-content: space-around;
  .active {
    color: chocolate;
  }
}
.goodsList {
  li {
    height: 267rpx;
    border-bottom: 1rpx solid #ddd;
    display: flex;
    align-items: center;
    img {
      width: 200rpx;
      height: 200rpx;
      margin: 0 24rpx 0 20rpx;
    }
    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .price {
        color: #eb4450;
        font-size: 12px;
        margin-top: 54rpx;
        span {
          font-size: 24px;
        }
      }
    }
  }
}
.tip {
  text-align: center;
  color: #ccc;
}
</style>