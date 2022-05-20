import Vue from 'vue';
import { colors } from 'vuetify/lib';
import Vuetify from 'vuetify/lib/framework';
import pt from 'vuetify/src/locale/pt';

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { pt },
    current: 'pt',
  },
  theme: {
    dark: false,
    default: 'light',
    options: {
      customProperties: true
    },
    themes: { 
      light: {
        primary: '#F5621D',
        toolbar: '#F5F5F5',
        cardColor: '#FFFF99',
        //ContratoParcela
        chipDarkPurple: colors.deepPurple.lighten1,
        chipLightPurple: colors.deepPurple.lighten3,
        chipBlue: colors.blue.lighten3,
        chipRed: colors.red.lighten3,
        chipGray: colors.grey.lighten1,
        chipLime: colors.lime.lighten3,
        chipTeal: colors.teal.lighten3
      },
      dark: {
        primary: '#f5621d',
        toolbar: '#f5f5f5',
        cardColor: '#C79F1B',
        //ContratoParcela
        chipDarkPurple: colors.deepPurple.lighten1,
        chipLightPurple: colors.deepPurple.lighten3,
        chipBlue: colors.blue.lighten3,
        chipRed: colors.red.lighten3,
        chipGray: colors.grey.lighten1,
        chipLime: colors.lime.lighten3,
        chipTeal: colors.teal.lighten3
      }
    },
  }
});
