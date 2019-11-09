<template>
  <div>
    <search />
    <!-- swiper -->
    <swiper indicator-dots
            autoplay
            circular
            indicator-active-color="#fff">
      <block>
        <swiper-item v-for="(item,index) in imgList"
                     :key="index">
          <img :src="item.image_src"
               alt="">
        </swiper-item>
      </block>
    </swiper>
    <!-- category -->
    <div class="category">
      <img v-for="(item,index) in categoryList"
           :key="index"
           :src="item.image_src"
           alt="">
    </div>
    <!-- floor -->
    <ul class="floor">
      <li v-for="(item,index) in floorList"
          :key="index">
        <img :src="item.floor_title.image_src"
             alt="">
        <div class="imgcontent">
          <img :src="item.product_list[0].image_src" />
          <div class="right">
            <img :src="item.product_list[1].image_src"
                 alt="">
            <img :src="item.product_list[2].image_src"
                 alt="">
            <img :src="item.product_list[3].image_src"
                 alt="">
            <img :src="item.product_list[4].image_src"
                 alt="">
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import search from '../../components/search'
export default {
  components: {
    search
  },
  data () {
    return {
      // 轮播图
      imgList: [],
      // 分类
      categoryList: [],
      // 楼层
      floorList: []
    }
  },
  onLoad () {
    this.getSwiper()
    this.getCategoryList()
    this.getFloorList()
  },
  methods: {
    getSwiper () {
      this.$request({ url: '/api/public/v1/home/swiperdata' }).then(res => {
        // console.log(res)
        this.imgList = res.data.message
      })
    },
    // category
    getCategoryList () {
      this.$request({ url: '/api/public/v1/home/catitems' }).then(res => {
        // console.log(res)
        const { meta: { status }, message } = res.data
        // console.log(status, message)
        if (status === 200) {
          this.categoryList = message
        }
      })
    },
    // getFloorList
    getFloorList () {
      this.$request({ url: '/api/public/v1/home/floordata' }).then(res => {
        console.log(res.data)
        const { meta: { status }, message } = res.data
        if (status === 200) {
          this.floorList = message
        }
      })
    }
  }
}
</script>

<style lang="less">
swiper {
  margin-top: -2rpx;
  img {
    width: 100%;
    height: 100%;
  }
}
.category {
  height: 194rpx;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  img {
    width: 120rpx;
    height: 140rpx;
  }
}
.floor {
  > li > img {
    height: 88rpx;
  }
  .imgcontent {
    padding: 16rpx;
    display: flex;
    flex-wrap: wrap;
    margin-top: 20rpx;
    > img {
      width: 232rpx;
      height: 386rpx;
    }
    .right {
      flex: 1;
      > img {
        width: 236rpx;
        height: 184rpx;
        margin-left: 10rpx;
      }
    }
  }
}
</style>