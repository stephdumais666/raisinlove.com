<template>
  <section class="masthead">
    <h1>{{ tagline }}</h1>
  </section>
</template>

<script>
export default {
  data() {
    return {
      tagline: "Raisinlove",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/mixins.scss";
section.masthead {
  width: 100%;
  height: 100px;
  @include mq(above-bp) {
    height: 200px;
  }
  @include mq(above-600px) {
    height: 300px;
  }
  overflow: hidden;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  background: -moz-radial-gradient(
      center,
      ellipse cover,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 37%,
      rgba(0, 0, 0, 0.65) 100%
    ),
    url("/mountains-masthead.jpg") no-repeat center center scroll; /* FF3.6-15 */
  background: -webkit-radial-gradient(
      center,
      ellipse cover,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 37%,
      rgba(0, 0, 0, 0.65) 100%
    ),
    url("/mountains-masthead.jpg") no-repeat center center scroll; /* Chrome10-25,Safari5.1-6 */
  background: radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 37%,
      rgba(0, 0, 0, 0.65) 100%
    ),
    url("/mountains-masthead.jpg") no-repeat center center scroll; /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  background-size: cover;
  color: #333;
  h1 {
    padding: 0;
    margin: 0;
    opacity: 0.8;
    color: white;
    //font-size: 20vw;
    line-height: 0;
    text-shadow: 0 0 30px rgba(0, 0, 0, 0.7);
    @include fluid-type(font-size, 320px, 1366px, 70px, 250px);
  }
}
</style>