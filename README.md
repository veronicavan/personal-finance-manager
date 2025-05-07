# Personal Finance Manager

A modern personal finance management application that integrates with Google Sheets and uses AI to help users categorize and analyze their spending patterns.

## Features

- 📊 Google Sheets Integration
  - Customizable budget templates
  - Real-time synchronization
  - Easy sharing and collaboration
- 🤖 AI-Powered Categorization
  - Automatic transaction categorization
  - Learning from user corrections
  - Smart spending insights
- 📈 Analytics Dashboard
  - Spending patterns visualization
  - Category-wise analysis
  - Trend identification
  - Custom reports

## Tech Stack

- Backend: Python with FastAPI
- Frontend: React with TypeScript
- Google Sheets API Integration
- Machine Learning: TensorFlow/PyTorch for categorization
- Database: PostgreSQL (for storing user preferences and ML models)
- Authentication: Google OAuth
- Testing: Pytest
- CI/CD: GitHub Actions

## Project Structure

```
personal_finance_manager/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/            # API endpoints
│   │   ├── core/           # Core functionality
│   │   ├── models/         # Database models
│   │   ├── services/       # Business logic
│   │   │   ├── sheets/     # Google Sheets integration
│   │   │   └── ml/         # ML categorization engine
│   │   └── utils/          # Utility functions
│   ├── tests/              # Backend tests
│   └── requirements.txt    # Python dependencies
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── utils/         # Utility functions
│   └── package.json       # Node dependencies
└── docs/                  # Documentation
```

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- PostgreSQL 13+
- Google Cloud Platform account
- Google Sheets API enabled

### Installation

1. Clone the repository:
```bash
git clone https://github.com/veronicavan/personal_finance_manager.git
cd personal_finance_manager
```

2. Set up the backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. Set up the frontend:
```bash
cd frontend
npm install
```

4. Configure Google Sheets API:
   - Create a project in Google Cloud Console
   - Enable Google Sheets API
   - Create OAuth 2.0 credentials
   - Download credentials and save as `credentials.json`

5. Start the development servers:
```bash
# Backend
cd backend
uvicorn app.main:app --reload

# Frontend
cd frontend
npm start
```

## Development Workflow

1. Create a new branch for each feature/fix
2. Write tests for new features
3. Submit a pull request
4. Code review and approval
5. Merge to main branch

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 