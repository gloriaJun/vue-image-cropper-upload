<template>
  <div id="app">
    <h2>Image Upload</h2>
    <image-upload
        @cancel="onImageUploadCancel"
        @upload="onImageUpload"></image-upload>
    <img
      v-if="url"
      :src="url"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ImageUpload from './components/ImageUpload.vue';

@Component({
  components: { ImageUpload },
})
export default class App extends Vue {
  // data
  private url: string = '';

  // method
  private onImageUpload(url: string) {
    this.url = url;
  }

  private onImageUploadCancel() {
    this.url = '';
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  img {
    margin: 1rem;
  }
}
</style>
