<template lang="pug">
  .works-section
    .container
      h1.page-title Блок "Работы"
    .works-container
      .container.container--mobile
        add-work
        ul.works
          li.works__item
            button.add-button
              .add-button__icon
              .add-button__text Добваить работу
          li.works__item(v-for="works in work")
            card-works(:work='work')

</template>

<script>

export default {
  components: {
    // cardWorks: () => import("components/cardWorks"),
    // addWork: () => import('./add-work/add-work')
  },
  data() {
    return {
      works: []
    }
  },
  methods : {
    requirePhotos() {
      this.works = this.works.map(work => {
        work.photo = require(projects.img)
      })
    }
  },
  // mounted: {
  //   this.requirePhotos
  // },
  created() {
    this.works = require('../../../data/projects.json')
  }
}
  

</script>

<style lang="pcss" scoped>

@mixin phones() {
  @media screen and (max-width: $bp-phones) {
    @content;
  }
}

.container--mobile {
  width: 100%
}

.works {
  display:flex;
  flex-wrap: wrap;
  margin-left: -18px;
  padding-bottom: 9px;
}

.works__item {
  flex: 1;
  margin-left: 18px;
  margin-bottom:28px;

  @include phones {
    margin-bottom: 10px;
  }
}

.add-button {
  background: linear-gradient(149.16deg, #0D5EE5 13.11%, #343DD0 84.24%);
  width: 100%;
  height: 100%;
  min-width: 340px;
  padding: 50px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @include phones {
    flex-direction: row;
  }
}

.add-button__text {
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    color: #FFFFFF;
    max-width: 93px;

    @include phones {
      max-width: initial;
    }
  }

.add-button__icon {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 2px;
  margin-bottom: 23px;
  position: relative;

    @include phones {
      width: 50px;
      height: 50px;
      border: 1px;
      margin-bottom: 0;
      margin-right: 21px;
    }

   &:after {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      content: '';
      width: 33px;
      height: 3px;
      background: #fff;
      display: flex;

      @include phones {
        width: 11px;
        height: 1px;
      }
    } 

  &:before {
      transform: translate(-50%, -50%) rotate(90deg);
      position: absolute;
      top: 50%;
      left: 50%;
      content: '';
      width: 33px;
      height: 3px;
      background: #fff;
      display: flex;

      @include phones {
        width: 11px;
        height: 1px;
      }
  }
}


</style>