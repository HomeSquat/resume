<template>
 <div class="detail-center">
   <h1 class="title">开始的开始</h1>
   <div class="content">
     <div class="content--item">
       <h2 class="content--item__title">哈哈</h2>
       <p class="content--item__des">有习惯喷香水、古龙水的朋友们，应该都了解气味可以制造出别人对自己的印象，人家都说嗅觉、味觉的记忆是更加深刻和长久的！微软显然也想要让大家对自家的Xbox 在玩家中有些不同的印象，这次很特别的与洗沐浴用品厂商 Lynx联手，推出「Xbox 味道」的系列产品，真的非常特别，套组中包含沐浴乳、除臭剂和身体喷雾，到底「Xbox 味道」会是怎么样呢？</p>
     </div>
   </div>
 </div>
</template>

<script>
export default {
  name: 'detailCenter',
  data() {
    return {

    };
  },
  components: {

  },
};
</script>

<style scoped lang="stylus">
.detail-center
  padding 40px 0
  .title
    margin-bottom 40px
    letter-spacing 10px
    text-align center
  .content--item
    .content--item__title
      color rgb(57, 179, 215)
    .content--item__des
      text-indent 40px
      line-height 24px
      letter-spacing 2px
      font-size 18px
      color #ccc
</style>
