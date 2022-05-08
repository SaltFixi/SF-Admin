<template>
  <div>
    <baidu-map id="allmap" ak="YOUR_APP_KEY" :scroll-wheel-zoom="true" @ready="mapReady">
      <bm-info-window :position="point" :show="show" @close="infoWindowClose" @open="infoWindowOpen">
        <div style="color:mediumpurple">我在这里哦!</div>
      </bm-info-window>
    </baidu-map>
  </div>
</template>

<script>
import { BaiduMap, BmInfoWindow } from 'vue-baidu-map'
export default {
  components: {
    BaiduMap,
    BmInfoWindow
  },

  data() {
    return {
      point: {},
      show: false
    }
  },

  methods: {
    mapReady({ BMap, map }) {
      // 选择一个经纬度作为中心点
      this.point = new BMap.Point(114.35423254966736, 30.477018207629307)
      map.centerAndZoom(this.point, 12)
      // 引入图片
      const myicon = new BMap.Icon(
        require('@/assets/img/user.jpg'),
        new BMap.Size(50, 50), // 视窗大小
        {
          imageSize: new BMap.Size(50, 50), // 显示图标大小(根据实际大小等比例缩放)
          imageOffset: new BMap.Size(0, 0) // 图片相对视窗的偏移
        }
      )
      const marker = new BMap.Marker(this.point, { icon: myicon })
      // 创建点
      map.addOverlay(marker)

      marker.addEventListener('click', () => {
        this.infoWindowOpen()
      })
    },
    infoWindowClose () {
      this.show = false
    },
    infoWindowOpen () {
      this.show = true
    }
  }
}
</script>

<style lang="less" scoped>
#allmap {
  height: 650px;
  width: 100%;
  margin: 0 auto;
}
</style>
