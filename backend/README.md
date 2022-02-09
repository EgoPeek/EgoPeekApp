# Backend server for EgoPeek App

A microservice to handle the provisioning and lifecycle of EgoPeek resources

## Dependencies

- Python 3.9.4+
- [Poetry](https://python-poetry.org/)

## Getting Started

```zsh
# macOS/Linux only
# Set your poetry alias to use python3 instead of python
alias poetry="python3 $HOME/.poetry/bin/poetry"

# Navigate to the main repository on your local machine
# Install project dependencies
poetry install

# Run the server
poetry run python -m backend.main
```

## Using the server for testing local development

- If the server is running and you need to take it down from the terminal
    - CTRL+C or CMD+C
- If the server is running and you want to test new code changes
    - Save your files
    - Take the server down
    - Restart the server with ```zsh poetry run python -m backend.main```
- While the server is running, you can use a tool like [Insomnia](https://insomnia.rest/) to test endpoints
- Alternatively, navigate to localhost:5000/docs, or localhost:5000/redocs to interact with the server endpoints