import { CustomFlowbiteTheme } from 'flowbite-react/lib/esm/components/Flowbite/FlowbiteTheme';

export const flowbiteTheme: CustomFlowbiteTheme = {
  navbar: {
    root: {
      base: 'border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800',
      inner: {
        base: 'mx-auto flex flex-wrap items-center justify-between px-4 py-2 md:py-3',
      },
    },
    collapse: {
      list: 'mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8',
    },
    link: {
      base: 'block py-2 pr-4 pl-3 md:p-0 rounded transition-colors',
      active: {
        on: 'bg-sky-700 text-white dark:text-white md:bg-transparent md:text-sky-700',
        off: 'text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:hover:bg-transparent md:hover:text-sky-700 md:dark:hover:bg-transparent md:dark:hover:text-white',
      },
    },
  },
};
