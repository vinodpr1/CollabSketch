## Demo  

[![CollabSketch Video](https://drive.google.com/file/d/12s0vaDgapdZAbfzE1coi9fm1RQBi__Py/view)]


# Collab Sketch 

Collab Sketch is a real-time collaborative drawing application inspired by Excalidraw. It allows users to create and edit shapes such as rectangles, circles, lines, arrows, and freehand drawings (pencil). Multiple users can join a shared room and draw together in real-time. The app is built purely using coordinate geometry without external drawing libraries and leverages WebSockets for seamless collaboration.  

## 🚀 Features  

- **Shape Drawing**: Supports rectangles, circles, lines, arrows, and freehand pencil drawings.  
- **Real-time Collaboration**: Multiple users can join a room and edit the canvas simultaneously.  
- **Zoom**: Navigate and scale the canvas freely for enhanced usability.  
- **Optimized Performance**: Built with TurboRepo and PostgreSQL using Prisma ORM.  


## 🛠️ Tech Stack  

- **Frontend**: Next, React, TypeScript , Tailwind
- **Backend**: Node.js, Express, Prisma ORM, PostgreSQL  
- **Real-time Communication**: WebSockets  

## Local setup

### 1. Clone the Repository

Start by cloning this repository to your local machine:

```bash
git clone https://github.com/vinodpr1/CollabSketch
cd CollabSketch
```

### 2. Install Dependencies

Before running the chatbot locally, install the necessary dependencies:

```bash
pnpm install
```

### 3. Prisma Setup

```bash
cd packages/db
```

Create a .env in root of db and get you databse url


```bash
DATABASE_URL="your_databse_url"
```

- **Generate Prisma client**

```bash
npx prisma generate
```


- **Run Locally**

```bash
pnpm run dev
```