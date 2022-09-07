<template>
  <div>
    <app-nav />
    <div class="content">
      <h1>About Steph Dumais</h1>

      <img src="/photo.jpg" alt="Steph Dumais" class="photo" />

      <p>Steph Dumais is an illustrator, underground horror comix publisher and Web Developer based in the Montreal area.</p>
      <p>His professional career started in graphic design before moving on to web development, but has consistently freelanced in design and illustration since 1998.</p>
      <p>For more than a decade, he was very active within the industrial/gothic scene, designing album covers and merchandise for bands. He was very involved with labels such as Calgary's Gashed! Records. Later on, he focused much of his work for the rave and hardcore scenes. In more recent years, his music oriented gigs have encompassed a wider array of genres.</p>
      <p>
        Over the years he has created multiple comics, including the long running
        <a
          href="https://bloodygorecomix.com/search?q=zombie+commandos"
          target="_blank"
        >Zombie Commandos From Hell</a> series, set in a post-apocalyptic Canada where demons from hell have taken over dead human bodies to wage war on mankind.
      </p>
      <p>
        His work has been published in multiple magazines and comic anthologies but his highest profile work has been his contributions to multiple issues of Mirage's Tales of the TMNT, including a
        <a
          href="https://www.miragelicensing.com/comics/mirage/talesvol2/41/41.html"
          target="_blank"
        >full issue</a>. He has also illustrated Douglas Rushkoff's first graphic novel,
        <a
          href="https://rushkoff.com/books/club-zero-g/"
          target="_blank"
        >Club Zero-G</a>.
      </p>
      <p>
        In 2012, he founded
        <a
          href="http://www.bloodygorecomix.com"
          target="_blank"
        >Bloody Gore Comix</a> as a vehicle for publishing his own series as well as an entire roster of like minded creators. BGC focuses on extreme graphic horror comics.
      </p>
      <p>
        In 2019, with his friend Jason Mulligan, he created the
        <a
          href="https://www.kickstarter.com/projects/bloodygorecomix/zombie-commandos-from-hell-extermination"
          target="_blank"
        >ZCFH: Extermination</a> card game, based on his comic series. This is his second successful crowdfunding campaign, following the funding of the
        <a
          href="https://www.kickstarter.com/projects/bloodygorecomix/bloody-gore-comix-2018-anthology?ref=user_menu"
          target="_blank"
        >second BGC Anthology</a>.
      </p>
      <p>He makes regular appearances in small press fairs, comic conventions and horror events in Canada each year to promote his work and the BGC catalog and hopes to participate in more events across the border.</p>
      <p>He is currently working on new titles, Renegade XL-900 and Slaughtered Kingdom.</p>
      <p>
        Always
        <nuxt-link to="/contact">easy to reach</nuxt-link>, he is available for commissions.
      </p>

      <a class="social" href="https://www.bloodygorecomix.com" target="_blank">
        <app-webicon />
        <span>Discover the Bloody Gore Comix Catalog!</span>
      </a>

      <a class="social" href="https://www.facebook.com/bloodygorecomix/" target="_blank">
        <app-facebookicon />
        <span>Follow Bloody Gore Comix on Facebook</span>
      </a>

      <a class="social" href="https://www.instagram.com/bloodygorecomix/" target="_blank">
        <app-instagramicon />
        <span>Follow Bloody Gore Comix on Instagram</span>
      </a>

      <a class="social" href="https://twitter.com/bloodygorecomix?lang=en" target="_blank">
        <app-twittericon />
        <span>Follow Bloody Gore Comix on Twitter</span>
      </a>

      <a class="social" href="https://www.linkedin.com/in/stephanedumais/" target="_blank">
        <app-linkedinicon />
        <span>Discover Steph Dumais' Profile on LinkedIn</span>
      </a>
    </div>
  </div>
</template>

<script>
import AppNav from "~/components/AppNav.vue";
import AppWebicon from "@/components/AppWebicon.vue";
import AppFacebookicon from "@/components/AppFacebookicon.vue";
import AppInstagramicon from "@/components/AppInstagramicon.vue";
import AppTwittericon from "@/components/AppTwittericon.vue";
import AppLinkedinicon from "@/components/AppLinkedinicon.vue";
export default {
  components: {
    AppNav,
    AppWebicon,
    AppFacebookicon,
    AppInstagramicon,
    AppTwittericon,
    AppLinkedinicon,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/mixins.scss";
@import "@/assets/content.scss";

.photo {
  @include mq(above-450px) {
    float: left;
    padding: 8px 0;
    margin: 0 30px 10px 0;
    width: 150px;
  }

  @include mq(above-600px) {
    width: 213px;
  }
}

.social {
  color: #666;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
  span {
    flex: 1;
    display: block;
    padding: 0 20px;
  }
  svg {
    width: 30px;
    height: 30px;

    path {
      fill: black;
    }
  }
}
</style>