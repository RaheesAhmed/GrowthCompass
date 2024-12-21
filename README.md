# GrowthCompass

GrowthCompass is an AI-powered leadership development platform that helps individuals and organizations transform their leadership journey through personalized assessments and guidance.

## 🚀 Features

- **AI-Powered Assessment**: Personalized leadership evaluation using advanced AI
- **Interactive Learning**: Dynamic learning experience with real-time feedback
- **Progress Tracking**: Monitor your leadership development journey
- **Personalized Insights**: Get tailored recommendations for improvement
- **User-Friendly Interface**: Modern and intuitive design for seamless experience

## 💻 Tech Stack

- **Frontend**: Next.js 14+, React, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with modern design
- **Icons**: Lucide Icons
- **Authentication**: Built-in auth system

## 🛠️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/RaheesAhmed/GrowthCompass.git
   ```

2. Install dependencies:

   ```bash
   cd GrowthCompass
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔑 Key Components

- **Home Page**: Modern landing page with animated gradients
- **Assessment**: Interactive leadership assessment system
- **Progress Tracking**: Visual representation of development progress

## 🤝 API Documentation

### Authentication Endpoints

- `/api/auth/signup` - User registration
- `/api/auth/[...nextauth]` - NextAuth.js authentication routes

### Assessment Endpoints

- `/api/questions/level-one/*` - Level 1 assessment questions
- `/api/questions/level-two/*` - Level 2 assessment questions
- `/api/questions/[level]/*` - Dynamic level-based questions

### AI and Classification

- `/api/classification` - AI-powered response classification
- `/api/streaming` - Streaming responses for real-time interactions

### File Management

- `/api/files` - File operations endpoints
- `/api/files/[fileId]` - Specific file management

### AI Assistant Integration

- `/api/assistants` - AI assistant management
- `/api/assistants/threads` - Conversation threads
- `/api/assistants/files` - Assistant-related file operations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Author

- Rahees Ahmed

## 📧 Contact

For any queries or support, please reach out to [contact information]
