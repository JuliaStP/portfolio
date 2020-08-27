<template lang="pug">
  .card-work
    .card-work__preview
      img(:src="project.img").card-work__img
      tags.card-work__tags 
        ul.tags__list
          li.tags__item(v-for="tag in tags") {{tags}}
    .card-work__desc
      h4.card-work__title {{projects.title}}
      p.card-work__text {{projects.desc}}
      a(:href="projects.link").card-work__link {{projects.link}}
      .card-work__btns
        button Править 
        button Удалить

</template>

<script>
export default {
  props: {
    work: {
      type: Object
    }
  },
  computed: {
    tags() {
      return this.work.skills.split(', ')
    }
  }
}
</script>

<style lang="pcss">

  .tags__list {
    display:flex;
  }

  .tags__item {
    font-size: 15px;
    color:grey;
    background: #F3F6F9;
    border-radius: 40px;
    padding: 8px 16px;
    margin-right: 8px;
  }

  .card-work__tags {
    position: absolute;
    bottom: 14px;
    right: 16px;
  }
  
  .card-work {
    width: 340px;
    background: #fff;
    filter: drop-shadow(10px)

    &--editing {
      &:before {
        content: '';
        display: flex;
        width:100%;
        height: 100%;
        top: 0;
        left: 0;
        position: absolte;
        background: rgba(255, 255, 255, 0.6);
        z-index: 1;
      }
    }
  }

  .card-work__preview {
    position: relative;
  }

  .card-work__img {
    width: 100%;
    height: 190px;
    object-fit: cover;
  }
  
  .card-work__desc {
    padding: 34px 34px 44px 34px;
  }

  .card-work__title {
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 6px;
    color: grey;
    line-height: 25px;
  }

  .card-work__text {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 26px;
    color: grey;
    line-height: 30px;
  }

  .card-work__link {
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    display: inline-flex;
    align-items: center;
    margin-bottom: 41px;
  }


  .card-work__btns{
    display: flex;
    justify-content:space-between;
  }

</style>