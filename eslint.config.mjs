// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  // Your custom configs here
  {
    rules: {
      'vue/html-self-closing': [
        'off',
        {
          html: {
            void: 'never', // 禁用對 HTML void 元素使用自閉合標籤的檢查
          },
        },
      ],
    },
  }
);
