import unittest

from saurabh_grace_wedding.main import greeting


class GreetingTests(unittest.TestCase):
    def test_greeting(self) -> None:
        self.assertEqual(
            greeting(),
            "Welcome to Grace and Saurabh's wedding project!",
        )


if __name__ == "__main__":
    unittest.main()
