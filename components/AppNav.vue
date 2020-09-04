<template>
  <div class="nav">
    <ul>
      <li>
        <nuxt-link exact to="/">
          <app-icon></app-icon>Raisinlove
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/about">About</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/blog">Blog</nuxt-link>
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
.nav {
  background: #000;
  color: #fff;
  padding: 1em 100px;

  ul {
    width: 100%;
    display: flex;
    align-items: center;
  }

  li:first-child {
    font-family: "Bebas Neue";
    font-size: 1.6rem;
  }

  li:nth-child(2) {
    margin-left: auto;
  }

  a {
    color: #fff;
    opacity: 0.8;
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

ul {
  padding-left: 0;

  li {
    display: inline-block;
    margin-right: 30px;
  }
}
</style>
