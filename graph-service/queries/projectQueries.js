/**
 * Project-related Graph Queries
 * Graph Engineer: Shashikant
 * Cypher queries for project nodes and relationships
 */

const projectQueries = {
  // Create a new project
  createProject: `
    CREATE (p:Project {
      id: $id,
      title: $title,
      description: $description,
      repository: $repository,
      createdAt: datetime()
    })
    RETURN p
  `,

  // Get all projects
  getAllProjects: `
    MATCH (p:Project)
    RETURN p
    ORDER BY p.createdAt DESC
  `,

  // Get project by ID with all related information
  getProjectDetails: `
    MATCH (p:Project {id: $projectId})
    OPTIONAL MATCH (p)-[rskill:PROJECT_REQUIRES_SKILL]->(s:Skill)
    OPTIONAL MATCH (p)-[rtech:PROJECT_USES_TECH]->(t:Technology)
    OPTIONAL MATCH (students:Student)-[rwork:WORKS_ON]->(p)
    RETURN p,
           collect({skill: s, requires: rskill}) as skills,
           collect({tech: t, uses: rtech}) as technologies,
           collect({student: students, works: rwork}) as team_members
  `,

  // Get students working on a project
  getProjectTeam: `
    MATCH (s:Student)-[r:WORKS_ON]->(p:Project {id: $projectId})
    RETURN s, r
    ORDER BY r.hours_contributed DESC
  `,

  // Update project information
  updateProject: `
    MATCH (p:Project {id: $projectId})
    SET p.title = $title,
        p.description = $description,
        p.repository = $repository
    RETURN p
  `,

  // Delete a project
  deleteProject: `
    MATCH (p:Project {id: $projectId})
    DETACH DELETE p
  `,

  // Get projects by technology
  getProjectsByTechnology: `
    MATCH (p:Project)-[r:PROJECT_USES_TECH]->(t:Technology {name: $techName})
    RETURN p
    ORDER BY p.createdAt DESC
  `,
};

module.exports = projectQueries;
