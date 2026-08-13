// ─────────────────────────────────────────────────────────────────────────────
// Seed Script
// Run with: npm run seed
// This creates realistic demo data for the hackathon judges to test
// WARNING: This will clear existing data before seeding
// ─────────────────────────────────────────────────────────────────────────────

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import User from "./models/User.js";
import Skill from "./models/Skill.js";
import Course from "./models/Course.js";
import Opportunity from "./models/Opportunity.js";
import Application from "./models/Application.js";
import Achievement from "./models/Achievement.js";

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding");

    // ── Clear existing data ──────────────────────────────────────────────────
    await User.deleteMany();
    await Skill.deleteMany();
    await Course.deleteMany();
    await Opportunity.deleteMany();
    await Application.deleteMany();
    await Achievement.deleteMany();
    console.log("Existing data cleared");

    // ── Create hashed passwords ──────────────────────────────────────────────
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    // ── Create Users ─────────────────────────────────────────────────────────
    const users = await User.insertMany([
      // Students
      {
        name: "Amir Hassan",
        email: "amir@student.com",
        password: hashedPassword,
        role: "student",
        bio: "Passionate about web development. Looking for opportunities to grow.",
        location: "Kuala Lumpur, Malaysia",
        skills: ["HTML", "CSS", "JavaScript"],
        points: 350,
        completedProjects: 1,
      },
      {
        name: "Siti Rahimah",
        email: "siti@student.com",
        password: hashedPassword,
        role: "student",
        bio: "UI/UX enthusiast and digital marketing learner.",
        location: "Penang, Malaysia",
        skills: ["UI/UX", "Digital Marketing", "CSS"],
        points: 500,
        completedProjects: 2,
      },

      // Providers
      {
        name: "TechStart Solutions",
        email: "techstart@provider.com",
        password: hashedPassword,
        role: "provider",
        bio: "A startup building innovative SaaS products. We love hiring fresh talent.",
        location: "Kuala Lumpur, Malaysia",
      },
      {
        name: "Warisan Digital Agency",
        email: "warisan@provider.com",
        password: hashedPassword,
        role: "provider",
        bio: "Digital marketing agency helping local businesses grow online.",
        location: "Shah Alam, Malaysia",
      },

      // Admin
      {
        name: "Platform Admin",
        email: "admin@skill2earn.com",
        password: hashedPassword,
        role: "admin",
        bio: "Skill2Earn platform administrator.",
      },
    ]);

    const [amir, siti, techstart, warisan, admin] = users;
    console.log("Users created");

    // ── Create Skills ─────────────────────────────────────────────────────────
    const skills = await Skill.insertMany([
      {
        name: "HTML",
        category: "Web Development",
        description: "The standard markup language for creating web pages.",
        level: "beginner",
        points: 100,
      },
      {
        name: "CSS",
        category: "Web Development",
        description: "Style sheet language used for describing the presentation of a document.",
        level: "beginner",
        points: 100,
      },
      {
        name: "JavaScript",
        category: "Web Development",
        description: "Programming language that enables interactive web pages.",
        level: "beginner",
        points: 150,
      },
      {
        name: "React",
        category: "Web Development",
        description: "A JavaScript library for building user interfaces.",
        level: "intermediate",
        points: 200,
      },
      {
        name: "Node.js",
        category: "Backend Development",
        description: "JavaScript runtime built on Chrome's V8 JavaScript engine.",
        level: "intermediate",
        points: 200,
      },
      {
        name: "MongoDB",
        category: "Database",
        description: "A document-oriented NoSQL database.",
        level: "intermediate",
        points: 150,
      },
      {
        name: "UI/UX",
        category: "Design",
        description: "Designing user interfaces and improving user experience.",
        level: "beginner",
        points: 150,
      },
      {
        name: "Digital Marketing",
        category: "Marketing",
        description: "Promoting products and services through digital channels.",
        level: "beginner",
        points: 100,
      },
    ]);

    console.log("Skills created");

    // ── Create Courses ────────────────────────────────────────────────────────
    const courses = await Course.insertMany([
      {
        title: "HTML Fundamentals",
        description: "Learn the building blocks of every website.",
        skill: "HTML",
        level: "beginner",
        points: 100,
        lessons: [
          {
            title: "What is HTML?",
            description: "Introduction to HTML and how browsers use it.",
            content:
              "HTML stands for HyperText Markup Language. It is the standard language for creating web pages. Every website you visit is built with HTML at its core.",
            order: 1,
          },
          {
            title: "HTML Tags and Elements",
            description: "Learn the most common HTML tags.",
            content:
              "HTML uses tags like <h1>, <p>, <div>, <span>, <img>, and <a> to structure content. Tags come in pairs - an opening tag and a closing tag.",
            order: 2,
          },
          {
            title: "Building Your First Page",
            description: "Put it all together and build a simple web page.",
            content:
              "Now we will create a complete HTML page with a header, navigation, main content, and footer. This is the foundation of every web project.",
            order: 3,
          },
        ],
      },
      {
        title: "CSS Styling Basics",
        description: "Make your websites beautiful with CSS.",
        skill: "CSS",
        level: "beginner",
        points: 100,
        lessons: [
          {
            title: "What is CSS?",
            description: "Introduction to Cascading Style Sheets.",
            content:
              "CSS stands for Cascading Style Sheets. It is used to style HTML elements - changing colors, fonts, layouts, and more.",
            order: 1,
          },
          {
            title: "Selectors and Properties",
            description: "Learn how to target elements and apply styles.",
            content:
              "CSS selectors allow you to target specific HTML elements. You can select by tag name, class, ID, or relationship between elements.",
            order: 2,
          },
          {
            title: "Flexbox Layout",
            description: "Build modern layouts with Flexbox.",
            content:
              "Flexbox is a layout model that makes it easy to align and distribute elements. Use display: flex on a container to activate it.",
            order: 3,
          },
        ],
      },
      {
        title: "JavaScript for Beginners",
        description: "Add interactivity to your websites with JavaScript.",
        skill: "JavaScript",
        level: "beginner",
        points: 150,
        lessons: [
          {
            title: "Introduction to JavaScript",
            description: "What JavaScript is and why it matters.",
            content:
              "JavaScript is the programming language of the web. It allows you to create dynamic content, handle user interactions, and communicate with servers.",
            order: 1,
          },
          {
            title: "Variables and Data Types",
            description: "Learn how to store and work with data.",
            content:
              "In JavaScript you can store data using var, let, or const. Common data types include strings, numbers, booleans, arrays, and objects.",
            order: 2,
          },
          {
            title: "Functions and Events",
            description: "Write reusable code and respond to user actions.",
            content:
              "Functions are blocks of code that can be reused. Events allow your code to respond to user actions like clicks, typing, and scrolling.",
            order: 3,
          },
        ],
      },
      {
        title: "React Essentials",
        description: "Build modern web applications with React.",
        skill: "React",
        level: "intermediate",
        points: 200,
        lessons: [
          {
            title: "What is React?",
            description: "Introduction to the React library.",
            content:
              "React is a JavaScript library created by Facebook for building user interfaces. It uses a component-based approach to build complex UIs from small, reusable pieces.",
            order: 1,
          },
          {
            title: "Components and Props",
            description: "Build and reuse React components.",
            content:
              "Components are the building blocks of React applications. Props allow you to pass data from a parent component to a child component.",
            order: 2,
          },
          {
            title: "State and useState Hook",
            description: "Manage dynamic data in your components.",
            content:
              "State allows components to store and change data over time. The useState hook is the primary way to add state to functional components.",
            order: 3,
          },
        ],
      },
      {
        title: "UI/UX Design Fundamentals",
        description: "Learn the principles of great user interface design.",
        skill: "UI/UX",
        level: "beginner",
        points: 150,
        lessons: [
          {
            title: "Design Thinking",
            description: "Understand users and solve real problems.",
            content:
              "Design thinking is a human-centered approach to problem solving. It involves empathizing with users, defining problems, ideating solutions, prototyping, and testing.",
            order: 1,
          },
          {
            title: "Color and Typography",
            description: "Use color and fonts effectively.",
            content:
              "Color creates emotion and guides attention. Typography affects readability and personality. Good design uses consistent color palettes and readable fonts.",
            order: 2,
          },
          {
            title: "Wireframing Basics",
            description: "Sketch your ideas before building.",
            content:
              "Wireframes are low-fidelity sketches of an interface. They help you plan layout and user flow before investing time in detailed design.",
            order: 3,
          },
        ],
      },
      {
        title: "Digital Marketing Basics",
        description: "Grow businesses online with digital marketing.",
        skill: "Digital Marketing",
        level: "beginner",
        points: 100,
        lessons: [
          {
            title: "Introduction to Digital Marketing",
            description: "Overview of digital marketing channels.",
            content:
              "Digital marketing uses online channels to reach customers. This includes social media, email, search engines, and content marketing.",
            order: 1,
          },
          {
            title: "Social Media Strategy",
            description: "Build a presence on social media platforms.",
            content:
              "A good social media strategy defines your audience, goals, content types, and posting schedule. Consistency and engagement are key.",
            order: 2,
          },
          {
            title: "SEO Fundamentals",
            description: "Help websites rank higher on search engines.",
            content:
              "SEO stands for Search Engine Optimization. It involves optimizing website content so it ranks higher in search engine results like Google.",
            order: 3,
          },
        ],
      },
    ]);

    // Update students with completed courses
    await User.findByIdAndUpdate(amir._id, {
      completedCourses: [courses[0]._id, courses[1]._id, courses[2]._id],
    });

    await User.findByIdAndUpdate(siti._id, {
      completedCourses: [courses[4]._id, courses[5]._id],
    });

    console.log("Courses created");

    // ── Create Achievements ───────────────────────────────────────────────────
    await Achievement.insertMany([
      {
        title: "First Step",
        description: "Complete your very first learning module.",
        pointsRequired: 100,
        icon: "🌱",
      },
      {
        title: "Quick Learner",
        description: "Earn 300 points from completing courses.",
        pointsRequired: 300,
        icon: "⚡",
      },
      {
        title: "Skill Builder",
        description: "Earn 500 points and prove you are serious.",
        pointsRequired: 500,
        icon: "🔨",
      },
      {
        title: "First Project",
        description: "Complete your first real-world project.",
        pointsRequired: 700,
        icon: "🚀",
      },
      {
        title: "Rising Star",
        description: "Earn 1000 points on Skill2Earn.",
        pointsRequired: 1000,
        icon: "⭐",
      },
      {
        title: "Pro Level",
        description: "Earn 2000 points and become a top earner.",
        pointsRequired: 2000,
        icon: "🏆",
      },
    ]);

    console.log("Achievements created");

    // ── Create Opportunities ──────────────────────────────────────────────────
    const opportunities = await Opportunity.insertMany([
      {
        title: "Frontend Developer Intern",
        description:
          "We are looking for a passionate frontend developer intern to join our startup team. You will work on real features in our web application using React and JavaScript. Great opportunity to learn from experienced developers.",
        provider: techstart._id,
        category: "web",
        requiredSkills: ["React", "JavaScript", "CSS"],
        skillLevel: "beginner",
        type: "internship",
        location: "Kuala Lumpur, Malaysia",
        remote: true,
        payment: "RM 600/month",
        duration: "3 months",
        deadline: new Date("2025-03-31"),
        status: "open",
      },
      {
        title: "Website Development Project",
        description:
          "We need a simple 5-page business website built for our new product launch. The website should be responsive, fast, and look professional. You will have full creative control on the design.",
        provider: techstart._id,
        category: "web",
        requiredSkills: ["HTML", "CSS", "JavaScript"],
        skillLevel: "beginner",
        type: "freelance",
        location: "Remote",
        remote: true,
        payment: "RM 500 fixed",
        duration: "2 weeks",
        deadline: new Date("2025-02-28"),
        status: "open",
      },
      {
        title: "Social Media Content Assistant",
        description:
          "Help us create and schedule social media content for our clients. You will write captions, design simple graphics using Canva, and track basic analytics. Perfect for someone learning digital marketing.",
        provider: warisan._id,
        category: "marketing",
        requiredSkills: ["Digital Marketing"],
        skillLevel: "beginner",
        type: "part-time",
        location: "Shah Alam, Malaysia",
        remote: true,
        payment: "RM 400/month",
        duration: "Ongoing",
        deadline: new Date("2025-03-15"),
        status: "open",
      },
      {
        title: "UI/UX Design for Mobile App",
        description:
          "We need wireframes and mockups designed for our new mobile app. The app helps users track their daily habits. We need clean, simple, and user-friendly designs. Figma or Adobe XD is required.",
        provider: techstart._id,
        category: "design",
        requiredSkills: ["UI/UX"],
        skillLevel: "beginner",
        type: "project",
        location: "Remote",
        remote: true,
        payment: "RM 300 fixed",
        duration: "1 week",
        deadline: new Date("2025-02-20"),
        status: "open",
      },
      {
        title: "Data Entry Part-Time",
        description:
          "Help us clean and organize our customer database. Work involves entering data into spreadsheets and Google Sheets, verifying accuracy, and organizing records. No technical skills required.",
        provider: warisan._id,
        category: "other",
        requiredSkills: [],
        skillLevel: "beginner",
        type: "part-time",
        location: "Remote",
        remote: true,
        payment: "RM 8/hour",
        duration: "Flexible",
        deadline: new Date("2025-04-01"),
        status: "open",
      },
      {
        title: "Local Business Website Project",
        description:
          "A neighborhood restaurant needs a simple website to display their menu, location, and contact information. This is a community project - great for building your portfolio with a real client.",
        provider: warisan._id,
        category: "web",
        requiredSkills: ["HTML", "CSS"],
        skillLevel: "beginner",
        type: "community-task",
        location: "Shah Alam, Malaysia",
        remote: false,
        payment: "RM 150 fixed",
        duration: "1 week",
        deadline: new Date("2025-02-25"),
        status: "open",
      },
      {
        title: "SEO Optimization Project",
        description:
          "Improve the search engine ranking of our client portfolio websites. Tasks include keyword research, meta tag optimization, and writing SEO-friendly content. Training will be provided.",
        provider: warisan._id,
        category: "marketing",
        requiredSkills: ["Digital Marketing"],
        skillLevel: "beginner",
        type: "freelance",
        location: "Remote",
        remote: true,
        payment: "RM 250 fixed",
        duration: "10 days",
        deadline: new Date("2025-03-10"),
        status: "open",
      },
      {
        title: "React Dashboard Development",
        description:
          "Build an admin dashboard using React for our internal tools. The dashboard will show analytics charts, user management tables, and notification systems. Strong React skills are required.",
        provider: techstart._id,
        category: "web",
        requiredSkills: ["React", "JavaScript", "Node.js"],
        skillLevel: "intermediate",
        type: "freelance",
        location: "Kuala Lumpur, Malaysia",
        remote: true,
        payment: "RM 1200 fixed",
        duration: "3 weeks",
        deadline: new Date("2025-03-20"),
        status: "open",
      },
    ]);

    console.log("Opportunities created");

    // ── Create Applications ───────────────────────────────────────────────────
    await Application.insertMany([
      {
        student: amir._id,
        opportunity: opportunities[1]._id, // Website Development Project
        coverMessage:
          "Hi, I have completed the HTML, CSS and JavaScript courses on Skill2Earn. I would love to build this website and add it to my portfolio. I am a fast learner and will deliver good quality work.",
        status: "accepted",
      },
      {
        student: amir._id,
        opportunity: opportunities[0]._id, // Frontend Developer Intern
        coverMessage:
          "I am very interested in this internship. I have been learning React and have completed several frontend courses. I am ready to contribute to your team and learn from experienced developers.",
        status: "reviewing",
      },
      {
        student: siti._id,
        opportunity: opportunities[2]._id, // Social Media Content Assistant
        coverMessage:
          "I have completed the Digital Marketing course and I understand social media strategy. I am creative, organized, and available to work part-time. I would love to help your agency.",
        status: "accepted",
      },
      {
        student: siti._id,
        opportunity: opportunities[3]._id, // UI/UX Design for Mobile App
        coverMessage:
          "UI/UX is my passion. I have completed the UI/UX fundamentals course and have done wireframing projects. I use Figma for my designs and I am confident I can deliver great mockups for your app.",
        status: "applied",
      },
    ]);

    console.log("Applications created");

    console.log("\n✅ Seed completed successfully!");
    console.log("\n── Demo Login Accounts ─────────────────────────────");
    console.log("Student 1:  amir@student.com     / password123");
    console.log("Student 2:  siti@student.com     / password123");
    console.log("Provider 1: techstart@provider.com / password123");
    console.log("Provider 2: warisan@provider.com   / password123");
    console.log("Admin:      admin@skill2Earn.com  / password123");
    console.log("────────────────────────────────────────────────────\n");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seed();