import React from "react";
const pkg = require("../../static/server.package.json");

const mapTools = (tools) => {
  return Object.entries(tools).map((entry) => {
    const [name, version] = entry;

    return {
      name,
      version,
    };
  });
};

const ToolsTable = ({ type }) => {
  const tools = mapTools(
    type === "production" ? pkg.dependencies : pkg.devDependencies
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Tool</th>
          <th>Version</th>
        </tr>
      </thead>
      <tbody>
        {tools.map((tool) => (
          <tr>
            <td>{tool.name}</td>
            <td>{tool.version}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ToolsTable;
