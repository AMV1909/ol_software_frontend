const nextJest = require("next/jest");

const createJestConfig = nextJest({
    dir: "./",
});

const customJestConfig = {
    preset: "ts-jest",
    setupFilesAfterEnv: ["@testing-library/jest-dom"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    moduleDirectories: ["node_modules", "<rootDir>/", "src"],
    modulePathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
    testEnvironment: "jsdom",
};

module.exports = createJestConfig(customJestConfig);
export {};
