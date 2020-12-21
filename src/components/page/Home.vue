<template>
    <div class="container"> 
        <v-sidebar></v-sidebar>
        <div class="content" :class="{'content-collapse':collapse}">
            <transition name="move" mode="out-in">
                <div class="content-header">
                    <div class="left"><span>Overview</span></div>
                    <div class="right">
                        <i class="el-icon-bell"></i>
                        <img class="avatar" src="../../assets/messi.jpeg" alt="">
                        <i class="el-icon-arrow-down"></i>
                    </div>
                </div>
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
import bus from "../common/bus.js";
import vSidebar from '../common/Sidebar.vue';
export default {
    data() {
        return {
            collapse: false
        };
    },
    components:{
        vSidebar,
    },
    created() {
        bus.$on('collapse-content', msg => {
            this.collapse = msg;
        });
    }
}
</script>

<style>
</style>