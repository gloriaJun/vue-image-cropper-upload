<template>
  <div id="app">
    <rx-js-sample></rx-js-sample>
    <h2>Image Upload</h2>
    <image-upload
        @cancel="onImageUploadCancel"
        @upload="onImageUpload"></image-upload>

    <h4>Result Image</h4>
    <div class="image-box">
      <img
        v-if="url"
        :src="url">
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RxJsSample from './components/RxJsSample.vue';
import ImageUpload from './components/ImageUpload.vue';

@Component({
  components: {
    ImageUpload,
    RxJsSample,
  },
})
export default class App extends Vue {
  // data
  private url: string | null = null;

  // method
  private onImageUpload(url: string) {
    this.url = url;
  }

  private onImageUploadCancel() {
    this.url = null;
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;

  h4 {
    margin-top: 3rem;
  }
  .image-box {
    display: flex;
    justify-content: center;
    margin: 1rem;
    width: 500px;
    height: 300px;
    border: 1px solid;
    background-color: #eee;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
