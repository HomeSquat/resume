<template>
  <div class="home">

    <div class="navigation">
      <div v-for="(item,index) in scrollList"
          :key="index"
          :class="[option.colorList[index],scrollIndex === index ? 'active' : '']"
          @click="navTo(item.top)"
          class="nav--item">
        <div class="icon"></div>
        <div class="label">{{item.label}}</div>
      </div>
    </div>

    <!-- S 详细信息 -->
    <div class="details">
      <canvas id="canvas" class="canvas"></canvas>
      <div ref="detailsCenter" class="details--center wrapper">
        <div class="content">
          <detailCenter
            v-if="userInfo.detail"
            :detail="userInfo.detail"
            @load="load">
          </detailCenter>
        </div>
      </div>
    </div>
    <!-- E 详细信息 -->

    <!-- S 基本信息 -->
    <div
      ref="basic"
      :class="{active: option.basicActive}"
      class="basic">
      <basicLeft
        :userInfoBasic="userInfo.basic"
        class="basic--left">
      </basicLeft>
      <!-- / 左侧具体展示部分 -->

      <basicRight
        v-if="userInfo.basic"
        :userInfoBasic="userInfo.basic"
        @changeActive="changeActive"
        class="basic--right">
      </basicRight>
      <!-- / 右侧初始展示部分 -->

    </div>
    <!-- E 基本信息 -->
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import basicRight from './components/basicRight.vue';
import basicLeft from './components/basicLeft.vue';
import detailCenter from './components/detailsCenter.vue';
import './ion';

export default {
  name: 'home',
  components: {
    basicRight,
    basicLeft,
    detailCenter,
  },
  data() {
    return {
      option: {
        scroll: null,
        scrollY: 0,
        basicActive: false,
        colorList: ['color1', 'color2', 'color3', 'color4'],
      },
      scrollList: [],
      scrollList2: [],
      userInfo: {},
    };
  },
  computed: {
    scrollIndex() {
      for (let i = 0; i < this.scrollList2.length; i++) {
        const top1 = this.scrollList2[i].top;
        const top2 = this.scrollList2[i + 1] ? this.scrollList2[i + 1].top : null;
        if (this.option.scrollY >= top1 && this.option.scrollY < top2) {
          return i;
        }
        if (!top2) {
          return i - 1;
        }
      }
      return 0;
    },
  },
  created() {
    this.getUserInfo();
  },
  mounted() {
    const width = document.body.clientWidth * 0.8;
    // eslint-disable-next-line
    const ion = new Ion('canvas', { pointNum: 200, canvasWidth: width });
    this.initScroll();
  },
  methods: {
    /**
     * 左侧基本信息页面弹出缩进切换
     */
    changeActive(flag) {
      this.option.basicActive = flag;
    },
    /**
     * 初始化右侧详情部分滚动列表
     */
    initScroll() {
      this.option.scroll = new BScroll(this.$refs.detailsCenter, {
        disableMouse: true,
        probeType: 3,
        // preventDefault: false,
        scrollbar: {
          fade: true,
          interactive: false, // 1.8.0 新增
        },
        mouseWheel: {
          speed: 20,
          invert: false,
          easeTime: 300,
        },
      });
      this.option.scroll.on('scroll', (e) => {
        this.option.scrollY = Math.abs(Math.round(e.y));
      });
    },
    /**
     * 获取用户信息
     */
    getUserInfo() {
      this.$axios.get('userConfig/userInfo.json')
        .then((response) => {
          this.userInfo = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /**
     * 点击右侧导航，页面滚动到对应位置
     */
    navTo(top) {
      this.option.scroll.scrollTo(0, -top + 10, 300);
    },
    /**
     * 详情加载完成
     */
    load(e) {
      this.scrollList = e;
      const first = [{
        id: 'index',
        label: 'index',
        top: 0,
      }];
      this.scrollList2 = first.concat(e);
      // this.scrollList2.unshift({
      //   id: 'index',
      //   label: 'index',
      //   top: 0,
      // });
    },
  },
};
</script>

<style lang="stylus" scoped>
.home
  position relative
  height 100%
  .navigation
    position fixed
    top 30%
    right 0
    z-index 9
    .nav--item
      position relative
      height 30px
      padding 0 10px 0 40px
      margin 10px 0
      border-bottom-left-radius 50px
      border-top-left-radius 50px
      cursor pointer
      transition all .3s
      &.active
        transform translate(80px,0)
      &.color1
        background #4cae4c
      &.color2
        background #39b3d7
      &.color3
        background #e23794
      &.color4
        background #f0ad4e
      .icon
        position absolute
        top 0
        left 0
        width 20px
        height 20px
      .label
        line-height 30px
        color #fff
  .details
    width 100%
    height 100%
    padding-left 20%
    // background rgb(18, 37, 49)
    background rgb(36,36,36)
    // background #333
    color #fff
    overflow hidden
    .canvas
      position fixed
      left 20%
      top 0
      z-index 1
    .details--center
      position relative
      z-index 9
      width 900px
      height 100%
      margin 0 auto
      // background rgb(36,36,36)
  .basic
    display flex
    justify-content space-between
    position absolute
    top 0
    left 0
    transform translate3d(-80%,0,0)
    z-index 9
    width 100%
    height 100%
    padding-left 5%
    background rgb(22, 28, 35)
    color #fff
    box-shadow 1px 0 8px 0 rgba(0,0,0,.2)
    transition all .3s
    &:hover
      box-shadow 2px 0 15px 0 rgba(0,0,0,.2)
    &.active
      transform translate3d(-5%,0,0)
  .basic--right
    width 21%
  .basic--left
    width 79%
</style>
