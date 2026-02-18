/**
 * GraphEngine Usage Examples
 * Graph Engineer: Shashikant
 * Demonstrates key operations for managing the knowledge graph
 */

const GraphEngine = require("./engine/GraphEngine");

async function demonstrateGraphOperations() {
  const engine = new GraphEngine();

  try {
    // Initialize constraints
    console.log("Initializing graph constraints...");
    await engine.initializeGraphConstraints();

    // Health check
    console.log("Checking graph database connection...");
    const health = await engine.healthCheck();
    console.log("Health status:", health);

    // ==================== SKILL OPERATIONS ====================

    // Create a skill
    console.log("\n--- Creating Skills ---");
    await engine.createSkill({
      id: "skill_react",
      name: "React",
      category: "frontend",
      proficiency_level: "intermediate",
    });
    console.log("✓ Created React skill");

    await engine.createSkill({
      id: "skill_node",
      name: "Node.js",
      category: "backend",
      proficiency_level: "intermediate",
    });
    console.log("✓ Created Node.js skill");

    // Get all skills
    console.log("\n--- Retrieving All Skills ---");
    const allSkills = await engine.getAllSkills();
    console.log("Total skills:", allSkills.length);

    // Get skills by category
    console.log("\n--- Frontend Skills ---");
    const frontendSkills = await engine.getSkillsByCategory("frontend");
    console.log("Frontend skills:", frontendSkills);

    // ==================== PROJECT OPERATIONS ====================

    // Create a project
    console.log("\n--- Creating Projects ---");
    await engine.createProject({
      id: "project_1",
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce application",
      repository: "github.com/user/ecommerce",
    });
    console.log("✓ Created E-Commerce Platform project");

    // Get project details
    console.log("\n--- Project Details ---");
    const projectDetails = await engine.getProjectDetails("project_1");
    console.log("Project details:", projectDetails);

    // ==================== PROJECT-SKILL RELATIONSHIPS ====================

    // Add skill requirement to project
    console.log("\n--- Linking Skills to Project ---");
    await engine.addSkillToProject("project_1", "skill_react", "high");
    console.log("✓ Added React (high importance) to E-Commerce Platform");

    await engine.addSkillToProject("project_1", "skill_node", "critical");
    console.log("✓ Added Node.js (critical importance) to E-Commerce Platform");

    // Get project skills
    console.log("\n--- Project Required Skills ---");
    const projectSkills = await engine.getProjectSkills("project_1");
    console.log("E-Commerce Platform requires:", projectSkills);

    // Get projects requiring a skill
    console.log("\n--- Projects Requiring React ---");
    const reactProjects = await engine.getProjectsRequiringSkill("skill_react");
    console.log("Projects needing React:", reactProjects);

    // Get critical skills for project
    console.log("\n--- Critical Skills ---");
    const criticalSkills = await engine.getCriticalProjectSkills("project_1");
    console.log("Critical skills:", criticalSkills);

    // ==================== SKILL PREREQUISITES ====================

    // Add prerequisite relationship
    console.log("\n--- Adding Skill Prerequisites ---");
    await engine.createSkill({
      id: "skill_js",
      name: "JavaScript",
      category: "frontend",
      proficiency_level: "intermediate",
    });

    await engine.addPrerequisiteSkill("skill_js", "skill_react", 1);
    console.log("✓ Set JavaScript as prerequisite for React");

    // Get prerequisites
    console.log("\n--- React Prerequisites ---");
    const prerequisites = await engine.getSkillPrerequisites("skill_react");
    console.log("React prerequisites:", prerequisites);

    console.log("\n✓ All operations completed successfully!");
  } catch (error) {
    console.error("Error during graph operations:", error);
  } finally {
    await engine.closeConnection();
  }
}

// Export for use in other modules
module.exports = { demonstrateGraphOperations };

// Uncomment to run demonstrations
// demonstrateGraphOperations();
