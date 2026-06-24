import type { Config } from 'tailwindcss'

const config: Config = {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        background: '#fafafa',
        foreground: '#1a1a1a',
        card: {
          DEFAULT: '#ffffff',
          foreground: '#1a1a1a',
        },
        primary: {
          DEFAULT: '#8daa91',
          foreground: '#fafafa',
        },
        secondary: {
          DEFAULT: '#f3f3f3',
          foreground: '#1a1a1a',
        },
        muted: {
          DEFAULT: '#f3f3f3',
          foreground: '#737972',
        },
        accent: {
          DEFAULT: '#f3f3f3',
          foreground: '#1a1a1a',
        },
        border: '#e5e5e5',
        input: '#e5e5e5',
        ring: '#8daa91',
        destructive: '#ba1a1a',
        stroke: '#e5e5e5',
        sage: {
          DEFAULT: '#8daa91',
          foreground: '#fafafa',
        },
      },
      borderRadius: {
        sm: '0.125rem',
        md: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
        DEFAULT: '0.25rem',
      },
    },
  },
}

export default config
