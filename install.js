module.exports = {
  requires: {
    bundle: "ai"
  },
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          "python3 -m venv venv",
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "venv",
        message: [
          "pip install -r requirements/all_models.txt",
        ]
      }
    },
  ]
}