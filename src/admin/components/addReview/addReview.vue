<template>
  <div class="add-review" >
    <h3 class="add-reivew__title">Новый отзыв</h3>
    <form class="review-form" @submit.prevent='handleSubmit'>
      <div class="review-avatar__wrapper">
        <div class="review-avatar__upload"
          :class="[{active:newReview.preview}, {hovered: hovered}]"
          :style='{backgroundImage: `url(${newReview.preview})`}'
          @dragover='handleDragOver'
          @dragleave='hovered = false'
          @drop='handleChange'>
        </div>
        <app-button plain title="Добавить фото" class="review-avatar__title" typeAttr="file" @change='handleChange'></app-button>
      </div>
      <div class="review">
        <div class="review__row">
          <app-input no-side-paddings="no-side-paddings" :value="value" class="review__input" title="Имя автора" v-model="newReview.author"></app-input>
          <app-input no-side-paddings="no-side-paddings" :value="value" class="review__input" title="Титул автора" v-model="newReview.occ"></app-input>
        </div>
        <div class="review__row">
          <app-input :value="value" no-side-paddings="no-side-paddings" class="review__textarea" title="Отзыв" fieldType="textarea" v-model="newReview.text"></app-input>
        </div>
        <div class="review__row">
          <div class="review__btns">
            <button class="cancel" title='Отмена' @click="$emit('cancel')">Отмена</button>
            <app-button title='Сохранить' @click="$emit('edit-review', editMode = false)"/>

          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>

import appInput from '../../components/input';
import appButton from '../../components/button';
import icon from "../icon";
import { mapActions } from 'vuex';

export default {
  components: {
    appButton,
    appInput,
    icon
  },
  props: {
      value: {
      type: String,
      default: ""
    },
    emptyFormVisible: Boolean
  },
  data() {
    return {
      editMode: this.emptyFormVisible,
      hovered: false,
      newReview: {
        author: '',
        occ: '',
        text: '',
        photo: {},
        preview: ''
      }
    }
  },
  methods: {
    ...mapActions({
      addNewReview: "reviews/add"
    }),
    async handleSubmit() {
      await this.addNewReview(this.newReview);
      this.editMode = false;
    },
    handleChange(event) {
      event.preventDefault(); 
      const file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];

      this.newReview.photo = file;
      this.renderImg(file);
      this.hovered = false;
    },
    renderImg(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.newReview.preview = reader.result;
      };    
    },
    handleDragOver(e) {
        e.preventDefault();
        this.hovered = true;
    }
  }
};
</script>

<style lang="stylus" scoped src="./addReview.pcss"></style>