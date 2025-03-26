# Collab Sketch

Collab Sketch is a real-time collaborative drawing application similar to Excalidraw. It allows multiple users to join a shared room and draw shapes together in real time. The project is built with a monorepo structure using TurboRepo and leverages WebSockets for seamless shape synchronization across users.

## Features

- 🖊 **Drawing Tools**: Supports Circle, Rectangle, Arrow, Line, and Pencil.
- 🎨 **Fill Support**: Ability to fill shapes with colors.
- 👥 **Multi-User Collaboration**: More than two users can join the same room and draw together.
- 🔄 **Real-Time Updates**: Uses WebSockets for instant shape sharing.
- 🚀 **Monorepo Setup**: Structured using TurboRepo for efficient development.
- ⚡ **Performance**: Powered by Bun for fast runtime execution.

## Tech Stack

- **Frontend**: JavaScript/TypeScript
- **Backend**: Node.js (Bun runtime)
- **WebSockets**: For real-time collaboration
- **TurboRepo**: Monorepo management
- **Database**: PostgreSQL with Prisma ORM (if applicable)
- **Deployment**: AWS with reverse proxy

## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- [Bun](https://bun.sh/) (Package manager & runtime)
- Node.js (for compatibility)
- PostgreSQL (if using database features)

### Clone the Repository
```sh
git clone https://github.com/your-username/collab-sketch.git
cd collab-sketch