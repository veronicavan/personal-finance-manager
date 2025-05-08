// Configuration
const CONFIG = {
  SHEET_NAME: 'Transactions',
  CATEGORIES_SHEET: 'Categories',
  TRAINING_SHEET: 'Training Data',
  COLUMNS: {
    DATE: 'Date',
    DESCRIPTION: 'Description',
    AMOUNT: 'Amount',
    CATEGORY: 'Category',
    SUGGESTED_CATEGORY: 'Suggested Category',
    CONFIDENCE: 'Confidence'
  },
  CATEGORIES: [
    'Groceries',
    'Dining Out',
    'Transportation',
    'Entertainment',
    'Shopping',
    'Bills & Utilities',
    'Health & Medical',
    'Travel',
    'Education',
    'Personal Care',
    'Home & Garden',
    'Gifts & Donations',
    'Income',
    'Investments',
    'Other'
  ].map(cat => cat.toLowerCase()), // Convert all categories to lowercase
  TRAINING_DATA: {}
};

// Initialize training data from sheet
function initializeTrainingData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let trainingSheet = ss.getSheetByName(CONFIG.TRAINING_SHEET);
  
  // Create training data sheet if it doesn't exist
  if (!trainingSheet) {
    trainingSheet = ss.insertSheet(CONFIG.TRAINING_SHEET);
    trainingSheet.appendRow(['Category', 'Description']);
  }
  
  // Load training data from sheet
  const data = trainingSheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    const category = data[i][0].toLowerCase();
    const description = data[i][1].toLowerCase();
    
    if (!CONFIG.TRAINING_DATA[category]) {
      CONFIG.TRAINING_DATA[category] = [];
    }
    if (!CONFIG.TRAINING_DATA[category].includes(description)) {
      CONFIG.TRAINING_DATA[category].includes(description);
    }
  }
}

// Save training data to sheet
function saveTrainingData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let trainingSheet = ss.getSheetByName(CONFIG.TRAINING_SHEET);
  
  if (!trainingSheet) {
    trainingSheet = ss.insertSheet(CONFIG.TRAINING_SHEET);
  }
  
  // Clear existing data
  trainingSheet.clear();
  trainingSheet.appendRow(['Category', 'Description']);
  
  // Save all training data
  const rows = [];
  Object.entries(CONFIG.TRAINING_DATA).forEach(([category, examples]) => {
    examples.forEach(example => {
      rows.push([category, example]);
    });
  });
  
  if (rows.length > 0) {
    trainingSheet.getRange(2, 1, rows.length, 2).setValues(rows);
  }
}

// Update the updateTrainingData function
function updateTrainingData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  
  if (!sheet) {
    SpreadsheetApp.getUi().alert('Error: Transactions sheet not found!');
    return;
  }

  try {
    // Initialize training data from sheet
    initializeTrainingData();
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    // Find column indices
    const descIndex = headers.indexOf(CONFIG.COLUMNS.DESCRIPTION);
    const categoryIndex = headers.indexOf(CONFIG.COLUMNS.CATEGORY);
    
    if (descIndex === -1 || categoryIndex === -1) {
      throw new Error('Required columns not found!');
    }

    let updatedCount = 0;
    let categoryUpdates = {};
    let skippedCount = 0;
    let skippedReasons = {};
    let newCategories = new Map(); // Map to store new categories and their descriptions

    // Process each transaction
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const description = row[descIndex];
      const category = row[categoryIndex] ? row[categoryIndex].toLowerCase() : '';
      
      // Skip if no description
      if (!description) {
        skippedCount++;
        skippedReasons['Missing description'] = (skippedReasons['Missing description'] || 0) + 1;
        continue;
      }
      
      // Handle missing category
      if (!category) {
        skippedCount++;
        skippedReasons['Missing category'] = (skippedReasons['Missing category'] || 0) + 1;
        continue;
      }
      
      // Handle new categories
      if (!CONFIG.CATEGORIES.includes(category)) {
        if (!newCategories.has(category)) {
          newCategories.set(category, []);
        }
        newCategories.get(category).push(description.toLowerCase().trim());
        continue;
      }
      
      // Add to training data if not already present
      const desc = description.toLowerCase().trim();
      if (!CONFIG.TRAINING_DATA[category]) {
        CONFIG.TRAINING_DATA[category] = [];
      }
      if (!CONFIG.TRAINING_DATA[category].includes(desc)) {
        CONFIG.TRAINING_DATA[category].push(desc);
        updatedCount++;
        
        // Track updates per category
        categoryUpdates[category] = (categoryUpdates[category] || 0) + 1;
      } else {
        skippedCount++;
        skippedReasons['Already in training data'] = (skippedReasons['Already in training data'] || 0) + 1;
      }
    }

    // Show completion message
    let message = `Training data update complete!\n\n`;
    message += `Total new examples added: ${updatedCount}\n`;
    message += `Total transactions skipped: ${skippedCount}\n\n`;
    
    if (Object.keys(categoryUpdates).length > 0) {
      message += `Updates by category:\n`;
      Object.entries(categoryUpdates).forEach(([category, count]) => {
        message += `${category}: ${count} new examples\n`;
      });
    }
    
    if (Object.keys(skippedReasons).length > 0) {
      message += `\nSkipped transactions by reason:\n`;
      Object.entries(skippedReasons).forEach(([reason, count]) => {
        message += `${reason}: ${count} transactions\n`;
      });
    }

    // Show new categories if any
    if (newCategories.size > 0) {
      message += `\nNew categories found:\n`;
      newCategories.forEach((descriptions, category) => {
        message += `- ${category} (${descriptions.length} transactions)\n`;
      });
      message += `\nWould you like to add these new categories to the system?`;
      
      const ui = SpreadsheetApp.getUi();
      const response = ui.alert(
        'New Categories Found',
        message,
        ui.ButtonSet.YES_NO
      );
      
      if (response === ui.Button.YES) {
        // Add new categories and their training data
        newCategories.forEach((descriptions, category) => {
          CONFIG.CATEGORIES.push(category);
          CONFIG.TRAINING_DATA[category] = descriptions;
        });
        
        // Save updated training data
        saveTrainingData();
        
        ui.alert(
          'Categories Added',
          `Successfully added ${newCategories.size} new categories to the system.`,
          ui.ButtonSet.OK
        );
      }
    } else {
      // Save updated training data if no new categories
      saveTrainingData();
      SpreadsheetApp.getUi().alert('Update Complete', message, SpreadsheetApp.getUi().ButtonSet.OK);
    }

  } catch (error) {
    SpreadsheetApp.getUi().alert('Error updating training data: ' + error.message);
  }
}

