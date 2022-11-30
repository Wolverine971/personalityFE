<template>
  <v-app>
    <v-container>
      <v-parallax src="/group0.PNG" class="parallax">
        <div class="aboveFold mainBackground">
          <div class="center-mid-long" style="height: 90vh">
            <v-card-title class="headline">
              <h1 class="secondary--text center">
                9takes Beta
              </h1>
            </v-card-title>
            <p>Don't you love it when the group chat is popping</p>
            <p>That deep conversation around the campfire</p>
            <p>
              That late night at a diner with friends where you aren't leaving
              till they kick you out
            </p>
            <p>
              When you just met someone and if feels like you have known them
              your whole life
            </p>
            <h3 class="secondary--text">
              Yeah, we need more of that ^
            </h3>
          </div>
        </div>
      </v-parallax>
      <div class="belowFold">
        <toolbar v-if="user" />
        <header
          v-if="!user"
          id="toolbar"
          style="display: flex; margin: auto; padding: 100px 0"
          class="master-container"
        >
          <v-btn
            :to="{ path: '/auth/register', query: {} }"
            class="shadow btn-shrink-mobile center authBtn"
          >
            Login/ Register

            <v-icon right dark>
              mdi-login
            </v-icon>
          </v-btn>
        </header>

        <v-main>
          <v-container>
            <nuxt />
          </v-container>
        </v-main>
      </div>
      <the-footer />
    </v-container>
  </v-app>
</template>

<script>
export default {
  /* eslint-disable no-console */
  name: 'HomeLayout',
  components: {
    theFooter: () => import('~/components/shared/theFooter'),
    toolbar: () => import('~/components/shared/toolbar')
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  }
}
</script>

<style lang="scss">
.mainBackground {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-image: url('/group0.PNG') !important;
  background-size: cover; */
}

.parallax {
  position: absolute;
  top: -100vh;
  left: 0;
  right: 0;
  height: 200vh !important;
}
.belowFold {
  margin-top: calc(100vh);
  margin-bottom: 100px;
}
.aboveFold {
  margin-top: calc(100vh);
}

.center-mid-long {
  max-width: 1000px;
  margin: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-content: space-between;
  font-size: x-large;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;

  p {
    color: white !important;
    background-image: linear-gradient(to right, #f72585, white);
    -webkit-background-clip: text;
    // -webkit-text-fill-color: #360ddb00;
    // mix-blend-mode: difference;
  }
}
</style>
