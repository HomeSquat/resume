<template>
 <ul class="accordion" :style="{height: height+'px'}">
  <li
    v-for="(accdionItem ,index) in accordionList"
    :key="index"
    :style="{background: accdionItem.background,color: accdionItem.color}"
    class="accordion--item">
    <label
      @click="check(index)"
      :style="{height: labelHeight+'px',lineHeight: labelHeight+'px'}"
      class="label" >
        <span>{{accdionItem.label}}</span>
        <span :class="index == currentIndexTemp ? 'active':''" class="icon iconfont iconjiantou"></span>
      </label>
    <div
      :style="{height: accdionItem.contentHeight+'px'}"
      class="content">
      <div v-html="accdionItem.content"></div>
    </div>
  </li>
 </ul>
</template>

<script>
export default {
  name: '',
  props: {
    height: {
      type: [String, Number],
      required: true,
    },
    labelHeight: {
      type: [String, Number],
      required: true,
    },
    currentIndex: {
      type: [String, Number],
      default: '0',
    },
    list: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    colorList: {
      type: Array,
      default() {
        return [
          {
            background: 'rgba(4, 75, 190,.2)',
            color: '#fff',
          },
        ];
      },
    },
  },
  data() {
    return {
      accordionList: [],
      contentHeight: Number(this.height) - Number(this.labelHeight) * this.list.length,
      currentIndexTemp: this.currentIndex,
    };
  },
  created() {
    this.list.forEach((item, index) => {
      const colorItem = this.colorList[index % this.colorList.length];
      // eslint-disable-next-line
      if (index == this.currentIndex) {
        this.accordionList.push({
          label: item.label,
          content: item.content,
          contentHeight: this.contentHeight,
          background: colorItem.background,
          color: colorItem.color,
        });
      } else {
        this.accordionList.push({
          label: item.label,
          content: item.content,
          contentHeight: 0,
          background: colorItem.background,
          color: colorItem.color,
        });
      }
    });
  },
  components: {

  },
  methods: {
    check(index) {
      this.accordionList[this.currentIndexTemp].contentHeight = 0;
      this.accordionList[index].contentHeight = this.contentHeight;
      this.currentIndexTemp = index;
    },
  },
};
</script>

<style scoped lang="stylus">
.accordion
  .label
    position relative
    display block
    box-sizing border-box
    width 100%
    padding-left 10px
    box-shadow 0 -1px 3px 0px rgba(0,0,0,.2)
    cursor pointer
    .icon
      position absolute
      top 50%
      right 20px
      transform translateY(-50%) rotate3d(0,0,1,-90deg)
      transition all .3s 
      &.active
        transform translateY(-50%) rotate3d(0,0,1,0deg)
  .content
    padding 0 20px
    overflow hidden
    transition height .3s
</style>
