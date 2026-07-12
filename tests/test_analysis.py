import unittest
from pathlib import Path

import pandas as pd

from src.analysis import load_brent_data, load_event_data


class AnalysisTests(unittest.TestCase):
    def test_brent_data_contains_expected_columns(self):
        df = load_brent_data()
        self.assertIsInstance(df, pd.DataFrame)
        self.assertIn("Date", df.columns)
        self.assertIn("Price", df.columns)
        self.assertGreater(len(df), 1000)

    def test_event_catalog_has_enough_entries(self):
        events = load_event_data()
        self.assertGreaterEqual(len(events), 10)
        self.assertIn("Event_Name", events.columns)
        self.assertIn("Category", events.columns)


if __name__ == "__main__":
    unittest.main()
