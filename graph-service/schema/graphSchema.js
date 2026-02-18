/**
 * Graph Schema Definition
 * Graph Engineer: Shashikant
 * Defines nodes and relationships for the 3D Knowledge Graph
 */

const graphSchema = {
  // Node Types
  nodes: {
    Student: {
      properties: {
        id: { type: "string", required: true },
        name: { type: "string", required: true },
        email: { type: "string" },
        github_username: { type: "string" },
        createdAt: { type: "datetime", required: true },
      },
      constraints: ["UNIQUE(id)"],
    },
    Project: {
      properties: {
        id: { type: "string", required: true },
        title: { type: "string", required: true },
        description: { type: "string" },
        repository: { type: "string" },
        createdAt: { type: "datetime", required: true },
      },
      constraints: ["UNIQUE(id)"],
    },
    Skill: {
      properties: {
        id: { type: "string", required: true },
        name: { type: "string", required: true },
        category: { type: "string" }, // e.g., frontend, backend, devops
        proficiency_level: { type: "string" }, // beginner, intermediate, advanced, expert
        createdAt: { type: "datetime", required: true },
      },
      constraints: ["UNIQUE(id)"],
    },
    Technology: {
      properties: {
        id: { type: "string", required: true },
        name: { type: "string", required: true },
        type: { type: "string" }, // language, framework, tool, etc.
        createdAt: { type: "datetime", required: true },
      },
      constraints: ["UNIQUE(id)"],
    },
  },

  // Relationship Types
  relationships: {
    WORKS_ON: {
      source: "Student",
      target: "Project",
      properties: {
        role: { type: "string" }, // lead, contributor
        hours_contributed: { type: "int" },
        createdAt: { type: "datetime" },
      },
    },
    USES_SKILL: {
      source: "Student",
      target: "Skill",
      properties: {
        proficiency_level: { type: "string" }, // beginner, intermediate, advanced, expert
        hours_practiced: { type: "int" },
        last_practiced: { type: "datetime" },
        createdAt: { type: "datetime" },
      },
    },
    PROJECT_REQUIRES_SKILL: {
      source: "Project",
      target: "Skill",
      properties: {
        importance_level: { type: "string" }, // low, medium, high, critical
        createdAt: { type: "datetime" },
      },
    },
    SKILL_USES_TECH: {
      source: "Skill",
      target: "Technology",
      properties: {
        proficiency: { type: "string" },
        createdAt: { type: "datetime" },
      },
    },
    PROJECT_USES_TECH: {
      source: "Project",
      target: "Technology",
      properties: {
        createdAt: { type: "datetime" },
      },
    },
    SKILL_PREREQUISITE: {
      source: "Skill",
      target: "Skill",
      properties: {
        sequence: { type: "int" }, // order of learning
        createdAt: { type: "datetime" },
      },
    },
  },
};

module.exports = graphSchema;
