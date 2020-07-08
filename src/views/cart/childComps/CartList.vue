<template>
    <div class="cart-list">
      <scroll class="content" ref="scroll">
<!--         快速输入li  ：li{内容}*n 再按tab键-->
        <cart-list-item
          v-for="(item,index) in cartList"
          :key="index"
          :item-info="item"/>
      </scroll>
    </div>
</template>

<script>
  import Scroll from "../../../components/common/scroll/Scroll";
  import CartListItem from "./CartListItem";

  import {mapGetters}  from 'vuex'
    export default {
        name: "CartList",
      components:{
        Scroll,
        CartListItem
      },
      computed:{
          ...mapGetters(['cartList'])
      },
      activated() {
          this.$refs.scroll.refresh()
      }
    }
</script>

<style scoped>
  .cart-list{
    height: calc(100% - 44px - 49px - 40px) ;
  }
.content{
  height: 100%;
  overflow: hidden;
}

</style>
