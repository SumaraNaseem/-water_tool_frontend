import ProjectsTable from "./ProjectsTable";

export default function ProjectsContent({ user, onLogout }) {
  

  return (
    <div className="space-y-6">
      {/* Header */}

      <h2 className="text-2xl  font-bold text-gray-800 mb-8">
        Projekt
      </h2>

      {/* Projects Table */}
      <ProjectsTable />
    </div>
  );
}
