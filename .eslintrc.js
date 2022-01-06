/* eslint-disable quotes */
module.exports = {
  extends: "standard-with-typescript",
  parserOptions: {
    project: "./tsconfig.json"
  },
  rules: {
    "@typescript-eslint/strict-boolean-expressions": 0,
    "no-return-await": "off",
    "@typescript-eslint/return-await": "off",
    "@typescript-eslint/restrict-plus-operands": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-var-requires": "off"
  }

}
