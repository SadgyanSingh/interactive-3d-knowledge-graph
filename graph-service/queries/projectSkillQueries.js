/**
 * Project-Skill Relationship Queries
 * Graph Engineer: Shashikant
 * Cypher queries for Project-Skill relationships and operations
 */

const projectSkillQueries = {
  // Link a skill to a project
  addSkillToProject: `
    MATCH (p:Project {id: $projectId}),
          (s:Skill {id: $skillId})
    CREATE (p)-[r:PROJECT_REQUIRES_SKILL {
      importance_level: $importance_level,
      createdAt: datetime()
    }]->(s)
    RETURN r
  `,

  // Get all skills required by a project
  getProjectSkills: `
    MATCH (p:Project {id: $projectId})-[r:PROJECT_REQUIRES_SKILL]->(s:Skill)
    RETURN s, r
    ORDER BY r.importance_level DESC
  `,

  // Get projects that require a specific skill
  getProjectsRequiringSkill: `
    MATCH (p:Project)-[r:PROJECT_REQUIRES_SKILL]->(s:Skill {id: $skillId})
    RETURN p, r
    ORDER BY r.importance_level DESC
  `,

  // Update skill requirement importance
  updateSkillImportance: `
    MATCH (p:Project {id: $projectId})-[r:PROJECT_REQUIRES_SKILL]->(s:Skill {id: $skillId})
    SET r.importance_level = $importance_level
    RETURN r
  `,

  // Remove skill from project
  removeSkillFromProject: `
    MATCH (p:Project {id: $projectId})-[r:PROJECT_REQUIRES_SKILL]->(s:Skill {id: $skillId})
    DELETE r
  `,

  // Get student's project-skill gap analysis
  getStudentSkillGap: `
    MATCH (s:Student {id: $studentId})-[w:WORKS_ON]->(p:Project)-[r:PROJECT_REQUIRES_SKILL]->(skill:Skill)
    OPTIONAL MATCH (s)-[u:USES_SKILL]->(skill)
    RETURN p, skill, r.importance_level as required_importance,
           CASE WHEN u IS NOT NULL THEN u.proficiency_level ELSE null END as student_proficiency
    ORDER BY p.title, required_importance DESC
  `,

  // Get all relationships between projects and skills
  getAllProjectSkillRelationships: `
    MATCH (p:Project)-[r:PROJECT_REQUIRES_SKILL]->(s:Skill)
    RETURN p, s, r
    ORDER BY p.title, r.importance_level DESC
  `,

  // Get critical skills for a project (high/critical importance)
  getCriticalProjectSkills: `
    MATCH (p:Project {id: $projectId})-[r:PROJECT_REQUIRES_SKILL]->(s:Skill)
    WHERE r.importance_level IN ['critical', 'high']
    RETURN s, r
    ORDER BY r.importance_level DESC
  `,
};

module.exports = projectSkillQueries;
