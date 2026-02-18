/**
 * Skill-related Graph Queries
 * Graph Engineer: Shashikant
 * Cypher queries for skill nodes and relationships
 */

const skillQueries = {
  // Create a new skill
  createSkill: `
    CREATE (s:Skill {
      id: $id,
      name: $name,
      category: $category,
      proficiency_level: $proficiency_level,
      createdAt: datetime()
    })
    RETURN s
  `,

  // Get all skills
  getAllSkills: `
    MATCH (s:Skill)
    RETURN s
    ORDER BY s.name ASC
  `,

  // Get skills by category
  getSkillsByCategory: `
    MATCH (s:Skill)
    WHERE s.category = $category
    RETURN s
    ORDER BY s.proficiency_level DESC
  `,

  // Add prerequisite relationship between skills
  addPrerequisiteSkill: `
    MATCH (s1:Skill {id: $skillId1}),
          (s2:Skill {id: $skillId2})
    CREATE (s1)-[r:SKILL_PREREQUISITE {sequence: $sequence, createdAt: datetime()}]->(s2)
    RETURN r
  `,

  // Get skill prerequisites
  getSkillPrerequisites: `
    MATCH (prerequisite:Skill)-[r:SKILL_PREREQUISITE]->(s:Skill {id: $skillId})
    RETURN prerequisite, r
    ORDER BY r.sequence ASC
  `,

  // Update skill proficiency level
  updateSkillProficiency: `
    MATCH (s:Skill {id: $skillId})
    SET s.proficiency_level = $proficiency_level
    RETURN s
  `,

  // Delete a skill
  deleteSkill: `
    MATCH (s:Skill {id: $skillId})
    DETACH DELETE s
  `,
};

module.exports = skillQueries;
