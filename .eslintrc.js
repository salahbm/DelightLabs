module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'expo',
  ],
  plugins: ['@typescript-eslint', 'react', 'react-native', 'import'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  env: {
    'react-native/react-native': true,
  },
  ignorePatterns: [
    'node_modules/**/*',
    'build/**/*',
    '.expo/**/*',
    'babel.config.js',
    'metro.config.js',
  ],
  rules: {
    'react-native/no-unused-styles': 2,
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    'import/prefer-default-export': 0,
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'index', 'sibling', 'parent', 'type'],
        pathGroups: [
          {
            pattern: '(react|expo)**',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@app/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@assets/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@components/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@constants/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@hooks/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@providers/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@stores/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@styles/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@types/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@locales/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@utils/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@views/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react', 'react-native', 'expo**', '@**'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
