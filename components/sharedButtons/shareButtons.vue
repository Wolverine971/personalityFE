<template>
  <div>
    <s-twitter
      class="buttonHovLight shareBtn"
      :window-features="windowFeatures"
      :share-options="twitterOptions"
      :use-native-behavior="useNativeBehavior"
      @popup-close="onClose"
      @popup-open="onOpen"
      @popup-block="onBlock"
      @popup-focus="onFocus"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <path
          :fill="svgColor"
          d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
        />
      </svg>
    </s-twitter>
    <s-facebook
      class="buttonHovLight shareBtn"
      :window-features="windowFeatures"
      :share-options="facebookOptions"
      :use-native-behavior="useNativeBehavior"
      @popup-close="onClose"
      @popup-open="onOpen"
      @popup-block="onBlock"
      @popup-focus="onFocus"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <path
          :fill="svgColor"
          d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
        />
      </svg>
    </s-facebook>
    <s-gmail
      class="buttonHovLight shareBtn"
      :window-features="windowFeatures"
      :share-options="gmailOptions"
      :use-native-behavior="useNativeBehavior"
      @popup-close="onClose"
      @popup-open="onOpen"
      @popup-block="onBlock"
      @popup-focus="onFocus"
    >
      <svg
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd"
        aria-hidden="true"
        focusable="false"
      >
        <path
          :fill="svgColor"
          d="M22.288 21h-20.576c-.945 0-1.712-.767-1.712-1.712v-13.576c0-.945.767-1.712 1.712-1.712h20.576c.945 0 1.712.767 1.712 1.712v13.576c0 .945-.767 1.712-1.712 1.712zm-10.288-6.086l-9.342-6.483-.02 11.569h18.684v-11.569l-9.322 6.483zm8.869-9.914h-17.789l8.92 6.229s6.252-4.406 8.869-6.229z"
        />
      </svg>
    </s-gmail>
    <s-reddit
      class="buttonHovLight shareBtn"
      :window-features="windowFeatures"
      :share-options="redditOptions"
      :use-native-behavior="useNativeBehavior"
      @popup-close="onClose"
      @popup-open="onOpen"
      @popup-block="onBlock"
      @popup-focus="onFocus"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <path
          :fill="svgColor"
          d="M14.238 15.348c.085.084.085.221 0 .306-.465.462-1.194.687-2.231.687l-.008-.002-.008.002c-1.036 0-1.766-.225-2.231-.688-.085-.084-.085-.221 0-.305.084-.084.222-.084.307 0 .379.377 1.008.561 1.924.561l.008.002.008-.002c.915 0 1.544-.184 1.924-.561.085-.084.223-.084.307 0zm-3.44-2.418c0-.507-.414-.919-.922-.919-.509 0-.923.412-.923.919 0 .506.414.918.923.918.508.001.922-.411.922-.918zm13.202-.93c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12zm-5-.129c0-.851-.695-1.543-1.55-1.543-.417 0-.795.167-1.074.435-1.056-.695-2.485-1.137-4.066-1.194l.865-2.724 2.343.549-.003.034c0 .696.569 1.262 1.268 1.262.699 0 1.267-.566 1.267-1.262s-.568-1.262-1.267-1.262c-.537 0-.994.335-1.179.804l-2.525-.592c-.11-.027-.223.037-.257.145l-.965 3.038c-1.656.02-3.155.466-4.258 1.181-.277-.255-.644-.415-1.05-.415-.854.001-1.549.693-1.549 1.544 0 .566.311 1.056.768 1.325-.03.164-.05.331-.05.5 0 2.281 2.805 4.137 6.253 4.137s6.253-1.856 6.253-4.137c0-.16-.017-.317-.044-.472.486-.261.82-.766.82-1.353zm-4.872.141c-.509 0-.922.412-.922.919 0 .506.414.918.922.918s.922-.412.922-.918c0-.507-.413-.919-.922-.919z"
        />
      </svg>
    </s-reddit>
    <s-whats-app
      class="buttonHovLight shareBtn"
      :window-features="windowFeatures"
      :share-options="whatsAppOptions"
      :use-native-behavior="useNativeBehavior"
      @popup-close="onClose"
      @popup-open="onOpen"
      @popup-block="onBlock"
      @popup-focus="onFocus"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <path
          :fill="svgColor"
          d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"
        />
      </svg>
    </s-whats-app>
    <s-sms
      class="buttonHovLight shareBtn"
      :window-features="windowFeatures"
      :share-options="smsOptions"
      :use-native-behavior="useNativeBehavior"
      @popup-close="onClose"
      @popup-open="onOpen"
      @popup-block="onBlock"
      @popup-focus="onFocus"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <path
          :fill="svgColor"
          d="M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625.055 1.83-1.023 4.456-1.993 6.368 2.602-.47 6.301-1.508 7.978-2.536 9.236 2.247 15.968-3.405 15.968-9.457 0-5.812-5.701-10.007-12-10.007zm-4.704 12.474c-.416.33-.996.495-1.74.495-.637 0-1.201-.123-1.69-.367l.274-1.083c.494.249.993.375 1.501.375.293 0 .521-.056.686-.167.315-.214.334-.646.023-.892-.149-.117-.404-.236-.769-.357-1.097-.366-1.645-.937-1.645-1.716 0-.503.202-.917.604-1.243.404-.325.943-.488 1.614-.488.586 0 1.096.099 1.535.298l-.299 1.049c-.401-.187-.82-.28-1.254-.28-.267 0-.476.052-.627.153-.299.204-.293.57-.035.787.126.107.428.246.91.416.532.188.92.42 1.167.698.246.277.369.621.369 1.034 0 .528-.208.958-.624 1.288zm6.638.401c-.091-2.281-.136-3.829-.136-4.642h-.026c-.138.611-.605 2.128-1.399 4.547h-1.031c-.476-1.669-1.178-4.547-1.178-4.547h-.018l-.204 4.642h-1.229l.366-5.75h1.792l1.014 3.967 1.228-3.967h1.811l.309 5.75h-1.299zm5.565-.377c-.419.334-1.011.502-1.76.502-.606 0-1.179-.107-1.727-.381l.29-1.147c.48.246.973.39 1.522.39.286 0 .51-.054.667-.162.302-.204.313-.61.022-.841-.145-.114-.4-.231-.757-.353-1.107-.367-1.67-.954-1.67-1.745 0-.51.208-.938.618-1.267.407-.328.956-.494 1.631-.494.587 0 1.109.101 1.55.3l.023.012-.316 1.111c-.404-.19-.81-.295-1.274-.295-.258 0-.463.05-.609.148-.281.192-.275.533-.032.738.123.103.425.242.899.41.536.188.932.426 1.181.706.25.283.378.636.378 1.055-.001.537-.215.979-.636 1.313z"
        />
      </svg>
    </s-sms>
  </div>
