<template>
  <card slim :simple="false">
    <edit-line 
      :blocked="false"
      slot="title" 
      v-model="categoryTitle" 
      :editmodeDefault="empty"
      @remove="$emit('remove-category', $event)" 
      @approve="$emit('approve', $event)"
      @edit-category="$emit('edit-category', categoryTitle)"
    />
    <template slot='content'>
      <ul class="skills" v-if="empty === false">
        <li class="item" v-for="skill in skills" :key="skill.id">
          <skill 
            :skill="skill" 
            @remove="$emit('remove-skill', $event)"
            @approve="$emit('edit-skill', $event)" />
        </li>
      </ul>
      <div class="bottom-line">
        <add-line 
          @approve="$emit('create-skill', $event)"
          :blocked="empty" />
      </div>
    </template>
  </card>
</template>

<script>
import card from "../card";
import editLine from "../editLine";
import skill from "../skill";
import addLine from "../addLine";

export default {
  components: {
    card,
    editLine,
    skill,
    addLine
  },
  props: {
    card: 'default',
    empty: Boolean,
    title: {
      type: String,
      default: ""
    },
    skills: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      categoryTitle: this.title,
    };
  }
};
</script>

<style lang="postcss">
@mixin tablets() {
  @media screen and (max-width: $bp-tablets) {
    @content;
  }
}

@mixin phones() {
  @media screen and (max-width: $bp-phones) {
    @content;
  }
}

  .title {
    color: #414C63;
  }

  .bottom-line {
    padding-top: 70px;
    margin-top: auto;
    padding-left: 25%;

    @include tablets {
      padding-left: 0;
    }

    @include phones {
      padding-top: 30px;
    }
  }
</style>