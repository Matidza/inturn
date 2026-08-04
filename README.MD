# inTurn

<div align="center" style="margin: 30px;">
  <h3>Practice. Prepare. Get Hired.</h3>
  <p>A career-preparation and talent marketplace platform connecting job seekers with industry professionals for AI-powered and live interview practice.</p>
</div>

<br/>

## About

**inTurn** helps job seekers land their next role through realistic interview practice, actionable CV feedback, and direct access to industry professionals for mentorship and live mock interviews.

The platform serves three types of users:
- **Mentees** — job seekers practicing for interviews and refining their CVs
- **Professionals** — industry mentors offering paid mock interviews and career coaching
- **Companies** — organizations sourcing interview-ready talent

### Core Features

- 🤖 **AI Interview Practice** — simulate real-world interviews and get instant, structured feedback
- 📄 **CV Analysis** — automated, ATS-aware feedback to improve CV quality and match rate
- 🎥 **Live Mock Interviews** — book 1-on-1 sessions with real industry professionals via WebRTC video

## Tech Stack

**Frontend**
- React + TypeScript
- Built with [Refine](https://github.com/refinedev/refine)
- Custom design system (Material UI as base, progressively replaced by a bespoke card-grid UI)

**Backend**
- Node.js + Express, organized as microservices behind a central API Gateway
- MongoDB for persistence, Redis for caching & rate limiting
- RabbitMQ for asynchronous, event-driven communication between services
- WebRTC signaling for live video sessions

**Architecture**
- API Gateway handles auth, rate limiting, and routing to downstream services
- Independent services for mentee, professional, company, payment, and video/session functionality
- JWT-based auth, verified at the gateway; downstream services trust `x-user-id` / `x-user-role` headers

## Getting Started

### Running the development server

```bash
npm run dev
```

### Building for production

```bash
npm run build
```

### Running the production server

```bash
npm run start
```

## Environment Variables

This project requires a `.env` file with (at minimum):

```properties
VITE_API_URL=http://localhost:1000
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

## Learn More

This project's frontend is built with [Refine](https://refine.dev) — check out their [documentation](https://refine.dev/docs) for details on the underlying framework:

- **REST Data Provider** [Docs](https://refine.dev/docs/core/providers/data-provider/#overview)
- **Material UI** [Docs](https://refine.dev/docs/ui-frameworks/mui/tutorial/)
- **React Router** [Docs](https://refine.dev/docs/core/providers/router-provider/)
- **Auth Provider** [Docs](https://refine.dev/docs/core/providers/auth-provider/)

## License

MIT