function calculateCategoryProbabilities(description, amount) {
  const probabilities = {};
  const desc = description.toLowerCase().trim();
  
  // Initialize probabilities
  CONFIG.CATEGORIES.forEach(category => {
    probabilities[category] = 0;
  });
  
  // Calculate similarity scores
  Object.entries(CONFIG.TRAINING_DATA).forEach(([category, examples]) => {
    let maxSimilarity = 0;
    
    examples.forEach(example => {
      const similarity = calculateSimilarity(desc, example);
      maxSimilarity = Math.max(maxSimilarity, similarity);
    });
    
    // Apply amount-based adjustments for certain categories
    if (amount) {
      const absAmount = Math.abs(amount);
      if (category === 'groceries' && absAmount > 100) {
        maxSimilarity *= 0.8; // Reduce confidence for large grocery amounts
      } else if (category === 'dining out' && absAmount > 50) {
        maxSimilarity *= 0.7; // Reduce confidence for large dining amounts
      }
    }
    
    probabilities[category] = maxSimilarity;
  });
  
  // Normalize probabilities
  const total = Object.values(probabilities).reduce((a, b) => a + b, 0);
  if (total > 0) {
    Object.keys(probabilities).forEach(category => {
      probabilities[category] /= total;
    });
  } else {
    probabilities['other'] = 1;
  }
  
  return probabilities;
}

function calculateSimilarity(str1, str2) {
  // Convert both strings to lowercase for case-insensitive comparison
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();
  
  // Exact match
  if (str1 === str2) return 1;
  
  // Contains match
  if (str1.includes(str2) || str2.includes(str1)) return 0.8;
  
  // Word match
  const words1 = str1.split(/\s+/);
  const words2 = str2.split(/\s+/);
  const commonWords = words1.filter(word => words2.includes(word));
  
  if (commonWords.length > 0) {
    return 0.5 * (commonWords.length / Math.max(words1.length, words2.length));
  }
  
  return 0;
}

