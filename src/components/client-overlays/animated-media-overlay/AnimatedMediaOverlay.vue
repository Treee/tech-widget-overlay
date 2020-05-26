<template>
  <div class="animated-media-wrapper">
    <video class="animated-video" autoplay loop>
      <source :src="getMediaPath" type="video/webm" />
    </video>
  </div>
</template>

<script>
export default {
  name: "AnimatedMediaOverlay",
  props: {
    mediaName: String,
    fileType: String
  },
  computed: {
    getMediaPath() {
      //   return `https://treee.github.io/tech-widget-overlay/assets/images/animated-media/${this.mediaName}.${this.fileType}`;
      return `./assets/images/animated-media/${this.mediaName ||
        "viper-test"}.${this.fileType || "webm"}`;
    }
  },
  methods: {}
};
</script> 

<style language="scss">
.animated-media-wrapper {
  height: fit-content;
  width: 40%;
  margin-bottom: -15rem;
}
</style>
