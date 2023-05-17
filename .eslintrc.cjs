/** @type {import('@typescript-eslint/utils').TSESLint.Linter.Config} */
const config = {
  extends: ['upleveled'],
  extends: ['@upleveled/upleveled'],
  // plugins: ['@ts-safeql/eslint-plugin'],
  // rules: {
  //   '@ts-safeql/check-sql': [
  //     'error',
  //     {
  //       connections: [
  //         {
  //           databaseUrl:
  //             'postgres://graphql_database:graphql_database@localhost:5432/graphql_database',
  //           tagName: 'sql',
  //           fieldTransform: 'camel',
  //           transform: '{type}[]',
  //         },
  //       ],
  //     },
  //   ],
  // },
};

module.exports = config;
