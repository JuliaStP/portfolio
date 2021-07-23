<template lang="pug">
  .add-work(v-if="emptyFormVisible" )
    h3.add-work__title Редактирование работы

    form.form(@submit.prevent='handleSubmit' v-if="editMode = true")
      .col
        .upload(
          :style='{backgroundImage: `url(${currentProject.preview})`}'
          :class="[{active:currentProject.preview}, {hovered: hovered}]"
          @dragover='handleDragOver'
          @dragleave='hovered = false'
          @drop='handleChange'
          )
          .add-work__text Перетащите или загрузите для загрузки изображения
          app-button(title='Загрузить' plain typeAttr="file" @change='handleChange') 
      .col
        .form-inputs
          app-input(title='Название' @input="$emit('input', $event)" @keydown.native.enter="onApprove" :errorText="errorText" :value="value" v-model="currentProject.title" :errorMessage="validation.firstError('currentProject.title')").add-work__input 
          app-input(title='Ссылка' @input="$emit('input', $event)" @keydown.native.enter="onApprove" :errorText="errorText" :value="value" v-model="currentProject.link" :errorMessage="validation.firstError('currentProject.link')").link.add-work__input 
          app-input(title='Описание' @input="$emit('input', $event)" @keydown.native.enter="onApprove" :errorText="errorText" :value="value" fieldType="textarea" v-model="currentProject.description" :errorMessage="validation.firstError('currentProject.description')").description.add-work__input 
          add-tags(title='Добавление тэга' @input="$emit('input', $event)" @keydown.native.enter="onApprove" :errorText="errorText" :value="value" v-model="currentProject.techs" :errorMessage="validation.firstError('currentProject.techs')").add-work__input 
        .form-btns
          button(type="button" title='Отмена' @click="$emit('cancel')").btn.plain Отмена
          button(title='Обновить' v-on="$listeners" typeAttr="submit" @enter="onApprove").btn Сохранить
</template>

<script>
import{Validator, mixin as ValidatorMixin} from 'simple-vue-validator';

import appInput from '../../components/input';
import appButton from '../../components/button';
import addTags from '../../components/addTags';
import { mapActions } from 'vuex';

export default {
  mixins: [ValidatorMixin],
  validators: {
    'currentProject.title': value => {
      return Validator.value(value).required('Введите название проекта');
    },
    'currentProject.link': value => {
      return Validator.value(value).required('Введите ссылку');
    },
    'currentProject.description': value => {
      return Validator.value(value).required('Введите описание проекта');
    },
    'currentProject.techs': value => {
      return Validator.value(value).required('Введите тэги проекта');
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
    editModeByDefault: Boolean,
  },

  components: {
    appButton,
    appInput,
    addTags
  },
  data() {
    return {
      emptyFormVisible: true,
      editMode: this.editModeByDefault,
      hovered: false,
      title: this.value,
      link: this.value,
      description: this.value,
      techs: this.value,
      
      currentProject: {
        title: '',
        link: '',
        description: '',
        techs: '',
        photo: {},
        preview: '',
        editMode: false
      }
    }
  },
  methods: {
    ...mapActions({
      addNewProject: "projects/add",
      showTooltip: 'tooltips/show'
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
        await this.addNewProject(this.currentProject);
        this.emptyFormVisible = false;
        currentProject.title = '';
        currentProject.link = '';
        currentProject.description = '';
        currentProject.techs = '';
        this.showTooltip({
          text: 'Проект добавлен',
          type: "success"
        });        
      } catch (error) {
        console.log('ошибка');       
      }
     
    },
    handleChange(event) {
      event.preventDefault(); 
      const file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];

      this.currentProject.photo = file;
      this.renderImg(file);
      this.hovered = false;
    },
    renderImg(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.currentProject.preview = reader.result;
        this.showTooltip({
          text: 'Картинка добавлена',
          type: "success"
        });
      };

      reader.onerror = () => {
        this.showTooltip({
          text: 'Картинка не добавлена',
          type: "error"
        });
      }

      reader.onabort = () => {
        this.showTooltip({
          text: 'Картинка добавлена',
          type: "success"
        });
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