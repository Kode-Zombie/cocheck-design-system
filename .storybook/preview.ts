import type { Preview } from '@storybook/react-vite'
import '../src/index.css'
import '../src/components/components.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - 접근성 위반을 테스트 UI에만 표시
      // 'error' - CI에서 접근성 위반 시 실패 처리
      // 'off' - 접근성 검사를 건너뜀
      test: 'todo'
    },

    backgrounds: {
      default: '중립',
      values: [
        { name: '중립', value: '#f5f7fb' },
        { name: '흰색', value: '#ffffff' },
      ],
    },
  },
};

export default preview;
