"""Application entry point."""


def greeting() -> str:
    """Return the project's default greeting."""
    return "Welcome to Grace and Saurabh's wedding project!"


def main() -> None:
    """Run the application."""
    print(greeting())


if __name__ == "__main__":
    main()