</template>

<script>
import {
  STwitter,
  SFacebook,
  SGmail,
  SReddit,
  SWhatsApp,
  SSms
} from 'vue-socials'

export default {
  name: 'ShareButtons',

  components: {
    STwitter,
    SFacebook,
    SGmail,
    SReddit,
    SWhatsApp,
    SSms
  },
  props: {
    question: {
      type: String,
      required: true,
      default: null
    },
    meta: {
      type: Object,
      required: false,
      default: null
    }
  },

  data () {
    return {
      windowFeatures: {},
      svgColor: '#191970',
      useNativeBehavior: false
    }
  },

  computed: {
    url () {
      return `${process.env.ORIGIN}${this.$route.path.substring(1)}`
    },
    twitterOptions () {
      return {
        url: this.url,
        text: `${this.question}?`,
        hashtags: ['ama', '9takes'],
        via: '9takesdotcom'
      }
    },
    facebookOptions () {
      return {
        url: this.url,
        quote: `${this.question}?`,
        hashtag: '#9takes'
      }
    },
    gmailOptions () {
      return {
        to: '',
        su: 'Answer this question!',
        cc: '',
        bcc: 'usersup@9takes.com',
        //   body: `<!DOCTYPE html>
        //         <html>
        //         <body style="background-color: #e9ecef;">
        //         <h1>The question:\n${this.question}?</h1>
        //           <a href="${this.url}">${this.question}?</a>
        //         </body>
        //         </html>
        // `,
        body: `The question:\n${this.question}?\nSee what everyone else said here ${this.url}`
      }
    },
    redditOptions () {
      return {
        url: this.url,
        title: `${this.question}?`,
        text: `Answer this question:\n${this.question}?\n${this.url}`,
        selftext: true
      }
    },
    whatsAppOptions () {
      return {
        number: '',
        text: `Answer this question:\n${this.question}?\n${this.url}`
      }
    },
    smsOptions () {
      return {
        number: '',
        body: `Answer this question:\n${this.question}?\n${this.url}`
      }
    }
  },

  methods: {
    onClose () {},
    onOpen () {},
    onBlock () {},
    onFocus () {}
  }
}
</script>
<style scoped>
.shareBtn {
  color: #191970;
}
</style>
