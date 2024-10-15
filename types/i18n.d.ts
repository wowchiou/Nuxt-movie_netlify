import type { I18n } from 'vue-i18n';
import 'vue';

declare module 'vue' {
  interface ComponentCustomProperties {
    $t: I18n['t'];
  }
}
