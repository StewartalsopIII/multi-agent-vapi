# Multi-Agent VAPI Platform

A Next.js application that allows you to create and manage multiple VAPI.ai voice agents, each with their own unique URL and custom assistant configuration. Perfect for creating personalized voice assistants for different users or use cases.

## 🚀 Features

- **Multiple Agents**: Create unlimited voice agents, each with unique URLs
- **Dynamic Routing**: Clean URLs like `yoursite.com/agent/john`
- **Admin Panel**: Password-protected interface to manage all your agents
- **Vercel KV Integration**: Secure storage for agent configurations
- **Custom Assistant IDs**: Each agent uses a different VAPI assistant configuration
- **One-Click Sharing**: Generate and copy agent URLs instantly

## 🏗️ Architecture

### URL Structure
```
yoursite.com/               # Home page
yoursite.com/admin          # Admin panel (password protected)
yoursite.com/agent/[name]   # Individual agent pages
```

### How It Works
1. **Admin Creates Agent**: Add name + VAPI assistant ID in admin panel
2. **KV Storage**: Agent mapping stored in Vercel KV database
3. **Dynamic Routing**: Next.js generates pages for each agent automatically
4. **VAPI Integration**: Each agent URL loads with its specific assistant ID
5. **User Interaction**: Users talk to their personalized voice assistant

## 🛠️ Setup

### 1. Clone and Install
```bash
git clone <your-repo>
cd multi-agent-vapi
npm install
```

### 2. Environment Variables

Create `.env.local` with:

```bash
# Vapi Configuration
NEXT_PUBLIC_VAPI_PUBLIC_KEY=your_vapi_public_key_here

# Admin Panel Protection
ADMIN_PASSWORD=your_admin_password_here

# Vercel KV Store
KV_REST_API_URL=your_kv_url_here
KV_REST_API_TOKEN=your_kv_token_here
```

### 3. Get Your VAPI Credentials
1. Go to [VAPI Dashboard](https://dashboard.vapi.ai/)
2. Get your **Public Key** from Settings
3. Create assistants and note their **Assistant IDs**

### 4. Set Up Vercel KV
1. In Vercel Dashboard, go to your project
2. Go to Storage tab → Create Database → KV
3. Copy the `KV_REST_API_URL` and `KV_REST_API_TOKEN` to your `.env.local`

### 5. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see your platform!

## 📖 Usage

### Admin Panel Access
1. Go to `/admin` (redirects to login)
2. Enter your admin password
3. Access the management interface

### Creating Agents
1. In admin panel, fill out the form:
   - **Agent Name**: URL-friendly name (lowercase, letters, numbers, hyphens only)
   - **Assistant ID**: VAPI assistant ID from your dashboard
2. Click "Add Agent"
3. Copy the generated URL: `yoursite.com/agent/[name]`
4. Share with users

### Managing Agents
- **View All**: See all agents with their URLs and IDs
- **Edit**: Update assistant ID for existing agents
- **Delete**: Remove agents (with confirmation)
- **Test**: Click test link to try the agent
- **Copy URL**: One-click copy for sharing

## 🔒 Security

- **Admin Protection**: Password-protected admin panel with secure cookies
- **Input Validation**: Agent names are validated and sanitized
- **Environment Variables**: Sensitive data stored securely
- **HTTPS Only**: Secure cookie settings for production

## 📁 Project Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── page.tsx          # Admin panel (protected)
│   │   └── login/page.tsx    # Admin login
│   ├── agent/
│   │   └── [name]/
│   │       ├── page.tsx      # Dynamic agent pages
│   │       └── not-found.tsx # 404 for missing agents
│   ├── api/
│   │   ├── agents/
│   │   │   └── route.ts      # Agent CRUD operations
│   │   └── auth/
│   │       ├── login/route.ts
│   │       └── logout/route.ts
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/
│   ├── AdminPanel.tsx        # Admin interface
│   └── VapiAgent.tsx         # VAPI integration component
└── lib/
    ├── auth.ts               # Authentication utilities
    └── kv.ts                 # Vercel KV database functions
```

## 🚀 Deployment

### Deploy to Vercel
1. Connect your GitHub repo to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy!

### Environment Variables in Vercel
Go to Project Settings → Environment Variables and add:
- `NEXT_PUBLIC_VAPI_PUBLIC_KEY`
- `ADMIN_PASSWORD`
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`

## 🔧 Customization

### Styling
- Built with Tailwind CSS
- Modify components in `src/components/`
- Update global styles in `src/app/globals.css`

### Adding Features
- **Analytics**: Track agent usage
- **Custom Domains**: Support subdomain routing
- **User Management**: Multi-user admin access
- **Agent Templates**: Pre-configured assistant types

## 🐛 Troubleshooting

### Common Issues

1. **"Agent Not Found" Error**
   - Check agent name spelling in URL
   - Verify agent exists in admin panel
   - Ensure KV database is connected

2. **"Configuration Error"**
   - Verify `NEXT_PUBLIC_VAPI_PUBLIC_KEY` is set
   - Check VAPI dashboard for correct key

3. **Admin Panel Won't Load**
   - Check `ADMIN_PASSWORD` environment variable
   - Clear browser cookies and try again

4. **KV Database Errors**
   - Verify `KV_REST_API_URL` and `KV_REST_API_TOKEN`
   - Check Vercel KV dashboard for database status

### Development Tips
```bash
# Check environment variables
npm run dev
# Look for missing variables in console

# Clear Next.js cache
rm -rf .next
npm run dev

# Check KV connection
# Add console.log in /api/agents route
```

## 📈 Scaling Considerations

### Free Tier Limits
- **Vercel KV**: 30,000 requests/month
- **VAPI**: Check your plan limits
- **Vercel Hosting**: Unlimited projects

### Performance Optimization
- Agent data is cached in KV store
- Static generation for home page
- Dynamic imports for admin panel

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📜 License

MIT License - see LICENSE file for details.

## 🆘 Support

Need help?
- Check the troubleshooting section above
- Review VAPI.ai documentation
- Open an issue in this repository

---

**Built with ❤️ using Next.js, VAPI.ai, and Vercel**
