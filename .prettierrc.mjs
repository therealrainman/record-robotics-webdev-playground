export default {
    plugins: ["prettier-plugin-astro"],
    tabWidth: 4,
    useTabs: false,
    printWidth: 120,
    endOfLine: "lf",
    overrides: [
        {
            files: "*.astro",
            options: {
                parser: "astro",
            },
        },
        {
            files: "*.json",
            options: {
                tabWidth: 2,
                printWidth: 80,
            },
        },
    ],
};
