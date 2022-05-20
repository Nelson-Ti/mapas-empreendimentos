<template lang="pug">
  g.SvgMapPath
    path(
      :id="id",
      :d="d"
      :title="title",
      :fill="fill"
      v-on="$listeners",
      ref="path"
      :style="{fill: fill}"
    )
</template>

<script>

export default {
  name: 'SvgMapPath',
  props: {
    id: String,
    title: String,
    d: String,
    fill: [String, Number],
  },
};
</script>