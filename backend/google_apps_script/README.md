# Transaction Categorizer - Google Apps Script

This script provides an AI-powered transaction categorization system for Google Sheets. It uses a training-based approach to learn from existing categorized transactions and suggest categories for new transactions.

## Features

- Case-insensitive transaction and category matching
- Multiple category suggestions with confidence scores
- Interactive user prompts for ambiguous categorizations
- Training data management
- Category management
- Amount-based confidence adjustments

## Setup Instructions

### 1. Create a New Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Rename the first sheet to "Transactions"

### 2. Set Up the Required Columns
In the "Transactions" sheet, add the following columns in order:
- Date
- Description
- Amount
- Category
- Suggested Category
- Confidence

### 3. Add the Script
1. In your Google Sheet, click on "Extensions" > "Apps Script"
2. Delete any existing code in the script editor
3. Copy the entire contents of `transaction_categorizer.gs` and paste it into the script editor
4. Click "Save" (or press Ctrl+S)
5. Give your project a name (e.g., "Transaction Categorizer")

### 4. Authorize the Script
1. Close the script editor and return to your spreadsheet
2. Refresh the page
3. You should see a new menu item called "Transaction Categorizer"
4. Click on any menu item
5. You'll be prompted to authorize the script - click "Review Permissions"
6. Select your Google account
7. Click "Advanced" > "Go to Transaction Categorizer (unsafe)"
8. Click "Allow" to grant the necessary permissions

### 5. Initial Setup
1. Click on "Transaction Categorizer" > "Manage Categories" to view the default categories
2. Add any additional categories you need
3. Add some initial transactions with their correct categories
4. Click "Transaction Categorizer" > "Update Training Data" to build your initial training dataset

### 6. Start Using the Categorizer
1. Add new transactions to your sheet
2. Click "Transaction Categorizer" > "Categorize Transactions"
3. The script will:
   - Suggest categories for uncategorized transactions
   - Show confidence scores
   - Prompt you to choose between multiple high-confidence matches
4. Review and correct any suggestions as needed
5. Use "Update Training Data" periodically to improve the categorization accuracy

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