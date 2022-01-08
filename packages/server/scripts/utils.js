module.exports.handleShellOutput = function handleShellOutput(output) {
  const { code } = output;

  if (code !== 0) {
    process.exit(code);
  }
};
