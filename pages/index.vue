<template>
  <div id="list-complete-demo" class="gallery">
    <div id="lightbox" class="lightbox">
      <div class="lightbox__close" v-on:click="close()"></div>
      <div class="lightbox__prev" v-on:click="slidebox('prev')"></div>
      <div class="lightbox__next" v-on:click="slidebox('next')"></div>
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
    <div class="subnav filters">
      <ul>
        <li>
          <button autofocus v-on:click="filter('all')">All</button>
        </li>
        <li v-for="tag in illustrationtags" v-bind:key="tag.id">
          <button :class="'filters__'+tag.name" v-on:click="filter(tag.id)">{{ tag.name }}</button>
        </li>
      </ul>
    </div>

    <transition-group name="list-complete" class="list-complete" tag="section">
      <div
        v-for="(illustration, index) in filteredItems"
        v-bind:key="illustration.id"
        class="list-complete-item"
        :ref="'i-'+illustration.id"
      >
        <div
          v-on:click="lightbox(
            illustration._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url,
            illustration.title.rendered, index+1, filteredItems.length  
            )"
          :data-index="index+1"
          :data-illustrationindex="illustration.id"
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
      if (this.currentTag === "all") {
        return this.illustrations;
      }
      return this.illustrations.filter((el) =>
        el.illustrationtags.includes(this.currentTag)
      );
    },
  },
  created() {
    this.$store.dispatch("getIllustrations");
    this.$store.dispatch("getIllustrationTags");
  },
  mounted() {
    var lightbox = document.getElementById("lightbox");
    var left = document.querySelector(".lightbox__prev");
    var right = document.querySelector(".lightbox__next");
    var close = document.querySelector(".lightbox__close");

    window.addEventListener("keydown", (e) => {
      if (lightbox.classList.contains("open")) {
        if (e.keyCode === 37) {
          left.click();
        }
        if (e.keyCode === 39) {
          right.click();
        }
        if (e.keyCode === 40) {
          close.click();
        }
      }
    });
  },
  methods: {
    lightbox: function (image, title, index, total) {
      var lightbox = document.querySelector(".lightbox");
      var lightbox__title = lightbox.querySelector(".lightbox__title");
      var lightbox__prev = lightbox.querySelector(".lightbox__prev");
      var lightbox__next = lightbox.querySelector(".lightbox__next");
      var img = new Image();

      lightbox.setAttribute("data-index", index);
      lightbox__title.innerText = title;

      img.onload = function () {
        lightbox.setAttribute("style", "background-image:url(" + image + ")");
        lightbox.classList.add("open");
      };
      img.src = image;
    },
    slidebox: function (direction) {
      var lightbox = document.querySelector("#lightbox");
      var cards = document.querySelectorAll(".list-complete-item");
      var total = cards.length;
      var currentindex = parseInt(lightbox.dataset.index);
      var newindex;

      //lightbox.classList.add("slide");

      if (direction === "prev") {
        if (currentindex - 1 === 0) {
          newindex = currentindex;
        } else {
          newindex = currentindex - 1;
        }
      }

      if (direction === "next") {
        if (currentindex + 1 === total + 1) {
          newindex = currentindex;
        } else {
          newindex = currentindex + 1;
        }
      }

      var newslide = document.querySelector(
        '.list-complete-img[data-index="' + newindex + '"]'
      );

      var newillustrationindex = parseInt(newslide.dataset.illustrationindex);

      this.$store.state.illustrations.forEach((newillustration) => {
        if (newillustration.id === newillustrationindex) {
          this.lightbox(
            newillustration._embedded["wp:featuredmedia"][0].media_details.sizes
              .full.source_url,
            newillustration.title.rendered,
            newindex,
            total
          );
        }
      });

      /*
      setInterval(function () {
        lightbox.classList.remove("slide");
      }, 1000);
      */
    },
    close: function (image) {
      var lightbox = document.querySelector(".lightbox");
      lightbox.classList.remove("open");
      lightbox.classList.remove("slide");
    },
    filter: function (tag) {
      this.currentTag = tag;
      //this.updateHash(tag);
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
    tagid: function (tag) {
      var tag = tag.substring(1);
      var tagid;
      return tag;
      console.log(this.illustrationtags);
      //.find((x) => x.name === tagid).id;
    },
    tagname: function (tag) {
      if (tag != "all") {
        tag =
          "#" +
          this.$store.state.illustrationtags.find((x) => x.id === tag).name;
      } else {
        tag = "";
      }
      return tag;
    },
    updateHash: function (tag) {
      history.pushState({}, null, this.$route.path + this.tagname(tag));
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/mixins.scss";
@import "@/assets/illustrations.scss";
@import "@/assets/subnav.scss";
</style>
