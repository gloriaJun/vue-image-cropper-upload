<template>
  <div class="image-upload">
    <croppa
        ref="croppa"
        v-model="myCroppa"
    ></croppa>
    <div class="button-group">
      <!-- 이미지가 존재하면 hidden 처리 추가 -->
      <button @click="handleClickAdd">Add Image</button>
      <button @click="handleClickCancel">Cancel</button>
      <button @click="handleClickConfirm">Confirm</button>
      <button @click="handleClickZoom(true)">Zoom In(+)</button>
      <button @click="handleClickZoom(false)">Zoom Out(-)</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';

@Component({})
export default class ImageUpload extends Vue {
  @Prop({ default: 'image/*' })
  private acceptType!: string;
  // @Prop({ default: 1024 })
  // private fileSizeLimit!: number;

  // data
  myCroppa: object = {};

  // methods
  private handleClickAdd(): void {
    this.$refs.croppa.chooseFile();
  }

  private handleClickZoom(isZoomIn: boolean): void {
    if (isZoomIn) {
      this.myCroppa.zoomIn();
    } else{
      this.myCroppa.zoomOut()
    }
  }

  @Emit('cancel')
  private handleClickCancel(): void {
    this.myCroppa.remove();
  }

  @Emit('upload')
  private handleClickConfirm(): string | void {
    console.log('?/');
    const url = this.myCroppa.generateDataUrl();
    if (!url) {
      alert('no uploaded image');
      return;
    }
    return url;
  }
}
</script>

<style scoped lang="scss">
  .image-upload {
    .button-group {
      button {
        padding: .5rem 1rem;
        &:not(:last-child) {
          margin-right: .3rem;
        }
      }
    }
  }
</style>
