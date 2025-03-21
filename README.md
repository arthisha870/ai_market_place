# AI Tools Marketplace

A modern web application that showcases AI tools with various features, including user authentication, admin management, and detailed tool information.

## Features

- Browse AI tools by category
- Detailed tool pages with features, screenshots, and descriptions
- Admin panel for managing tools and categories
- User authentication system
- Responsive design for all devices

## Technologies Used

- React
- TypeScript
- Firebase (Authentication, Firestore, Storage)
- Tailwind CSS
- Framer Motion
- Vite

## Running Locally

1. Clone the repository
   ```
   git clone https://github.com/your-username/ai_tools_marketplace.git
   cd ai_tools_marketplace
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Set up environment variables
   ```
   cp .env.example .env
   ```
   Edit the `.env` file with your Firebase configuration

4. Start the development server
   ```
   npm run dev
   ```

## Deployment to Vercel

This project is configured for easy deployment to Vercel:

1. Create a Vercel account if you don't have one
2. Connect your GitHub repository to Vercel
3. Set up environment variables in the Vercel dashboard:
   - Go to your project settings
   - Under "Environment Variables" add all variables from your `.env` file
4. Deploy the project

The deployment will use the configuration in `vercel.json` to properly handle routing and environment variables.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
