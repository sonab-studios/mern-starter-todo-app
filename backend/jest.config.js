/* eslint-disable no-undef */
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@common/(.*)$': '<rootDir>/src/common/$1',
        '^@db/(.*)$': '<rootDir>/src/db/$1',
        '^@server/(.*)$': '<rootDir>/src/server/$1',
    },
};

process.env = Object.assign(process.env, {
    NODE_ENV: 'test',
});
