<template>
  <div class="image-upload">
    <div class="image-box image-preview">
      <vue-cropper
        v-if="imgSrc"
        ref="cropper"
        class="vue-cropper"
        :src="imgSrc"
        alt="Preview Image"
        guides
        background>
      </vue-cropper>
    </div>

    <div class="button-group">
      <!-- 이미지가 존재하면 hidden 처리 추가 -->
      <div v-if="imgSrc === null">
        <button @click="handleClickAdd">Add Image</button>
        <input
          ref="input"
          type="file"
          :accept="acceptType"
          @change="handleFileChange">
      </div>
      <div v-else>
        <button @click="handleClickCancel">Cancel</button>
        <button @click="handleClickReload">Reload</button>
        <button @click="handleClickConfirm">Confirm</button>
        <button @click="handleClickZoom(true)">Zoom In(+)</button>
        <button @click="handleClickZoom(false)">Zoom Out(-)</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.min.css';

@Component({
    components: {
        VueCropper,
    },
})
export default class ImageUpload extends Vue {
  @Prop({ default: 'image/*' })
  private acceptType!: string;

  // data
  private imgOrgSrc: string | ArrayBuffer | null = null;
  private imgSrc: string | ArrayBuffer | null = null;

  // methods
  private handleClickAdd(): void {
      (<HTMLInputElement>this.$refs.input).click();
  }

  private handleFileChange(event: { target: HTMLInputElement}): void {
      this.imgSrc = null;
      const file = event.target.files[0];

      const fileReader: FileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
          this.imgSrc = fileReader.result;
          this.imgOrgSrc = this.imgSrc;
      };
  }

  @Emit('cancel')
  private handleClickCancel(): void {
      this.imgSrc = null;
      this.imgOrgSrc = null;
  }

  @Emit('cancel')
  private handleClickReload(): void {
      this.imgSrc = this.imgOrgSrc;
      (<Vue>this.$refs.cropper).reset();
  }

  private handleClickZoom(isZoomIn: boolean): void {
      (<Vue>this.$refs.cropper).relativeZoom(isZoomIn ? 0.1 : -0.1);
  }

  @Emit('upload')
  private handleClickConfirm(): string | ArrayBuffer | null {
      this.imgSrc = (<Vue>this.$refs.cropper).getCroppedCanvas().toDataURL();
      return this.imgSrc;
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
      input[type=file] {
        display: none;
      }
    }
    .vue-cropper {
      width: 100%;
      height: 100%;
    }
  }
</style>
