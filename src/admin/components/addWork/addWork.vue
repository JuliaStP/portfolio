<template lang="pug">
  .add-work
    h3.add-work__title Редактирование работы
    form.form(@submit.prevent='handleSubmit')
      .col
        .upload(
          :style='{backgroundImage: `url(${newProject.preview})`}'
          :class="[{active:newProject.preview}, {hovered: hovered}]"
          @dragover='handleDragOver'
          @dragleave='hovered = false'
          @drop='handleChange'
          )
          .add-work__text Перетащите или загрузите для загрузки изображения
          app-button(title='Загрузить' typeAttr="file" @change='handleChange') 
      .col
        .form-inputs
          app-input(title='Название' v-model="newProject.title").add-work__input
          app-input(title='Ссылка' v-model="newProject.link").link.add-work__input
          app-input(title='Описание' fieldType="textarea" v-model="newProject.description").description.add-work__input
          add-tags(title='Добавление тэга' v-model="newProject.techs").add-work__input
        .form-btns
          app-button(plain title='Отмена') 
          app-button(title='Сохранить' @click="emptyFormVisible=false")
</template>

<script>

import appInput from '../../components/input';
import appButton from '../../components/button';
import addTags from '../../components/addTags';
import { mapActions } from 'vuex';

export default {
  components: {
    appButton,
    appInput,
    addTags
  },
  data() {
    return {
      hovered: false,
      newProject: {
        title: '',
        link: '',
        description: '',
        techs: '',
        photo: {},
        preview: ''
      }
    }
  },
  methods: {
    ...mapActions({
      addNewProject: "projects/add"
    }),
    async handleSubmit() {
      await this.addNewProject(this.newProject);
    },
    handleChange(event) {
      event.preventDefault(); 
      const file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];

      this.newProject.photo = file;
      this.renderImg(file);
      this.hovered = false;
    },
    renderImg(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.newProject.preview = reader.result;
      };

      reader.onerror = () => {
        //tooltips
      }

      reader.onabort = () => {
        
      }
    },
    handleDragOver(e) {
      e.preventDefault();
      this.hovered = true;
    }
  },
};
</script>

<style lang="pcss" src='./addWork.pcss'></style>