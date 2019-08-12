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
      class="label" >{{accdionItem.label}}</label>
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
            background: '#4cae4c',
            color: '#fff',
          },
          {
            background: '#39b3d7',
            color: '#fff',
          },
          {
            background: '#e23794',
            color: '#fff',
          },
          {
            background: '#f0ad4e',
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
      textHeight1: '200px',
      textHeight2: '0',
      textHeight3: '0',
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
    display block
    width 100%
  .content
    padding-left 20px
    overflow hidden
    transition height .3s
</style>
