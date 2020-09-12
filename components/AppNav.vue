<template>
  <div class="nav">
    <ul>
      <li>
        <nuxt-link exact to="/">
          <app-icon></app-icon>
          <span>Raisinlove</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/about">about</nuxt-link>
      </li>
      <!--li>
        <nuxt-link to="/blog">blog</nuxt-link>
      </li-->
      <li>
        <nuxt-link to="/contact">contact</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import AppIcon from "@/components/AppIcon.vue";

export default {
  components: {
    AppIcon,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/mixins.scss";

a {
  text-decoration: none !important;
}

@keyframes slideInFromTop {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}

.nav {
  animation: 1s ease-out 100ms 1 slideInFromTop;
  position: fixed;
  z-index: 50;
  top: 0;
  background: #000;
  color: #fff;
  height: 50px;
  padding: 0 20px;

  ul {
    padding-left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    @include mq(below-bp) {
      justify-content: space-between;
    }
  }

  li {
    display: inline-block;

    @include mq(above-bp) {
      margin-right: 30px;
    }
  }

  li:last-child {
    @include mq(above-bp) {
      margin-right: 10px;
    }
  }

  li:first-child {
    font-family: "Bebas Neue";
    font-size: 1.6rem;

    span {
      position: relative;
      top: 2px;
      @include mq(below-bp) {
        display: none;
      }
    }
  }

  li:nth-child(2) {
    @include mq(above-bp) {
      margin-left: auto;
    }
  }

  a {
    color: #fff;
    opacity: 0.8;
    display: block;
    width: 100%;
    padding: 10px;
    text-decoration: none;
    &:hover {
      opacity: 1;
    }
  }
}

div {
  align-items: center;
  display: flex;
  height: 100%;
  width: 100%;
}
</style>
