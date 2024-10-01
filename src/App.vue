<script>
import HeaderHybRead from './components/HeaderHybRead'
import FooterHybRead from './components/FooterHybRead'

export default {
  name: "App",
  components: {
    HeaderHybRead,
    FooterHybRead,
  },
};
</script>

<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <HeaderHybRead/>
  <router-view />
  <FooterHybRead/>
</template>

<style>
</style>
