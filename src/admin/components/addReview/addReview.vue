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
          <app-input @input="$emit('input', $event)" no-side-paddings="no-side-paddings" @keydown.native.enter="onApprove" :errorText="errorText" :value="value" class="review__input" title="Имя автора" v-model="newReview.author" :errorMessage="validation.firstError('newReview.author')"></app-input>
          <app-input @input="$emit('input', $event)" no-side-paddings="no-side-paddings" @keydown.native.enter="onApprove" :errorText="errorText" :value="value" class="review__input" title="Титул автора" v-model="newReview.occ" :errorMessage="validation.firstError('newReview.occ')"></app-input>
        </div>
        <div class="review__row">
          <app-input @input="$emit('input', $event)" :value="value" no-side-paddings="no-side-paddings" @keydown.native.enter="onApprove" :errorText="errorText" class="review__textarea" title="Отзыв" fieldType="textarea" v-model="newReview.text" :errorMessage="validation.firstError('newReview.text')"></app-input>
        </div>
        <div class="review__row">
          <div class="review__btns">
            <button type="reset" class="cancel" title='Отмена' @click="$emit('cancel')">Отмена</button>
            <app-button title='Сохранить' @enter="onApprove" @click="$emit('edit-review', editMode = false)"/>

          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>

import{Validator, mixin as ValidatorMixin} from 'simple-vue-validator';

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
  mixins: [ValidatorMixin],
  validators: {
    'newReview.author': value => {
      return Validator.value(value).required('Введите автора отзыва');
    },
    'newReview.occ': value => {
      return Validator.value(value).required('Введите должность автора');
    },
    'newReview.text': value => {
      return Validator.value(value).required('Введите отзыв');
    }  
  },
  props: {
    value: {
    type: String,
    default: ""
  },
    errorText: {
    type: String,
    default: ""
  },
    emptyFormVisible: Boolean,
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
      showTooltip: 'tooltips/show',
      addNewReview: "reviews/add"
    }),
    async onApprove() {
      if ((await this.$validate()) === false) 
      return;
      if (this.value.trim() === "") return false;
      if (this.title.trim() === this.value.trim()) {
        this.editMode = false;
      } else {
        this.$emit("approve", this.value);
      }
    },
    async handleSubmit() {
      try {
        await this.addNewReview(this.newReview);
        this.editMode = false;
        newReview.author = '';
        newReview.occ = '';
        newReview.text = '';
        this.showTooltip({
          text: 'Отзыв добавлен',
          type: "success"
        });
      } catch (error) {
        console.log(error.message);
        // this.showTooltip({
        //   text: 'Заполните указанные поля',
        //   type: "error"
        // });
      }
      
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
        this.showTooltip({
          text: 'Аватар добавлен',
          type: "success"
        });        
      };
      
      reader.onerror = () => {
        this.showTooltip({
          text: 'Аватар не добавлен',
          type: "error"
        });
      }

      reader.onabort = () => {
        this.showTooltip({
          text: 'Аватар добавлен',
          type: "success"
        });
      }
    },
    handleDragOver(e) {
        e.preventDefault();
        this.hovered = true;
    }
  }
};
</script>

<style lang="stylus" scoped src="./addReview.pcss"></style>