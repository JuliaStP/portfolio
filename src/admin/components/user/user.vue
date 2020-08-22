<template>
  <div class="user-component">
    <avatar size="2.9" :src="userPic" />
    <div class="username">Юлия Андреева</div>
  </div>
</template>

<script>
import avatar from '../avatar';

export default {
  components: {
    avatar,
  },
  computed: {
    userPic() {
      return require('../../../images/content/user.jpg').default;
    }
  }
};
</script>

<style lang="postcss">
  .user-component {
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
  }

  .username {
    margin-left: 20px;
  }
</style>