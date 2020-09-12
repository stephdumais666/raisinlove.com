<template>
  <div id="list-complete-demo" class="gallery">
    <div id="lightbox" class="lightbox">
      <div 
      class="lightbox__close" 
      v-hammer:swipe.left="swipebox('prev')"
      v-hammer:swipe.right="swipebox('next')"
      v-on:click="close()"></div>
      <div class="lightbox__prev" v-on:click="slidebox('prev')">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 194 189"
          style="enable-background:new 0 0 194 189;"
          xml:space="preserve"
        >
          <g id="Layer_1" />
          <g id="Layer_2">
            <path
              id="XMLID_17_"
              d="M165,0H29C13,0,0,13,0,29v131c0,16,13,29,29,29h136c16,0,29-13,29-29V29C194,13,181,0,165,0z M43.5,154.2
		c-4.4,0-8-3.6-8-8V34.7c0-4.4,3.6-8,8-8H159c4.4,0,8,3.6,8,8v111.5c0,4.4-3.6,8-8,8H43.5z M25.6,8.3l12.6,11.3
		C33.2,21.3,29.2,25.6,28,31L8.2,26.3C9.4,17.1,16.5,9.8,25.6,8.3z M8,160v-4.9l19.8-6c1.4,7.4,7.9,13.1,15.7,13.1h1L35.5,181H29
		C17.4,181,8,171.6,8,160z M168.1,180.7l-10.9-18.6h1.8c6.6,0,12.2-4,14.7-9.6l12.1,10.2C184.6,172,177.3,179.4,168.1,180.7z"
            />
            <polygon
              id="XMLID_11_"
              points="151,82.2 102.3,82.2 102.3,61.8 49.5,89.4 102.3,117 102.3,96.6 151,96.6 	"
            />
          </g>
        </svg>
      </div>
      <div class="lightbox__next" v-on:click="slidebox('next')">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 194 189"
          style="enable-background:new 0 0 194 189;"
          xml:space="preserve"
        >
          <g id="Layer_1" />
          <g id="Layer_2">
            <path
              id="XMLID_17_"
              d="M165,0H29C13,0,0,13,0,29v131c0,16,13,29,29,29h136c16,0,29-13,29-29V29C194,13,181,0,165,0z M43.5,154.2
		c-4.4,0-8-3.6-8-8V34.7c0-4.4,3.6-8,8-8H159c4.4,0,8,3.6,8,8v111.5c0,4.4-3.6,8-8,8H43.5z M25.6,8.3l12.6,11.3
		C33.2,21.3,29.2,25.6,28,31L8.2,26.3C9.4,17.1,16.5,9.8,25.6,8.3z M8,160v-4.9l19.8-6c1.4,7.4,7.9,13.1,15.7,13.1h1L35.5,181H29
		C17.4,181,8,171.6,8,160z M168.1,180.7l-10.9-18.6h1.8c6.6,0,12.2-4,14.7-9.6l12.1,10.2C184.6,172,177.3,179.4,168.1,180.7z"
            />
            <polygon
              id="XMLID_11_"
              points="49.5,96.6 98.3,96.6 98.3,117 151,89.4 98.3,61.8 98.3,82.2 49.5,82.2 	"
            />
          </g>
        </svg>
      </div>
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
    <nav class="subnav filters">
      <ul>
        <li>
          <button v-on:click="filter('all')">all</button>
        </li>
        <li v-for="tag in illustrationtags" v-bind:key="tag.id">
          <button :class="'filters__'+tag.name" v-on:click="filter(tag.id)">{{ tag.name }}</button>
        </li>
      </ul>
    </nav>

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
          :ref="'image-'+illustration.id"
          :data-index="index+1"
          :data-illustrationindex="illustration.id"
          :class="thumbnailclasses(illustration)"
          :style="'background-image:url('+
          illustration._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url
          +')'"
        >
          <div class="list-complete-item__loader"></div>
        </div>
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
      var lightbox__close = lightbox.querySelector(".lightbox__close");
      var thumbnail = document.querySelector(
        '.list-complete-img[data-index="' + index + '"]'
      );
      var img = new Image();

      thumbnail.classList.add("loading");
      lightbox.setAttribute("data-index", index);
      lightbox__title.innerText = title;
      lightbox__close.classList.add("loading");

      img.onload = function () {
        lightbox__close.setAttribute(
          "style",
          "background-image:url(" + image + ")"
        );
        thumbnail.classList.remove("loading");

        setTimeout(function () {
          lightbox__close.classList.remove("loading");
          lightbox.classList.add("open");
        }, 500);
      };
      img.src = image;
    },
    slidebox: function (direction) {
      var lightbox = document.querySelector("#lightbox");
      var cards = document.querySelectorAll(".list-complete-item");
      var total = cards.length;
      var currentindex = parseInt(lightbox.dataset.index);
      var newindex;

      lightbox.classList.add("slide");

      if (direction === "prev") {
        if (currentindex - 1 === 0) {
          newindex = total;
        } else {
          newindex = currentindex - 1;
        }
      }

      if (direction === "next") {
        if (currentindex + 1 === total + 1) {
          newindex = 1;
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

      setTimeout(function () {
        lightbox.classList.remove("slide");
      }, 500);
    },
    swipebox: function (direction) {
      console.log(direction);
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
    thumbnailclasses: function (illustration) {
      let illusWidth =
        illustration._embedded["wp:featuredmedia"][0].media_details.width;
      let illusHeight =
        illustration._embedded["wp:featuredmedia"][0].media_details.height;
      let formatClass = "list-complete-img preloading";
      let image =
        illustration._embedded["wp:featuredmedia"][0].media_details.sizes.full
          .source_url;

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

      let img = new Image();
      img.onload = function () {
        var thumbnail = document.querySelector(
          'div.list-complete-img[data-illustrationindex="' +
            illustration.id +
            '"]'
        );
        if (thumbnail) {
          thumbnail.classList.remove("preloading");
        }
      };
      img.src = image;
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
