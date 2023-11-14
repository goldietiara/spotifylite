export default defineAppConfig({
  ui: {
    primary: "green",
    gray: "cool",
    strategy: "override",
    button: {
      color: {
        black: {
          solid:
            " shadow-sm text-white dark:text-gray-200 bg-black/70 hover:bg-black disabled:text-gray-400 dark:bg-black/70 dark:hover:bg-black dark:disabled:text-gray-400 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
        },
        white: {
          solid:
            " shadow-sm text-black dark:text-black bg-white disabled:text-gray-400 dark:bg-white dark:disabled:text-gray-400 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
        },
      },
    },
    table: {
      divide: "divide-y divide-gray-400 dark:divide-gray-400/60",
      tbody: "divide-transparent dark:divide-transparent w-full",
      thead: "text-left",
      base: "min-w-full w-full table-fixed",
      tr: {
        base: "group ",
      },
      th: {
        base: "hover:none",
        color: "text-gray-400 dark:text-gray-400",
        font: "font-normal",
        padding: "px-3 py-1 pt-2",
      },
      td: {
        base: "whitespace-nowrap text-ellipsis overflow-hidden",
        padding: "px-3 py-2",
        color: "text-gray-400 dark:text-gray-400 group-hover:bg-gray-400/5",
      },
    },
  },
});
