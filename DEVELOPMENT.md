# Development Setup Guide

## Prerequisites

- Python 3.8+
- Node.js 16+
- PostgreSQL 13+
- Google Cloud Platform account
- Google Sheets API enabled

## Backend Setup

1. Create and activate a virtual environment:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file in the backend directory with the following variables:
```
BACKEND_PORT=8000
DATABASE_URL=postgresql://user:password@localhost:5432/personal_finance
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REDIRECT_URI=http://localhost:8000/auth/google/callback
```

4. Start the backend server:
```bash
uvicorn app.main:app --reload
```

## Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Create a `.env` file in the frontend directory with the following variables:
```
REACT_APP_API_URL=http://localhost:8000
REACT_APP_GOOGLE_CLIENT_ID=your-client-id
```

3. Start the development server:
```bash
npm start
```

## Development Workflow

1. Backend development:
   - The backend runs on http://localhost:8000
   - API documentation is available at http://localhost:8000/docs
   - Use `pytest` to run tests

2. Frontend development:
   - The frontend runs on http://localhost:3000
   - Use `npm test` to run tests
   - Use `npm run build` to create a production build

## Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE personal_finance;
```

2. Run migrations (when implemented):
```bash
cd backend
alembic upgrade head
```

## Google Cloud Setup

1. Create a new project in Google Cloud Console
2. Enable Google Sheets API
3. Create OAuth 2.0 credentials
4. Download credentials and save as `credentials.json`
5. Update the `.env` file with your credentials 