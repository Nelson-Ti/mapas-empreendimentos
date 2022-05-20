<template lang="pug">
  .SvgMap
    svg(
      xmlns="http://www.w3.org/2000/svg",
      xmlns:xlink="http://www.w3.org/1999/xlink",
      version="1.1"
      width="100%"
      height="100%"
      :viewBox="`0 0 ${viewBoxW} ${viewBoxH}`"
      ref="svg"
    )
      g(:transform="`translate(${translateL}, ${translateT}) scale(${scale})`" ref="g")
       SvgMapPath(
          v-for="path in CONTINENTS",
          :key="path.id",
          v-bind="path",
          :fill="randomFill()"
        )
</template> 

<script>
import SvgMapPath from '../../components/mapas/SvgMapPath';
import {CONTINENTS} from '../../core/models/Mapas/WorldContinents';

export default {
  name: 'SvgMap',
  components: {
    SvgMapPath,
  },

  data() {
    return {
      viewBoxW: 1140,
      viewBoxH: 580,
      translateL: 200,
      translateT: 0,
      scale: 1,
      CONTINENTS,
    };
  },
  methods:{
    getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  },

  randomFill() {
    const alpha = this.getRandomArbitrary(30, 100);
    return `rgba(144,190,109, ${alpha}%`;
  },
  }
};
</script>