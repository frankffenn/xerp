<template>
    <div class="sidebar">
        <div class="sidebar-header">
            <img class=logo src="../../assets/logo.png">
            <span class="name">未知科技</span>
        </div>
      <el-menu
      :default-active="onRoutes"
      class="el-menu-vertical"
      :collapse="collapse"
      background-color="#DCE1EE"
      text-color="#565682"
      active-text-color="#3FB0AB"
      unique-opened
      router
      >
      <template v-for="item in items">
          <!-- 子选项 -->
          <template v-if="item.subs">
            <el-submenu :index="item.index" :key="item.index">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span slot="title">{{ item.title }}</span>
                </template>
                <template v-for="subItem in item.subs">
                    <el-submenu
                        v-if="subItem.subs"
                        :index="subItem.index"
                        :key="subItem.index"
                    >
                        <template slot="title">{{ subItem.title }}</template>
                        <el-menu-item
                            v-for="(threeItem,i) in subItem.subs"
                            :key="i"
                            :index="threeItem.index"
                        >{{ threeItem.title }}</el-menu-item>
                    </el-submenu>
                    <el-menu-item
                        v-else
                        :index="subItem.index"
                        :key="subItem.index"
                    >{{ subItem.title }}</el-menu-item>
                </template>
            </el-submenu>
          </template>
          <template v-else>
              <!--父选项-->
            <el-menu-item :index="item.index" :key="item.index">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </template>        
      </template> 
    </el-menu>
    </div>
</template>
<script>
import bus from './bus';
export default {
    data () {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-user-solid',
                    index: 'staff',
                    title: '员工管理'
                },  
                {
                    icon: 'el-icon-shopping-cart-1',
                    index: 'stock',
                    title: '库存管理'
                },
                {
                    icon: 'el-icon-mouse',
                    index: 'order',
                    title: '订单管理',
                    subs: [
                        {
                            index: 'order_sales',
                            title: '客户订单'
                        },
                        {
                            index: 'order_purchases',
                            title: '采购订单'
                        },
                    ]
                },
                {
                    icon: 'el-icon-box',
                    index: 'commodity',
                    title: '商品管理'
                },
                {
                    icon: 'el-icon-money',
                    index: 'finance',
                    title: '财务管理'
                },
            ]        
        }
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
}
</script>

<style>
.sidebar {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    overflow-y: scroll;
}

.sidebar > ul {
    height: 100%;
}

.sidebar-header {
    display: flex;
    background-color: #DCE1EE;
    padding: 10px 20px;
    align-items: center;
    text-align: center;
    font-family: inherit;
    font-size: 16px;
    font-weight: bold;
}

.sidebar-header .logo{
    background-color: #fff;
    height: 40px;
    width: 40px;
    border-radius: 15px;
    box-shadow: 0 3px 6px rgb(0, 0, 0, 0.1);
    margin: 0 10px 0 0;
}

.sidebar .active {
    background-color: #EEF2F6;
}
</style>