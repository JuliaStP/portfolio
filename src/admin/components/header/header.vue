<template>
  <div class="header-component">
    <headline title="Панель администрирования">
      <user /> 
    </headline>
    <navigation />
  </div>
</template>

<script>

import headline from '../../components/headline';
import user from '../../components/user';
import navigation from '../../components/navigation';

export default {
  components: {
    headline,
    user,
    navigation
  }
}
</script>

<style lang="postcss" scoped>

</style>