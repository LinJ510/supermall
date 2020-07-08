<template>
  <div class="cart">
    <!--导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <!--商品的列表-->
      <cart-list/>

    <!--底部汇总-->
      <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CheckButton from "../../components/content/checkButton/CheckButton";
  import CartBottomBar from "./childComps/CartBottomBar";

  import {mapGetters} from 'vuex'

    export default {
        name: "cart",
      components:{

        NavBar,
        CartList,
        CheckButton,
        CartBottomBar
      },
      computed:{
          // cartLength(){
          //   return this.$store.getters.cartLength
          // }

        //两种语法：直接引入
        //...mapGetters(['cartLength','cartList'])

        //将方法映射到一个别名
        ...mapGetters({
          length:'cartLength'
        })
      }
    }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
.nav-bar{
  background: pink;
  color: #ffffff;
  font-size: 20px;
}

</style>
