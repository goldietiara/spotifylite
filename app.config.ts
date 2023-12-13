export default defineAppConfig({
  ui: {
    primary: "green",
    gray: "cool",
    strategy: "override",
    button: {
      color: {
        black: {
          ghost: "hover:text-white",
          solid:
            " shadow-sm text-white dark:text-gray-200 bg-black/70 hover:bg-black disabled:text-gray-400 dark:bg-black/70 dark:hover:bg-black dark:disabled:text-gray-400 disabled:text-gray-400 dark:disabled:bg-black/50 disabled:bg-black/50 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
        },
        white: {
          solid:
            " shadow-sm text-black dark:text-black bg-white disabled:text-gray-400 dark:bg-white dark:disabled:text-gray-400 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
          ghost:
            " shadow-sm text-white dark:text-white bg-white/30 disabled:text-gray-400 dark:bg-white/30 dark:disabled:text-gray-400 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
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
    input: {
      wrapper: "w-full",
      rounded: "rounded-sm",
      padding: {
        xl: "px-3.5 py-4",
      },
      color: {
        white: {
          outline:
            "shadow-sm bg-transparent dark:bg-transparent text-gray-200 dark:text-gray-200 ring-1 ring-inset ring-gray-400 dark:ring-gray-400 focus:ring-primary-500 dark:focus:ring-primary-400",
        },
        gray: {
          outline:
            "shadow-sm bg-white/10 dark:bg-white/10 text-white dark:text-gray-400 placeholder-white dark:placeholder-gray-400 ring-0 ring-inset ring-transparent dark:ring-transparent focus:ring-0 focus:ring-transparent dark:focus:ring-transparent",
        },
      },
    },
    textarea: {
      rounded: "rounded-sm",

      color: {
        gray: {
          outline:
            "shadow-sm bg-white/10 dark:bg-white/10 text-white dark:text-gray-400 placeholder-white dark:placeholder-gray-400 ring-0 ring-inset ring-transparent dark:ring-transparent focus:ring-0 focus:ring-transparent dark:focus:ring-transparent",
        },
      },
    },
    select: {
      base: " hover:cursor-pointer relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0",
      rounded: "rounded-sm",
      padding: {
        xl: "px-3.5 py-4",
      },
      color: {
        white: {
          outline:
            "shadow-sm bg-transparent dark:bg-transparent text-gray-200 dark:text-gray-200 ring-1 ring-inset ring-gray-400 dark:ring-gray-400 focus:ring-primary-500 dark:focus:ring-primary-400",
        },
      },
    },
    formGroup: {
      wrapper: "w-full",
    },
    avatar: {
      size: {
        xl: "h-[100px] w-[100px] text-3xl",
      },
    },
    modal: {
      background: "bg-zinc-800 dark:bg-zinc-800",
      overlay: { background: "bg-black/50 dark:bg-black/50" },
    },
    skeleton: {
      background: "bg-zinc-800",
    },
  },
});
