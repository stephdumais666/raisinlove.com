<template>
  <div id="list-complete-demo" class="gallery">
    <div class="lightbox" v-on:click="close()">
      <h2 class="lightbox__title"></h2>
      <figure class="closeicon">
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 252 252"
          style="enable-background:new 0 0 252 252;"
          xml:space="preserve"
        >
          <g>
            <path
              d="M126,0C56.523,0,0,56.523,0,126s56.523,126,126,126s126-56.523,126-126S195.477,0,126,0z M126,234
		c-59.551,0-108-48.449-108-108S66.449,18,126,18s108,48.449,108,108S185.551,234,126,234z"
            />
            <path
              d="M164.612,87.388c-3.515-3.515-9.213-3.515-12.728,0L126,113.272l-25.885-25.885c-3.515-3.515-9.213-3.515-12.728,0
		c-3.515,3.515-3.515,9.213,0,12.728L113.272,126l-25.885,25.885c-3.515,3.515-3.515,9.213,0,12.728
		c1.757,1.757,4.061,2.636,6.364,2.636s4.606-0.879,6.364-2.636L126,138.728l25.885,25.885c1.757,1.757,4.061,2.636,6.364,2.636
		s4.606-0.879,6.364-2.636c3.515-3.515,3.515-9.213,0-12.728L138.728,126l25.885-25.885
		C168.127,96.601,168.127,90.902,164.612,87.388z"
            />
          </g>
        </svg>
      </figure>
    </div>
    <div class="subnav">
      <ul>
        <li>
          <button autofocus v-on:click="filter('all')">All</button>
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
        :ref="'i-'+illustration.id"
      >
        <div
          v-on:click="lightbox(
            illustration._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url,
            illustration.title.rendered 
            )"
          :class="illustrationformat(illustration)"
          :style="'background-image:url('+illustration._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url+')'"
        ></div>
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
    lightbox: function (image, title) {
      var lightbox = document.querySelector(".lightbox");
      var lightbox__title = document.querySelector(".lightbox__title");
      var img = new Image();

      lightbox__title.innerText = title;

      img.onload = function () {
        lightbox.setAttribute("style", "background-image:url(" + image + ")");
        lightbox.classList.add("open");
      };
      img.src = image;
    },
    close: function (image) {
      var lightbox = document.querySelector(".lightbox");
      lightbox.classList.remove("open");
    },
    filter: function (tag) {
      this.currentTag = tag;
    },
    illustrationformat: function (illustration) {
      let illusWidth =
        illustration._embedded["wp:featuredmedia"][0].media_details.width;
      let illusHeight =
        illustration._embedded["wp:featuredmedia"][0].media_details.height;
      let formatClass = "list-complete-img";

      if (illusWidth == illusHeight) {
        formatClass = formatClass + " list-complete-img--square";
      } else {
        if (illusWidth > illusHeight) {
          formatClass = formatClass + " list-complete-img--horizontal";
        }

        if (illusWidth < illusHeight) {
          formatClass = formatClass + " list-complete-img--vertical";
        }
      }

      return formatClass;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/mixins.scss";

.lightbox {
  height: 1px;
  overflow: hidden;
  cursor: pointer;
  position: fixed;
  z-index: 20;
  top: 0;
  right: 0;
  left: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-color: rgba(0, 0, 0, 0.9);
  transition: opacity 300ms ease-in-out 100ms;
  opacity: 0;
  &.open {
    display: block;
    height: 100vh;
    bottom: 0;
    opacity: 1;
  }
}

.lightbox__title {
  position: relative;
  z-index: 19;
  background: #000;
  color: #fff;
  display: inline-block;
  padding: 12px 20px 5px;
  font-family: Bebas Neue;
  font-size: 1.6rem;
}

.closeicon {
  width: 30px;
  height: 30px;
  position: fixed;
  top: 12px;
  right: 20px;

  path {
    fill: #fff;
    box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.75);
  }
}

.subnav {
  color: #fff;
  padding: 0 20px;
  width: 100%;
  transition: all 500ms;

  @include mq(above-bp) {
    position: fixed;
    z-index: 10;
    top: 50px;
    background: rgba(0, 0, 0, 0);

    li button:not(:focus) {
      opacity: 0.4;
    }

    &:hover {
      background: rgba(0, 0, 0, 0.8);

      li button:not(:focus) {
        opacity: 1;
      }
    }
  }

  ul {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
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
      outline: none !important;
      @include mq(above-bp) {
        height: 30px;
        margin-right: 7px;
      }
    }
  }

  button {
    background: #333;
    padding: 5px 10px;
    border-radius: 3px;
    border: none;
    color: #aaa;
    font-size: 13px;
    letter-spacing: 1px;
    cursor: pointer;
    outline: none !important;
    margin: 3px;

    @include mq(above-bp) {
      background: #111;
      margin: 0;
    }

    &:hover {
      background: #000;
    }

    &:focus {
      background: #000;
      color: #fff;
      text-shadow: 0px 0px 5px #000000;
    }
  }
}

.list-complete {
  width: 100%;
  border: 2.5px solid #fff;

  @include mq(above-bp) {
    column-gap: 0;
    column-count: 2;
    column-width: 130px;
  }

  @include mq(above-600px) {
    column-count: 3;
  }

  @include mq(above-900px) {
    column-count: 4;
  }

  @include mq(above-1200px) {
    column-count: 5;
  }

  @include mq(above-1600px) {
    column-count: 8;
  }
}

.list-complete-item {
  transition: transform 1s;
  padding: 0px;
  border: 5px solid #fff;
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  break-inside: avoid;
}

.list-complete-img {
  background-size: cover;
  background-position: center;
  width: 100%;
  cursor: pointer;
  //opacity: 0;
  transition: opacity 1s;

  &.list-complete-img--vertical {
    @include keep-ratio("22/34");
  }

  &.list-complete-img--horizontal {
    @include keep-ratio("34/22");
  }

  &.list-complete-img--square {
    @include keep-ratio("1/1");
  }
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
