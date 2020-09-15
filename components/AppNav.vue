<template>
  <div class="nav" v-bind:class="{ 'active' : navActive }">
    <ul class="nav__menu">
      <li class="nav__brand">
        <nuxt-link exact to="/">
          <app-icon />
          <span>Raisinlove <span>Illustration</span></span>
        </nuxt-link>
      </li>
      <li class="nav__menuitem">
        <nuxt-link to="/about">about</nuxt-link>
      </li>
      <!--li class="nav__menuitem">
        <nuxt-link to="/blog">blog</nuxt-link>
      </li-->
      <li class="nav__menuitem">
        <nuxt-link to="/contact">contact</nuxt-link>
      </li>
      <li class="nav__socials">
        <a href="https://www.facebook.com/bloodygorecomix/" target="_blank">
          <app-facebookicon />
        </a>

        <a href="https://www.instagram.com/bloodygorecomix/" target="_blank">
          <app-instagramicon />
        </a>

        <a href="https://twitter.com/bloodygorecomix?lang=en" target="_blank">
          <app-twittericon />
        </a>

        <a href="https://www.linkedin.com/in/stephanedumais/" target="_blank">
          <app-linkedinicon />
        </a>
      </li>
    </ul>
    <button class="nav__icon" v-bind:class="{ 'active' : navActive }" v-on:click="onNav()">
      <span></span>
    </button>
  </div>
</template>

<script>
import AppIcon from "@/components/AppIcon.vue";
import AppFacebookicon from "@/components/AppFacebookicon.vue";
import AppInstagramicon from "@/components/AppInstagramicon.vue";
import AppTwittericon from "@/components/AppTwittericon.vue";
import AppLinkedinicon from "@/components/AppLinkedinicon.vue";

export default {
  data() {
    return {
      navActive: false,
    };
  },
  components: {
    AppIcon,
    AppFacebookicon,
    AppInstagramicon,
    AppTwittericon,
    AppLinkedinicon,
  },
  methods: {
    onNav() {
      this.navActive = !this.navActive;
      this.$emit("navState", this.navActive);
    },
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
  background: #000;
  color: #fff;
  width: 100%;
  height: 60px;
  overflow: hidden;
  transition: all 400ms;
  position: fixed;
  z-index: 50;
  top: 0;

  @include mq(above-650px) {
    padding: 0 20px;
    height: 60px;
    align-items: center;
    display: flex;
  }

  &.active {
    overflow: visible;

    @include mq(above-650px) {
      overflow: hidden;
    }
  }
}

.nav__menu {
  display: block;
  width: 100%;
  position: relative;
  background: #000;
  padding-left: 0;
  padding-bottom: 15px;

  @include mq(above-650px) {
    top: 0;
    padding-bottom: 0;
    display: flex;
    align-items: center;
  }
}

.nav__brand {
  display: inline-block;
  background: black;
  font-family: "Bebas Neue";
  font-size: 26px;
  width: 100%;
  padding: 10px;
  color: #fff;

  @include mq(above-650px) {
    margin-right: auto;
    padding: 0;
  }

  svg {
    position: relative;
    top: -2px;
  }

  span {

    color: #fff;
    @include mq(below-bp) {
      display: none;
    }
    span {
      opacity:.4;
    }
  }
}

.nav__menuitem {
  font-family: "Bebas Neue";
  font-size: 22px;
  display: block;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;

  a {
    color: #fff;
    display: block;
    width: 100%;
    text-decoration: none;
  }

  @include mq(above-650px) {
    margin-right: 30px;
    display: inline-block;
    padding-top: 0;
    padding-bottom: 0;
  }
}

.nav__menuitem:first-child {
  @include mq(above-650px) {
    margin-left: auto;
  }
}

.nav__socials {
  white-space: nowrap;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;

  @include mq(above-650px) {
    display: inline-block;
    margin-left: 0;
    margin-right: 0;
    padding-top: 0;
    padding-bottom: 0;
  }

  a {
    display: inline-block;
    margin-left: auto;
    margin-right: auto;
    width: 30px;
    text-align: center;
    color: #fff;

    @include mq(above-650px) {
      margin-left: 5px;
      margin-right: 5px;
    }

    svg {
      position: relative;
      top: 2px;
      width: 20px;
      height: 20px;
    }
  }
}

.nav__icon {
  cursor: pointer;
  width: 50px;
  height: 40px;
  position: absolute;
  top: 10px;
  right: 10px;
  display: block;
  color: #ffffff;
  z-index: 100;
  outline: none;
  cursor: pointer;
  border: 10px solid transparent;
  background: transparent;

  &::before,
  &::after,
  span {
    position: absolute;
    left: 0;
    display: block;
    width: 100%;
    height: 2px;
    background-color: currentColor;
    transform: translate3d(0, 0, 0);
    transition: all 400ms;
  }

  &::before {
    content: "";
    top: 0.1em;
  }

  span {
    top: 50%;
    transform: translate3d(0, -50%, 0);
  }

  &::after {
    content: "";
    bottom: 0.1em;
  }

  &.active {
    &::before {
      top: 50%;
      transform: translate3d(0, -50%, 0) rotate(45deg);
    }

    span {
      opacity: 0;
    }

    &::after {
      bottom: 50%;
      transform: translate3d(0, 50%, 0) rotate(-45deg);
    }
  }

  @include mq(above-650px) {
    display: none;
  }
}
</style>