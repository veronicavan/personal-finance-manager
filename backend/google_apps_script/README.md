# Transaction Categorizer - Google Apps Script

This script provides an AI-powered transaction categorization system for Google Sheets. It uses a training-based approach to learn from existing categorized transactions and suggest categories for new transactions.

## Features

- Case-insensitive transaction and category matching
- Multiple category suggestions with confidence scores
- Interactive user prompts for ambiguous categorizations
- Training data management
- Category management
- Amount-based confidence adjustments

## Setup

1. Open your Google Sheet
2. Go to Extensions > Apps Script
3. Copy the contents of `transaction_categorizer.gs` into the script editor
4. Save the script
5. Refresh your Google Sheet

## Required Sheet Structure

Your Google Sheet should have a sheet named "Transactions" with the following columns:
- Date
- Description
- Amount
- Category
- Suggested Category
- Confidence

## Future Improvements

### Confidence Level Enhancement
The current confidence calculation needs to be improved to better handle similar entries in the training data. For example:
- If a transaction description has multiple entries in the training data with different categories, the confidence scores should be adjusted accordingly
- If there are 5 entries for "WALMART" in "Groceries" and 1 entry in "Restaurant", the confidence for "Restaurant" should be reduced by an appropriate weight
- The confidence calculation should consider the frequency of category assignments in the training data

### Implementation Details
The confidence calculation should be updated in the `calculateCategoryProbabilities` function to:
1. Count the number of similar entries for each category
2. Calculate a frequency-based weight for each category
3. Adjust the confidence scores based on these weights
4. Consider the total number of training examples for each category

### Example
For a transaction "WALMART":
- If training data has:
  - 5 entries in "Groceries"
  - 1 entry in "Restaurant"
  - 2 entries in "Shopping"
- The confidence scores should be weighted accordingly:
  - "Groceries": 5/8 = 62.5% base weight
  - "Restaurant": 1/8 = 12.5% base weight
  - "Shopping": 2/8 = 25% base weight

These weights should then be combined with the existing similarity scores to produce more accurate confidence levels.

## Usage

The script adds a "Transaction Categorizer" menu to your Google Sheet with the following options:
1. Categorize Transactions - Suggests categories for uncategorized transactions
2. Update Training Data - Updates the training data from categorized transactions
3. Show Training Data - Displays the current training data
4. Manage Categories - Allows adding new categories 