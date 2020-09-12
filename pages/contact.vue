<template>
  <div class="content">
    <h1>Contact Steph Dumais</h1>
    <img src="/montreal.jpg" class="photo" alt="Montréal" />
    <form class="contact-form" @submit.prevent="sendEmail">
      <div class="fieldset">
        <label>Name</label>
        <input type="text" name="user_name" required />
      </div>
      <div class="fieldset">
        <label>Email</label>
        <input type="email" name="user_email" required />
      </div>
      <div class="fieldset">
        <label>Message</label>
        <textarea name="message" required></textarea>
      </div>
      <div class="fieldset">
        <input type="submit" ref="sendbutton" value="Send Message" />
        <p class="error">
          There was an error submitting your form.
          <br />Please try again later.
        </p>
        <p class="success">Message sent. Thank you!</p>
      </div>
    </form>
  </div>
</template>

<script>
import emailjs from "emailjs-com";
export default {
  methods: {
    loading: function () {
      document.querySelector('input[type="submit"]').classList.add("loading");
    },
    sendEmail: (e) => {
      document.querySelector('input[type="submit"]').classList.add("loading");

      emailjs
        .sendForm(
          "raisinlove@gmail.com",
          "raisinlovecontact",
          e.target,
          "user_Kvkps1m2ZrscVKwzitiug"
        )
        .then(
          (result) => {
            console.log("SUCCESS!", result.status, result.text);
            document
              .querySelector('input[type="submit"]')
              .classList.remove("loading");
            document
              .querySelector('input[type="submit"]')
              .classList.add("hide");
            document.querySelector(".success").classList.add("show");
          },
          (error) => {
            console.log("FAILED...", error);
            document
              .querySelector('input[type="submit"]')
              .classList.remove("loading");
            document
              .querySelector('input[type="submit"]')
              .classList.add("hide");
            document.querySelector(".error").classList.add("show");
          }
        );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/mixins.scss";
@import "@/assets/content.scss";

.content {
  text-align: center;
}

@keyframes loading {
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.3;
  }
}

.photo {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.error,
.success {
  padding: 0;
  margin: 0;
  right: 0;
  position: absolute;
  opacity: 0;
  font-weight: bold;
  transition: all 200ms;
  z-index: 1;
  text-align: center;

  @include mq(above-bp) {
    text-align: right;
  }

  &.show {
    opacity: 1;
  }
}

.success {
  color: green;
}

.error {
  color: darkred;
}

.contact-form {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.fieldset {
  position: relative;
  display: block;
  border: none;
  text-align: center;

  @include mq(above-bp) {
    display: flex;
    margin: 20px auto;
  }
}

label {
  display: block;
  @include mq(above-bp) {
    flex: 1;
  }
}

label,
input,
textarea {
  padding: 10px;
  font-family: "Titillium Web", sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  min-height: 46px;
  border: none;
  text-align: center;

  @include mq(above-bp) {
    text-align: left;
  }
}

textarea {
  min-height: 100px;
}

input:not([type="submit"]),
textarea {
  display: block;
  background: #ededed;
  width: 100%;
  @include mq(above-bp) {
    flex: 2;
  }
}

input[type="submit"] {
  background: #000;
  color: #fff;
  cursor: pointer;
  padding-left: 20px;
  padding-right: 20px;
  transition: all 200ms;
  opacity: 1;
  z-index: 2;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;

  @include mq(above-bp) {
    margin-top: 0;
    margin-left: auto;
    margin-right: 0;
  }

  &.loading {
    animation: loading 600ms infinite;
  }

  &.hide {
    opacity: 0;
  }
}
</style>