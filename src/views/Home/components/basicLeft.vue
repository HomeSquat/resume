<template>
 <div class="basic-left">
  <div class="left">
  <accordion labelHeight="50" height="500" :list="accordionList"></accordion>
  </div>
  <div ref="right" class="right">
    <ul ref="userInfo" class="user--info">
      <li v-for="(base,index) in userInfoBasic.base" :key="index" class="user--info__item">
        <span class="label">{{base.baseLabel}}:</span>
        <span class="value">{{base.baseValue}}</span>
      </li>
      <ul class="user--info__expect">
        <li v-for="(expect,index) in userInfoBasic.expect" :key="index" class="expect--item">
            <span class="label">{{expect.expectLabel}}:</span>
            <span class="value">{{expect.expectValue}}</span>
        </li>
      </ul>
    </ul>
    <!-- <baidu-map class="map" style="width:500px;height:700px">
    </baidu-map> -->
    <div class="map">
      <div ref="container"></div>
    </div>
  </div>
 </div>
</template>

<script>
import loadBMap from '../loadMap';
import accordion from '@/components/accordion.vue';

export default {
  name: '',
  props: {
    userInfoBasic: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      myMap: null,
      accordionList: [
        {
          label: '手风琴一',
          content: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
        },
        {
          label: '手风琴二',
          content: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
        },
        {
          label: '手风琴三',
          content: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
        },
      ],
    };
  },
  created() {
    this.initMap(
      this.userInfoBasic.residence.baiduAK,
      this.userInfoBasic.residence.baiduStyleID,
      { x: this.userInfoBasic.residence.point.x, y: this.userInfoBasic.residence.point.y },
      this.userInfoBasic.residence.text,
    );
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.container.style.height = `${this.$refs.right.clientHeight - this.$refs.userInfo.clientHeight - 70}px`;
    });
  },
  components: {
    accordion,
  },
  methods: {
    initMap(AK, styleID, p, residence) {
      /* eslint-disable */
      loadBMap(AK)
        .then(() => {
          // 百度地图API功能
          let point = new BMap.Point(p.x,p.y); // 当前居住地坐标点
          let marker = new BMap.Marker(point); // 标注
          let opts = {
            width : 150,     // 信息窗口宽度
            height: 80,     // 信息窗口高度
            title : "现居地:" , // 信息窗口标题
          }
          var infoWindow = new BMap.InfoWindow(residence, opts);  // 创建信息窗口对象
          this.myMap = new BMap.Map(this.$refs.container); // 创建Map实例
          this.myMap.centerAndZoom(point, 13); // 初始化地图,设置中心点坐标和地图级别
          this.myMap.addOverlay(marker)
          this.myMap.setMapStyleV2({
            styleId: styleID
          });
          
          this.myMap.openInfoWindow(infoWindow,point); //开启信息窗口
          marker.addEventListener("click", ()=>{
            this.myMap.openInfoWindow(infoWindow,point); //开启信息窗口
          });
          this.myMap.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
        })
        .catch((err) => {
          console.log('地图加载失败');
        });
        /* eslint-disable */
    }
  }
};
</script>

<style scoped lang="stylus">
.basic-left
  display flex
  justify-content space-between
  padding 60px 40px
  .left
    width 50%
    border:15px solid;
    border-image url("../../../assets/img/border.png") 20 stretch
  .right
    width 50%
    padding-left 20px
    .user--info
      position relative
      width 100%
      padding 10px
      border:15px solid;
      border-image url("../../../assets/img/border.png") 20 stretch
      .label
          display inline-block
          width 80px
          margin-right 10px
      .user--info__expect
        position absolute
        top 10px
        right 10px
        .expect--item
          line-height 40px
        .label
          width 120px
          color #FF9933
      .user--info__item
        line-height 40px
        .label
          color rgb(2, 179, 225)
    .map
      // height 400px
      margin-top 10px
      border:15px solid;
      border-image url("../../../assets/img/border.png") 20 stretch
</style>
