module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          "rm -rf venv",
        ]
      }
    },
  ]
}