function categorizeTransactions() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  
  if (!sheet) {
    SpreadsheetApp.getUi().alert('Error: Transactions sheet not found!');
    return;
  }
  
  try {
    // Initialize training data
    initializeTrainingData();
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    // Find column indices
    const descIndex = headers.indexOf(CONFIG.COLUMNS.DESCRIPTION);
    const amountIndex = headers.indexOf(CONFIG.COLUMNS.AMOUNT);
    const categoryIndex = headers.indexOf(CONFIG.COLUMNS.CATEGORY);
    const suggestedIndex = headers.indexOf(CONFIG.COLUMNS.SUGGESTED_CATEGORY);
    const confidenceIndex = headers.indexOf(CONFIG.COLUMNS.CONFIDENCE);
    
    if (descIndex === -1 || amountIndex === -1) {
      throw new Error('Required columns not found!');
    }
    
    let categorizedCount = 0;
    let skippedCount = 0;
    let userPromptedCount = 0;
    
    // Process each transaction
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const description = row[descIndex];
      const amount = parseFloat(row[amountIndex]);
      
      // Skip if already categorized
      if (categoryIndex !== -1 && row[categoryIndex]) {
        skippedCount++;
        continue;
      }
      
      // Get category probabilities
      const probabilities = calculateCategoryProbabilities(description, amount);
      
      // Get categories with high confidence (above 0.3)
      const highConfidenceCategories = Object.entries(probabilities)
        .filter(([_, prob]) => prob > 0.3)
        .sort((a, b) => b[1] - a[1]);
      
      let suggestedCategory;
      let confidence;
      
      if (highConfidenceCategories.length > 1) {
        // Multiple high-confidence matches - prompt user
        const ui = SpreadsheetApp.getUi();
        let message = `Multiple possible categories found for:\n\n`;
        message += `Description: ${description}\n`;
        message += `Amount: ${amount}\n\n`;
        message += `Please select the correct category:\n\n`;
        
        highConfidenceCategories.forEach(([category, prob], index) => {
          message += `${index + 1}. ${category} (${(prob * 100).toFixed(1)}% confidence)\n`;
        });
        
        const response = ui.prompt(
          'Select Category',
          message,
          ui.ButtonSet.OK_CANCEL
        );
        
        if (response.getSelectedButton() === ui.Button.OK) {
          const selection = parseInt(response.getResponseText());
          if (selection >= 1 && selection <= highConfidenceCategories.length) {
            [suggestedCategory, confidence] = highConfidenceCategories[selection - 1];
            userPromptedCount++;
          } else {
            // Invalid selection, use highest probability
            [suggestedCategory, confidence] = highConfidenceCategories[0];
          }
        } else {
          // User cancelled, use highest probability
          [suggestedCategory, confidence] = highConfidenceCategories[0];
        }
      } else {
        // Single or no high-confidence matches
        [suggestedCategory, confidence] = Object.entries(probabilities)
          .reduce((a, b) => a[1] > b[1] ? a : b);
      }
      
      // Update the row
      if (suggestedIndex !== -1) {
        sheet.getRange(i + 1, suggestedIndex + 1).setValue(suggestedCategory);
      }
      if (confidenceIndex !== -1) {
        sheet.getRange(i + 1, confidenceIndex + 1).setValue(confidence);
      }
      
      categorizedCount++;
    }
    
    // Show completion message
    let message = `Categorization complete!\n\n`;
    message += `Total transactions categorized: ${categorizedCount}\n`;
    message += `Total transactions skipped: ${skippedCount}\n`;
    message += `Transactions requiring user input: ${userPromptedCount}\n\n`;
    message += `Note: Transactions that were already categorized were skipped.`;
    
    SpreadsheetApp.getUi().alert('Categorization Complete', message, SpreadsheetApp.getUi().ButtonSet.OK);
    
  } catch (error) {
    SpreadsheetApp.getUi().alert('Error categorizing transactions: ' + error.message);
  }
}

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Transaction Categorizer')
    .addItem('Categorize Transactions', 'categorizeTransactions')
    .addItem('Update Training Data', 'updateTrainingData')
    .addItem('Show Training Data', 'showTrainingData')
    .addItem('Manage Categories', 'showManageCategoriesDialog')
    .addToUi();
}

// Update the showTrainingData function to load from sheet
function showTrainingData() {
  // Initialize training data from sheet
  initializeTrainingData();
  
  const ui = SpreadsheetApp.getUi();
  let message = "Current Training Data:\n\n";
  
  Object.entries(CONFIG.TRAINING_DATA).forEach(([category, examples]) => {
    message += `${category}:\n`;
    examples.forEach(example => {
      message += `  - ${example}\n`;
    });
    message += "\n";
  });
  
  ui.alert('Training Data', message, ui.ButtonSet.OK);
}

/**
 * Show dialog to manage categories
 */
function showManageCategoriesDialog() {
  const ui = SpreadsheetApp.getUi();
  let message = "Current Categories:\n\n";
  
  CONFIG.CATEGORIES.forEach(category => {
    message += `- ${category}\n`;
  });
  
  message += "\nTo add a new category, enter it below:";
  
  const response = ui.prompt(
    'Manage Categories',
    message,
    ui.ButtonSet.OK_CANCEL
  );
  
  if (response.getSelectedButton() === ui.Button.OK) {
    const newCategory = response.getResponseText().trim().toLowerCase();
    if (newCategory && !CONFIG.CATEGORIES.includes(newCategory)) {
      CONFIG.CATEGORIES.push(newCategory);
      CONFIG.TRAINING_DATA[newCategory] = [];
      ui.alert('Success', `Category "${newCategory}" added successfully!`, ui.ButtonSet.OK);
    } else if (CONFIG.CATEGORIES.includes(newCategory)) {
      ui.alert('Error', `Category "${newCategory}" already exists!`, ui.ButtonSet.OK);
    }
  }
} 