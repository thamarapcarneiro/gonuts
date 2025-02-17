export default [
    ...compat.extends(
        "plugin:vue/vue3-essential",
        "plugin:vue/vue3-recommended",
        "eslint:recommended",
        -   "@vue/eslint-config-prettier"
        +   // Remove legacy @vue/eslint-config-prettier extension
    ),
    {
        // Your config remains the same
        plugins: {
            "simple-import-sort": simpleImportSort,
            prettier, // Make sure you've imported this
        },
        // ...rest of your configuration
    },
];
