<template>
  <div class="home">

    <!-- S 详细信息 -->
    <div class="details">
      详细信息
    </div>
    <!-- E 详细信息 -->

    <!-- S 基本信息 -->
    <div class="basic"
      :class="{active: option.basicActive}"
      @click="changeActive">
      <div class="basic--left">
        左侧
      </div>
      <div class="basic--right">
        右侧
      </div>
    </div>
    <!-- E 基本信息 -->
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
  },
  data() {
    return {
      option: {
        basicActive: false,
      },
    };
  },
  created() {
  },
  methods: {
    changeActive() {
      this.option.basicActive = !this.option.basicActive;
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
    // background #99CCFF
    box-shadow 1px 0 8px 0 rgba(0,0,0,.2)
    transition all .3s
    &:hover
      box-shadow 2px 0 15px 0 rgba(0,0,0,.2)
    &.active
      transform translate3d(-5%,0,0)
    .basic--right
      width 21%
      cursor pointer
</style>
