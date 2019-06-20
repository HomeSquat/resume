<template>
  <div class="home">
    <!-- S 详细信息 -->
    <div class="details">
      <div ref="detailsCenter" class="details--center wrapper">
        <detailCenter class="content"></detailCenter>
      </div>
    </div>
    <!-- E 详细信息 -->

    <!-- S 基本信息 -->
    <div class="basic"
      :class="{active: option.basicActive}">
      <div class="basic--left">
        左侧
      </div>
      <!-- / 左侧具体展示部分 -->

      <basicRight
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
import detailCenter from './components/detailsCenter.vue';

export default {
  name: 'home',
  components: {
    basicRight,
    detailCenter,
  },
  data() {
    return {
      option: {
        basicActive: false,
      },
      userInfo: {},
    };
  },
  created() {
    this.getUserInfo();
  },
  mounted() {
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
      const scroll = new BScroll(this.$refs.detailsCenter, {
        disableMouse: true,
        // preventDefault: false,
        scrollbar: {
          fade: true,
          interactive: true, // 1.8.0 新增
        },
        mouseWheel: {
          speed: 20,
          invert: false,
          easeTime: 300,
        },
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
  },
};
</script>

<style lang="stylus" scoped>
.home
  position relative
  height 100%
  .details
    width 100%
    height 100%
    padding-left 20%
    // background rgb(18, 37, 49)
    background rgb(36,36,36)
    // background #333
    color #fff
    overflow hidden
    .details--center
      width 900px
      height 100%
      margin 0 auto
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

</style>
