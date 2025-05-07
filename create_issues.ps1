# Create Google Sheets Integration issue
$issue2 = @"
## Description
Implement the core Google Sheets integration functionality for budget management.

### Tasks
- [ ] Set up Google Cloud Project and enable Sheets API
- [ ] Implement OAuth2 authentication flow
- [ ] Create service for Google Sheets API interaction
- [ ] Implement budget template creation and management
- [ ] Add real-time synchronization functionality
- [ ] Create sharing and collaboration features

### Acceptance Criteria
- Users can authenticate with Google
- Budget templates can be created and modified
- Real-time sync works reliably
- Sharing functionality works as expected
- Error handling is implemented

### Technical Notes
- Use Google Sheets API v4
- Implement proper error handling and rate limiting
- Follow Google's security best practices
"@

$issue2 | Out-File -FilePath "issue2.md" -Encoding utf8
gh issue create --title "Implement Google Sheets Integration" --body-file issue2.md
gh issue edit 8 --add-label "enhancement,feature"

# Create AI Categorization Engine issue
$issue3 = @"
## Description
Create the AI-powered transaction categorization system.

### Tasks
- [ ] Set up ML development environment
- [ ] Create initial training dataset structure
- [ ] Implement basic categorization model
- [ ] Add user feedback mechanism
- [ ] Implement model retraining pipeline
- [ ] Create API endpoints for categorization

### Acceptance Criteria
- Model achieves >80% accuracy on initial categorization
- System learns from user corrections
- API endpoints are properly documented
- Performance meets latency requirements

### Technical Notes
- Use TensorFlow/PyTorch for ML implementation
- Implement proper model versioning
- Consider using pre-trained models for initial implementation
"@

$issue3 | Out-File -FilePath "issue3.md" -Encoding utf8
gh issue create --title "Develop AI Categorization Engine" --body-file issue3.md
gh issue edit 9 --add-label "enhancement,feature,ml"

# Create Analytics Dashboard issue
$issue4 = @"
## Description
Develop the frontend analytics dashboard for visualizing financial data.

### Tasks
- [ ] Design dashboard layout and components
- [ ] Implement data visualization components
- [ ] Create spending pattern analysis features
- [ ] Add category-wise analysis
- [ ] Implement trend identification
- [ ] Create custom report generation

### Acceptance Criteria
- Dashboard loads and displays data correctly
- All visualizations are responsive
- Data filtering and sorting works
- Reports can be exported
- UI is intuitive and user-friendly

### Technical Notes
- Use React with TypeScript
- Consider using Chart.js or D3.js for visualizations
- Implement proper data caching
"@

$issue4 | Out-File -FilePath "issue4.md" -Encoding utf8
gh issue create --title "Create Analytics Dashboard" --body-file issue4.md
gh issue edit 10 --add-label "enhancement,feature,frontend"

# Create Database and Models issue
$issue5 = @"
## Description
Implement the database structure and models for the application.

### Tasks
- [ ] Set up PostgreSQL database
- [ ] Create database models
- [ ] Implement database migrations
- [ ] Add data validation
- [ ] Create database utilities
- [ ] Implement connection pooling

### Acceptance Criteria
- Database schema matches requirements
- Migrations work correctly
- Data validation is comprehensive
- Connection handling is efficient
- Backup strategy is implemented

### Technical Notes
- Use SQLAlchemy for ORM
- Implement proper indexing
- Follow database best practices
"@

$issue5 | Out-File -FilePath "issue5.md" -Encoding utf8
gh issue create --title "Set up Database and Models" --body-file issue5.md
gh issue edit 11 --add-label "enhancement,backend"

# Create Authentication System issue
$issue6 = @"
## Description
Set up the authentication and authorization system.

### Tasks
- [ ] Implement Google OAuth integration
- [ ] Create user management system
- [ ] Add role-based access control
- [ ] Implement session management
- [ ] Add security headers
- [ ] Create password reset functionality

### Acceptance Criteria
- OAuth flow works correctly
- User sessions are properly managed
- Security measures are implemented
- Access control works as expected

### Technical Notes
- Use JWT for authentication
- Implement proper session management
- Follow security best practices
"@

$issue6 | Out-File -FilePath "issue6.md" -Encoding utf8
gh issue create --title "Implement Authentication System" --body-file issue6.md
gh issue edit 12 --add-label "enhancement,security" 