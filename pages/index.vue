<template>
  <div>
    <app-nav @navState="updateNavState" />
    <div
      id="list-complete-demo"
      class="gallery"
      itemscope
      itemtype="http://schema.org/ImageGallery"
    >
      <div id="lightbox" class="lightbox">
        <div class="lightbox__close" v-on:click="close()"></div>
        <div class="lightbox__prev" v-on:click="slidebox('prev')">
          <app-previcon />
        </div>
        <div class="lightbox__next" v-on:click="slidebox('next')">
          <app-nexticon />
        </div>
        <h2 class="lightbox__title"></h2>
        <figure class="closeicon" v-on:click="close()">
          <app-closeicon />
        </figure>
      </div>
      <nav class="subnav filters" v-bind:class="{ 'active' : navState }">
        <ul>
          <li>
            <button v-on:click="filter('all')">all</button>
          </li>
          <li v-for="tag in illustrationtags" v-bind:key="tag.id">
            <button :class="'filters__'+tag.name" v-on:click="filter(tag.id)">{{ tag.name }}</button>
          </li>
        </ul>
      </nav>
      <keep-alive>
        <transition-group name="list-complete" class="list-complete" tag="section">
          <div
            itemscope
            itemtype="https://schema.org/VisualArtwork"
            v-for="(illustration, index) in filteredItems"
            v-bind:key="illustration.id"
            class="list-complete-item"
            :ref="'i-'+illustration.id"
          >
            <div
              itemprop="image"
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
              <h2
                class="list-complete-item__title"
                itemprop="name"
              >{{ illustration.title.rendered }}</h2>
              <span
                class="list-complete-item__creator"
                itemprop="creator"
                itemscope
                itemtype="https://schema.org/Person"
              >
                <span itemprop="name">Steph Dumais</span>
              </span>
              <div class="list-complete-item__loader"></div>
            </div>
          </div>
        </transition-group>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import AppNav from "~/components/AppNav.vue";
import AppPrevicon from "~/components/AppPrevicon.vue";
import AppNexticon from "~/components/AppNexticon.vue";
import AppCloseicon from "~/components/AppCloseicon.vue";
export default {
  components: {
    AppNav,
    AppPrevicon,
    AppNexticon,
    AppCloseicon,
  },
  data() {
    return {
      navState: false,
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
  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
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
    updateNavState(state) {
      this.navState = state;
      console.log("state: " + this.navState);
    },
    handleScroll() {
      if (timer !== null) {
        clearTimeout(timer);
        document.querySelector(".subnav").classList.add("desktopactive");
      }
      var timer = setTimeout(function () {
        document.querySelector(".subnav").classList.remove("desktopactive");
      }, 2000);
    },
    lightbox: function (image, title, index, total) {
      var lightbox = document.querySelector(".lightbox");
      var lightbox__title = lightbox.querySelector(".lightbox__title");
      var lightbox__prev = lightbox.querySelector(".lightbox__prev");
      var lightbox__next = lightbox.querySelector(".lightbox__next");
      var lightbox__close = lightbox.querySelector(".lightbox__close");
      var thumbnail = document.querySelector(
        '.list-complete-img[data-index="' + index + '"]'
      );

      thumbnail.classList.add("loading");
      lightbox.setAttribute("data-index", index);
      lightbox__title.innerText = title;
      lightbox__close.classList.add("loading");

      var img = new Image();
      
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
    close: function (image) {
      var lightbox = document.querySelector(".lightbox");
      lightbox.classList.remove("open");
      lightbox.classList.remove("slide");
    },
    filter: function (tag) {
      this.currentTag = tag;
      window.scrollTo(0, 0);
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
