/**
 * Graph Engine Manager
 * Graph Engineer: Shashikant
 * Core service for managing graph operations, queries, and updates
 */

require("dotenv").config();
const neo4j = require("neo4j-driver");
const skillQueries = require("../queries/skillQueries");
const projectQueries = require("../queries/projectQueries");
const projectSkillQueries = require("../queries/projectSkillQueries");

class GraphEngine {
  constructor() {
    this.driver = neo4j.driver(
      process.env.NEO4J_URI,
      neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
    );
    this.database = process.env.NEO4J_DATABASE || "neo4j";
  }

  /**
   * Execute a Cypher query
   * @param {string} query - Cypher query string
   * @param {object} params - Query parameters
   * @returns {Promise<Array>} Query results
   */
  async executeQuery(query, params = {}) {
    const session = this.driver.session({ database: this.database });
    try {
      const result = await session.run(query, params);
      return result.records.map((record) => record.toObject());
    } catch (error) {
      console.error("Graph query error:", error);
      throw error;
    } finally {
      await session.close();
    }
  }

  /**
   * Execute a write transaction
   * @param {string} query - Cypher query string
   * @param {object} params - Query parameters
   * @returns {Promise<object>} Transaction result
   */
  async executeWrite(query, params = {}) {
    const session = this.driver.session({ database: this.database });
    try {
      const result = await session.executeWrite((tx) => tx.run(query, params));
      return result.records.map((record) => record.toObject());
    } catch (error) {
      console.error("Graph write error:", error);
      throw error;
    } finally {
      await session.close();
    }
  }

  // ==================== SKILL OPERATIONS ====================

  async createSkill(skillData) {
    return this.executeWrite(skillQueries.createSkill, {
      id: skillData.id,
      name: skillData.name,
      category: skillData.category,
      proficiency_level: skillData.proficiency_level || "beginner",
    });
  }

  async getAllSkills() {
    return this.executeQuery(skillQueries.getAllSkills);
  }

  async getSkillsByCategory(category) {
    return this.executeQuery(skillQueries.getSkillsByCategory, { category });
  }

  async addPrerequisiteSkill(skillId1, skillId2, sequence) {
    return this.executeWrite(skillQueries.addPrerequisiteSkill, {
      skillId1,
      skillId2,
      sequence,
    });
  }

  async getSkillPrerequisites(skillId) {
    return this.executeQuery(skillQueries.getSkillPrerequisites, { skillId });
  }

  async updateSkillProficiency(skillId, proficiencyLevel) {
    return this.executeWrite(skillQueries.updateSkillProficiency, {
      skillId,
      proficiency_level: proficiencyLevel,
    });
  }

  // ==================== PROJECT OPERATIONS ====================

  async createProject(projectData) {
    return this.executeWrite(projectQueries.createProject, {
      id: projectData.id,
      title: projectData.title,
      description: projectData.description,
      repository: projectData.repository,
    });
  }

  async getAllProjects() {
    return this.executeQuery(projectQueries.getAllProjects);
  }

  async getProjectDetails(projectId) {
    return this.executeQuery(projectQueries.getProjectDetails, { projectId });
  }

  async getProjectTeam(projectId) {
    return this.executeQuery(projectQueries.getProjectTeam, { projectId });
  }

  async updateProject(projectId, projectData) {
    return this.executeWrite(projectQueries.updateProject, {
      projectId,
      title: projectData.title,
      description: projectData.description,
      repository: projectData.repository,
    });
  }

  // ==================== PROJECT-SKILL RELATIONSHIPS ====================

  async addSkillToProject(projectId, skillId, importanceLevel) {
    return this.executeWrite(projectSkillQueries.addSkillToProject, {
      projectId,
      skillId,
      importance_level: importanceLevel,
    });
  }

  async getProjectSkills(projectId) {
    return this.executeQuery(projectSkillQueries.getProjectSkills, {
      projectId,
    });
  }

  async getProjectsRequiringSkill(skillId) {
    return this.executeQuery(projectSkillQueries.getProjectsRequiringSkill, {
      skillId,
    });
  }

  async updateSkillImportance(projectId, skillId, importanceLevel) {
    return this.executeWrite(projectSkillQueries.updateSkillImportance, {
      projectId,
      skillId,
      importance_level: importanceLevel,
    });
  }

  async removeSkillFromProject(projectId, skillId) {
    return this.executeWrite(projectSkillQueries.removeSkillFromProject, {
      projectId,
      skillId,
    });
  }

  async getStudentSkillGap(studentId) {
    return this.executeQuery(projectSkillQueries.getStudentSkillGap, {
      studentId,
    });
  }

  async getCriticalProjectSkills(projectId) {
    return this.executeQuery(projectSkillQueries.getCriticalProjectSkills, {
      projectId,
    });
  }

  // ==================== UTILITY OPERATIONS ====================

  async initializeGraphConstraints() {
    const session = this.driver.session({ database: this.database });
    try {
      // Create unique constraints
      const constraints = [
        "CREATE CONSTRAINT unique_student_id IF NOT EXISTS FOR (s:Student) REQUIRE s.id IS UNIQUE",
        "CREATE CONSTRAINT unique_project_id IF NOT EXISTS FOR (p:Project) REQUIRE p.id IS UNIQUE",
        "CREATE CONSTRAINT unique_skill_id IF NOT EXISTS FOR (s:Skill) REQUIRE s.id IS UNIQUE",
        "CREATE CONSTRAINT unique_tech_id IF NOT EXISTS FOR (t:Technology) REQUIRE t.id IS UNIQUE",
      ];

      for (const constraint of constraints) {
        await session.run(constraint);
      }

      console.log("✓ Graph constraints initialized successfully");
      return true;
    } catch (error) {
      console.error("Error initializing constraints:", error);
      throw error;
    } finally {
      await session.close();
    }
  }

  async healthCheck() {
    try {
      const session = this.driver.session({ database: this.database });
      const result = await session.run("RETURN 1");
      await session.close();
      return { status: "healthy", connected: true };
    } catch (error) {
      return { status: "unhealthy", connected: false, error: error.message };
    }
  }

  async closeConnection() {
    await this.driver.close();
  }
}

module.exports = GraphEngine;
