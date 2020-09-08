<template>
  <div id="list-complete-demo" class="gallery">
    <div class="subnav">
      <ul>
        <li>
          <button v-on:click="filter('all')">All</button>
        </li>
        <li v-for="tag in illustrationtags" v-bind:key="tag.id">
          <button v-on:click="filter(tag.id)">{{ tag.name }}</button>
        </li>
      </ul>
    </div>

    <transition-group name="list-complete" class="list-complete" tag="section">
      <div
        v-for="illustration in filteredItems"
        v-bind:key="illustration.id"
        class="list-complete-item"
      >      
        <img
          class="list-complete-img"
          :src="illustration._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url"
          alt
        />
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeClass: "active",
      currentTag: "all",
    };
  },
  computed: {
    illustrations() {
      return this.$store.state.illustrations;
    },
    illustrationtags() {
      return this.$store.state.illustrationtags;
    },
    filteredItems: function () {
      var filter = this.currentTag;
      if (this.currentTag === "all") return this.illustrations;
      return this.illustrations.filter((el) =>
        el.illustrationtags.includes(this.currentTag)
      );
     
    },
  },
  created() {
    this.$store.dispatch("getIllustrations");
    this.$store.dispatch("getIllustrationTags");
  },
  methods: {
    filter: function (tag) {
      this.currentTag = tag;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/mixins.scss";

.subnav {
  position: fixed;
  z-index: 10;
  top: 50px;
  background: rgba($color: #000000, $alpha: 0.5);
  color: #fff;
  padding: 0 20px;
  width: 100%;

  ul {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-left: 0;
    padding-top: 10px;
    padding-bottom: 10px;

    @include mq(above-bp) {
      justify-content: flex-end;
    }

    li {
      display: inline-flex;
      align-items: center;
      height: 30px;

      @include mq(above-bp) {
        margin-right: 30px;
      }
    }
  }

  button {
    background: transparent;
    border: none;
    color: #fff;
    opacity: 0.8;
    font-size: 16px;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
}

.list-complete {
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
}
.list-complete-item {
  transition: transform 1s;
  flex: 1 1 25%;
  height: 200px;
  padding: 0px;

  /*   display: inline-block;
  margin-right: 10px; */
}
.list-complete-img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for <2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}

.posts {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 6vw;
  margin: 5em auto;
  max-width: 80vw;
}

main {
  grid-area: 1 / 1 / 2 / 2;
}

aside {
  grid-area: 1 / 2 / 2 / 3;
}

h2 {
  margin-bottom: 2em;
}

a,
a:active,
a:visited {
  text-decoration: none;
  color: black;
}

a.readmore {
  display: inline-block;
  font-size: 11px;
  text-transform: uppercase;
  padding: 5px 15px;
  letter-spacing: 2px;
  position: relative;
  color: #000;
  font-weight: 700;
  font-family: "Open Sans", serif;
  border: 1px solid #ccc;
  background: #fff;
}

.tags-title {
  background-color: #000;
  color: #fff;
  border: none;
  text-transform: capitalize;
  letter-spacing: 0;
  font-size: 1.2rem;
  padding: 15px;
  margin: 0 35px;
  position: relative;
  top: -25px;
}

.tags-list {
  background: #f5f5f5;
  padding: 70px 25px 25px;
  margin-top: -65px;
}

.post {
  border-bottom: 1px solid rgb(223, 222, 222);
  margin-bottom: 2em;
  padding-bottom: 2em;
  color: #444;

  h3 {
    margin-bottom: 0.5em;
    font-size: 26px;
  }
}

.tags-list ul {
  padding-left: 0;
}

.tags-list li {
  font-family: "Open Sans", serif;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 6px 15px;
  margin: 0 0 10px 10px;
  display: inline-block;
  font-size: 0.7rem !important;
  border: 1px solid #000;
  transition: all 0.3s;
  outline: none;
  font-weight: normal;
  cursor: pointer;
  background: #fff;
  a {
    color: #000;
  }
}

.active {
  border: 1px solid #d44119;
  background-color: #fae091 !important;
}

.slide {
  position: relative;
  background: transparent;
  -webkit-transition: 0.3s ease;
  transition: 0.3s ease;
  z-index: 1;
  backface-visibility: hidden;
  perspective: 1000px;
  transform: translateZ(0);
  cursor: pointer;

  &:hover {
    color: #fff;
  }

  &:hover:before {
    right: -1px;
  }
}

.slide::before {
  content: "";
  display: block;
  position: absolute;
  background: #000;
  transition: right 0.3s ease;
  z-index: -1;
  top: -2px;
  bottom: -2px;
  left: -2px;
  right: 108%;
  backface-visibility: hidden;
}
</style>
